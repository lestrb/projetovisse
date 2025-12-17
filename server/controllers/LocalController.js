import Local from '../models/Local.js';
import mongoose from 'mongoose';
import geocodeAddress from '../services/geocodingService.js';
import { adicionarPontos } from './pontuacaoController.js';
import fs from 'fs';

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
        const autor_id = req.usuario._id;
        
        let {
            nome,
            descricao,
            tipo,
            endereco, 
            forceCreate
        } = req.body;

        const forcarCriacao = forceCreate === true || forceCreate === 'true';

        // Endereço é obrigatório
        if (!nome || !descricao || !tipo || !endereco) { 
            // Se o usuário mandou foto mas esqueceu campos, deletamos a foto para não acumular lixo
            deletarArquivoTemporario(req.file);
            return res.status(400).json({ 
                message: "Dados incompletos. Nome, descrição, tipo e endereço são obrigatórios." 
            });
        }

        // Geocoding: Transformar "Texto" em "Coordenadas"
        let latitude, longitude;
        try {
            // Chama o serviço do Nominatim
            const coords = await geocodeAddress(endereco);
            
            latitude = coords.latitude;
            longitude = coords.longitude;
            
        } catch (geocodeError) {
            // Se o endereço não existe, apagamos a foto e avisamos
            deletarArquivoTemporario(req.file);
            return res.status(400).json({
                message: "Endereço não encontrado ou inválido.",
                detalhe: geocodeError.message,
                sugestao: "Tente colocar: Rua, Número e Bairro (ex: Rua do Sol, Recife)"
            });
        }

        // Procura locais num raio de +/- 0.001 graus (aprox. 100 metros)
        const localExistente = await Local.findOne({
            latitude: { $gte: latitude - 0.001, $lte: latitude + 0.001 },
            longitude: { $gte: longitude - 0.001, $lte: longitude + 0.001 }
        });

        if (localExistente && !forcarCriacao) {
            deletarArquivoTemporario(req.file);
            return res.status(409).json({ 
                message: `Já existe um local nesse endereço: "${localExistente.nome}"`,
                localExistente: {
                    nome: localExistente.nome,
                    tipo: localExistente.tipo,
                    endereco: localExistente.endereco
                },
                confirmacaoNecessaria: true,
                coordenadas: { latitude, longitude }
            });
        }

        // Preparar Imagem
        const imagem_url = req.file 
            ? `/uploads/locais/${req.file.filename}` 
            : null;

        // Salvar no Banco
        const novoLocal = new Local({
            nome,
            descricao,
            tipo,
            curtidas: [],
            imagem_url,
            autor_id,
            endereco,  // O texto digitado
            latitude,  // Calculado pelo Geocoding
            longitude, // Calculado pelo Geocoding
        });

        await novoLocal.save();

        // Gamificação: Dar pontos ao usuário
        try {
            await adicionarPontos(autor_id, 'CADASTRAR_LOCAL', {
                local_id: novoLocal._id,
                descricao: `Cadastrou o local "${nome}"`
            });
        } catch (pontoError) {
            console.error('Erro ao adicionar pontos:', pontoError);
            // Não bloqueamos o cadastro se der erro nos pontos, apenas logamos
        }

        return res.status(201).json({ 
            message: "Local criado com sucesso! Você ganhou 50 pontos Visse! 🎉", 
            local: novoLocal,
            pontos_ganhos: 50
        });

    } catch (error) {
        console.error("Erro ao criar local:", error);
        
        deletarArquivoTemporario(req.file);
        
        return res.status(500).json({ 
            message: "Erro interno do servidor.", 
            error: error.message 
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
