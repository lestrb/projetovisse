import Local from '../models/Local.js';
import mongoose from 'mongoose';
import * as LocalService from '../services/localService.js';
import geocodeAddress from '../services/geocodingService.js';
import { adicionarPontos, PONTOS } from './pontuacaoController.js'; 
import fs from 'fs';
import Pontuacao from '../models/Pontuacao.js';

// 0.001 graus é aproximadamente 111 metros na linha do equador
const RAIO_BUSCA_COORD = 0.001;
const DISTANCIA_MAXIMA_CHECKIN = 200; // 200 metros para validar visita

// Funções auxiliares 
// Limpar arquivos temporários
const deletarArquivoTemporario = (file) => {
    if (file && file.path) {
        fs.unlinkSync(file.path);
    }
};

// Remover imagem quando um local é atualizado ou deletado
const deletarImagemDoServidor = (caminhoRelativo) => {
    if (!caminhoRelativo) return;
    const pathCompleto = `.${caminhoRelativo}`;
    if (fs.existsSync(pathCompleto)) {
        fs.unlinkSync(pathCompleto);
    }
};

// Calcular distância entre duas coordenadas geográficas (Em metros)
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Raio da Terra em metros
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; 
}

// CRIAR LOCAL (ganha pontos pelo cadastro, sem necessidade de check-in por localização)
export const createLocal = async (req, res) => {
    try {
        const { nome, descricao, tipo, endereco, forceCreate } = req.body;
        const forcarCriacao = forceCreate === true || forceCreate === 'true';

        // Validação de Entrada
        if (!nome || !descricao || !tipo || !endereco) { 
            deletarArquivoTemporario(req.file);
            return res.status(400).json({ 
                message: "Dados incompletos. Nome, descrição, tipo e endereço são obrigatórios." 
            });
        }

        // Processamento de Geolocalização 
        // O Service encapsula a chamada ao Nominatim
        const coords = await LocalService.processarGeolocalizacao(endereco);

        // Verificação de Duplicidade 
        // O Service faz o cálculo do RAIO_BUSCA_COORD (0.001)
        await LocalService.verificarDuplicidade(coords.latitude, coords.longitude, forcarCriacao);

        // Preparação dos dados de persistência
        const imagem_url = req.file ? `/uploads/locais/${req.file.filename}` : null;
        
        const dadosParaSalvar = {
            nome,
            descricao,
            tipo,
            endereco,
            latitude: coords.latitude,
            longitude: coords.longitude,
            imagem_url,
            autor_id: req.usuario._id
        };

        // Salvar no Banco
        const novoLocal = await LocalService.salvarLocal(dadosParaSalvar);

        // Lógica de Gamificação
        try {
            await adicionarPontos(req.usuario._id, 'CADASTRAR_LOCAL', {
                local_id: novoLocal._id,
                descricao: `Cadastrou o local "${nome}"`
            });
        } catch (pontoError) {
            console.error('Erro ao adicionar pontos:', pontoError);
        }

        return res.status(201).json({ 
            message: `Local criado com sucesso! Você ganhou ${PONTOS.CADASTRAR_LOCAL} pontos Visse!`, 
            local: novoLocal,
            pontos_ganhos: PONTOS.CADASTRAR_LOCAL
        });

    } catch (error) {
        deletarArquivoTemporario(req.file);
        
        const status = error.status || 500;
        return res.status(status).json({
            message: error.message || "Erro interno do servidor.",
            detalhe: error.detalhe,
            localExistente: error.localExistente // Caso retornado pelo verificarDuplicidade
        });
    }
};

// CHECK-IN DE VISITA (Valida Geolocalização + Verifica duplicidade + Dá Pontos)
export const fazerCheckInVisse = async (req, res) => {
    try {
        const { local_id, userLat, userLon } = req.body;
        const usuario_id = req.usuario._id;

        if (!local_id || !userLat || !userLon) {
            return res.status(400).json({ message: "ID do local e coordenadas GPS são obrigatórios." });
        }

        const local = await Local.findById(local_id);
        if (!local) return res.status(404).json({ message: "Local não encontrado." });

        // Verifica se já visitou este local antes
        const pontuacaoUsuario = await Pontuacao.findOne({ usuario_id });

        if (pontuacaoUsuario) {
            // Verifica no histórico se existe algum registro com este local_id e a ação VISITAR_LOCAL
            const jaVisitou = pontuacaoUsuario.historico.some(registro => 
                registro.acao === 'VISITAR_LOCAL' && 
                registro.local_id && 
                registro.local_id.toString() === local_id
            );

            if (jaVisitou) {
                return res.status(409).json({ // 409 Conflict indica conflito de regra/duplicidade
                    message: "Você já realizou check-in neste local! Pontos computados apenas na primeira visita."
                });
            }
        }

        // Valida Distância
        const distancia = calcularDistancia(userLat, userLon, local.latitude, local.longitude);

        if (distancia > DISTANCIA_MAXIMA_CHECKIN) {
            return res.status(400).json({
                message: "Você está muito longe do local para fazer Check-in.",
                distancia_atual: Math.round(distancia) + "m",
                raio_permitido: DISTANCIA_MAXIMA_CHECKIN + "m"
            });
        }

        // Se estiver perto e nunca visitou, dá pontos
        await adicionarPontos(usuario_id, 'VISITAR_LOCAL', {
            local_id: local._id,
            descricao: `Visitou o local "${local.nome}"`
        });

        return res.status(200).json({
            message: `Check-in realizado! Você ganhou ${PONTOS.VISITAR_LOCAL} pontos.`,
            distancia: Math.round(distancia)
        });

    } catch (error) {
        console.error("Erro no check-in:", error);
        return res.status(500).json({ message: "Erro ao processar check-in." });
    }
};

