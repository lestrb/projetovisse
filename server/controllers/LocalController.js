import Local from '../models/Local.js';
import mongoose from 'mongoose';
import * as LocalService from '../services/localService.js';
import geocodeAddress from '../services/geocodingService.js';
import { adicionarPontos, PONTOS } from './pontuacaoController.js'; 
import fs from 'fs';

// 0.001 graus é aproximadamente 111 metros na linha do equador
const RAIO_BUSCA_COORD = 0.001;

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

// CRIAR LOCAL (Versão: Endereço Manual)
export const createLocal = async (req, res) => {
    try {
        const { nome, descricao, tipo, endereco, forceCreate } = req.body;
        const forcarCriacao = forceCreate === true || forceCreate === 'true';

        // 1. Validação de Entrada
        if (!nome || !descricao || !tipo || !endereco) { 
            deletarArquivoTemporario(req.file);
            return res.status(400).json({ 
                message: "Dados incompletos. Nome, descrição, tipo e endereço são obrigatórios." 
            });
        }

        // 2. Processamento de Geolocalização 
        // O Service encapsula a chamada ao Nominatim
        const coords = await LocalService.processarGeolocalizacao(endereco);

        // 3. Verificação de Duplicidade 
        // O Service faz o cálculo do RAIO_BUSCA_COORD (0.001)
        await LocalService.verificarDuplicidade(coords.latitude, coords.longitude, forcarCriacao);

        // 4. Preparação dos dados de persistência
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

        // 5. Salvar no Banco
        const novoLocal = await LocalService.salvarLocal(dadosParaSalvar);

        // 6. Lógica de Gamificação
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

// CURTIR LOCAL 
export const curtirLocal = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario_id = req.usuario._id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID do local invalido." });
        }

        const local = await Local.findById(id);

        if (!local) {
            return res.status(404).json({ message: "Local nao encontrado." });
        }

        const jaCurtiu = local.curtidas.some(curtida => curtida.equals(usuario_id));

        if (jaCurtiu) {
            local.curtidas = local.curtidas.filter(c => !c.equals(usuario_id));
            await local.save();

            return res.json({ 
                message: "Curtida removida",
                curtiu: false,
                total_curtidas: local.curtidas.length
            });
        } else {
            local.curtidas.push(usuario_id);
            await local.save();

            // Dar pontos ao dono do local (se não for ele mesmo)
            if (!local.autor_id.equals(usuario_id)) {
                try {
                    await adicionarPontos(local.autor_id, 'RECEBER_CURTIDA', {
                        local_id: local._id
                    });
                } catch (e) {
                    console.error('Erro ao adicionar pontos ao dono:', e);
                }
            }

            return res.json({ 
                message: "Local curtido!",
                curtiu: true,
                total_curtidas: local.curtidas.length
            });
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