// ATUALIZAR LOCAL
export const updateLocal = async (req, res) => {
    try {
        const { id } = req.params;
        const autor_id = req.usuario._id;
        const { nome, descricao, tipo, endereco } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            deletarArquivoTemporario(req.file);
            return res.status(400).json({ message: "ID inválido." });
        }

        const local = await Local.findById(id);

        if (!local) {
            deletarArquivoTemporario(req.file);
            return res.status(404).json({ message: "Local não encontrado." });
        }

        // Verifica permissão
        if (local.autor_id.toString() !== autor_id.toString()) {
            deletarArquivoTemporario(req.file);
            return res.status(403).json({ 
                message: "Você não tem permissão para editar este local." 
            });
        }

        // Atualiza campos simples
        if (nome) local.nome = nome;
        if (descricao) local.descricao = descricao;
        if (tipo) local.tipo = tipo;

        // Atualiza imagem
        if (req.file) {
            if (local.imagem_url) {
                deletarImagemDoServidor(local.imagem_url);
            }
            local.imagem_url = `/uploads/locais/${req.file.filename}`;
        }

        // Atualiza endereço
        if (endereco && endereco !== local.endereco) {
            try {
                const coords = await geocodeAddress(endereco);
                local.endereco = endereco;
                local.latitude = coords.latitude;
                local.longitude = coords.longitude;
            } catch (geocodeError) {
                deletarArquivoTemporario(req.file);
                return res.status(400).json({
                    message: "Erro ao validar o novo endereço.",
                    detalhe: geocodeError.message
                });
            }
        }

        await local.save();

        return res.status(200).json({ 
            message: "Local atualizado com sucesso!", 
            local 
        });

    } catch (error) {
        console.error("Erro ao atualizar local:", error);
        deletarArquivoTemporario(req.file);
        return res.status(500).json({ 
            message: "Erro interno ao atualizar local." 
        });
    }
};

// DELETAR LOCAL 
export const deleteLocal = async (req, res) => {
    try {
        const { id } = req.params;
        const autor_id = req.usuario._id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido." });
        }

        const local = await Local.findById(id);

        if (!local) {
            return res.status(404).json({ message: "Local não encontrado." });
        }

        if (local.autor_id.toString() !== autor_id.toString()) {
            return res.status(403).json({ 
                message: "Você não tem permissão para excluir este local." 
            });
        }

        if (local.imagem_url) {
            deletarImagemDoServidor(local.imagem_url);
        }

        await local.deleteOne();

        return res.status(200).json({ 
            message: "Local excluído com sucesso." 
        });

    } catch (error) {
        console.error("Erro ao deletar local:", error);
        return res.status(500).json({ 
            message: "Erro interno ao excluir local." 
        });
    }
};

// CURTIR LOCAL - não ganha pontos
export const curtirLocal = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario_id = req.usuario._id;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "ID inválido." });

        const local = await Local.findById(id);
        if (!local) return res.status(404).json({ message: "Local não encontrado." });

        const jaCurtiu = local.curtidas.some(curtida => curtida.equals(usuario_id));

        if (jaCurtiu) {
            local.curtidas = local.curtidas.filter(c => !c.equals(usuario_id));
            await local.save();
            return res.json({ message: "Curtida removida", curtiu: false, total: local.curtidas.length });
        } else {
            local.curtidas.push(usuario_id);
            await local.save();
            return res.json({ message: "Local curtido!", curtiu: true, total: local.curtidas.length });
        }

    } catch (error) {
        console.error("Erro ao curtir:", error);
        return res.status(500).json({ message: "Erro ao processar curtida." });
    }
};

export const getAllLocais = async (req, res) => {
    try {
        const locais = await Local.find().sort({ _id: -1 }); 
        return res.status(200).json(locais);
    } catch (error) {
        console.error("Erro ao listar locais:", error);
        return res.status(500).json({ message: "Erro ao buscar locais." });
    }
};

export const getLocalById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido." });
        }

        const local = await Local.findById(id); // Removi o populate dos comentarios pra simplificar se der erro

        if (!local) {
            return res.status(404).json({ message: "Local não encontrado." });
        }

        return res.status(200).json(local);
    } catch (error) {
        console.error("Erro ao buscar local:", error);
        return res.status(500).json({ message: "Erro interno ao buscar local." });
    }
};
