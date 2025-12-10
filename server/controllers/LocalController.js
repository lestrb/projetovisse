import Local from '../models/Local.js';
import mongoose from 'mongoose';
import geocodeAddress from '../services/geocodingService.js';
import { adicionarPontos } from './pontuacaoController.js';
import fs from 'fs';

// CRIAR LOCAL 
export const createLocal = async (req, res) => {
    try {
        const autor_id = req.usuario._id;
        const {
            nome,
            descricao,
            tipo,
            endereco, 
            forceCreate
        } = req.body;

        const forcarCriacao = forceCreate === true || forceCreate === 'true';

        // Valida campos obrigatórios
        if (!nome || !descricao || !tipo || !endereco) { 
            // Remove arquivo se foi feito upload mas deu erro
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ 
                message: "Dados incompletos. Verifique os campos obrigatórios." 
            });
        }

        if (!mongoose.Types.ObjectId.isValid(autor_id)) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ message: "autor_id inválido." });
        }

        // Geocoding
        let latitude, longitude;
        try {
            const coords = await geocodeAddress(endereco);
            latitude = coords.latitude;
            longitude = coords.longitude;
        } catch (geocodeError) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({
                message: geocodeError.message,
                sugestao: "Tente adicionar bairro, cidade e estado."
            });
        }

        // Verifica local existente
        const localExistente = await Local.findOne({
            latitude: { $gte: latitude - 0.001, $lte: latitude + 0.001 },
            longitude: { $gte: longitude - 0.001, $lte: longitude + 0.001 }
        });

        if (localExistente && !forcarCriacao) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
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

        // URL da imagem (se foi feito upload)
        const imagem_url = req.file 
            ? `/uploads/locais/${req.file.filename}` 
            : null;

        // Cria o local
        const novoLocal = new Local({
            nome,
            descricao,
            tipo,
            curtidas: [],
            imagem_url,
            autor_id,
            endereco,
            latitude,
            longitude,
        });

        await novoLocal.save();

        // Dar pontos
        try {
            await adicionarPontos(autor_id, 'CADASTRAR_LOCAL', {
                local_id: novoLocal._id,
                descricao: `Cadastrou o local "${nome}"`
            });
        } catch (pontoError) {
            console.error('Erro ao adicionar pontos:', pontoError);
        }

        return res.status(201).json({ 
            message: "Local criado com sucesso! Você ganhou 50 pontos Visse! 🎉", 
            local: novoLocal,
            pontos_ganhos: 50
        });

    } catch (error) {
        console.error("Erro ao criar local:", error);
        
        // Remove arquivo em caso de erro
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }

        if (error.code === 11000) {
            return res.status(409).json({ 
                message: "Já existe um local cadastrado com esses dados."
            });
        }
        
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
            if (req.file) fs.unlinkSync(req.file.path);
            return res.status(400).json({ message: "ID inválido." });
        }

        const local = await Local.findById(id);

        if (!local) {
            if (req.file) fs.unlinkSync(req.file.path);
            return res.status(404).json({ message: "Local não encontrado." });
        }

        if (local.autor_id.toString() !== autor_id.toString()) {
            if (req.file) fs.unlinkSync(req.file.path);
            return res.status(403).json({ 
                message: "Você não tem permissão para editar este local." 
            });
        }

        // Atualiza campos
        if (nome) local.nome = nome;
        if (descricao) local.descricao = descricao;
        if (tipo) local.tipo = tipo;

        // Se enviou nova imagem, deleta a antiga e salva a nova
        if (req.file) {
            // Deleta imagem antiga se existir
            if (local.imagem_url) {
                const oldImagePath = `.${local.imagem_url}`;
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            local.imagem_url = `/uploads/locais/${req.file.filename}`;
        }

        // Atualiza endereço e coordenadas
        if (endereco && endereco !== local.endereco) {
            try {
                const coords = await geocodeAddress(endereco);
                local.endereco = endereco;
                local.latitude = coords.latitude;
                local.longitude = coords.longitude;
            } catch (geocodeError) {
                if (req.file) fs.unlinkSync(req.file.path);
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
        if (req.file) fs.unlinkSync(req.file.path);
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

        // Remove imagem se existir
        if (local.imagem_url) {
            const imagePath = `.${local.imagem_url}`;
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
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

// Curtir local 
export const curtirLocal = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario_id = req.usuario._id;

        console.log('DEBUG CURTIR');
        console.log('ID do local:', id);
        console.log('Usuario ID:', usuario_id);
        console.log('Usuario completo:', req.usuario);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID do local invalido." });
        }

        const local = await Local.findById(id);
        console.log('Local encontrado:', local ? 'SIM' : 'NAO');

        if (!local) {
            return res.status(404).json({ message: "Local nao encontrado." });
        }

        const jaCurtiu = local.curtidas.some(curtida => curtida.equals(usuario_id));
        console.log('Ja curtiu?', jaCurtiu);

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
            console.log('Curtida adicionada. Total:', local.curtidas.length);

            // So adiciona pontos se nao for o proprio autor curtindo
            if (!local.autor_id.equals(usuario_id)) {
                console.log('Adicionando pontos ao dono do local...');
                try {
                    await adicionarPontos(local.autor_id, 'RECEBER_CURTIDA', {
                        local_id: local._id
                    });
                    console.log('Pontos adicionados com sucesso');
                } catch (e) {
                    console.error('Erro ao adicionar pontos ao dono:', e);
                }
            } else {
                console.log('Autor curtiu o proprio local - nao ganha pontos');
            }

            return res.json({ 
                message: "Local curtido!",
                curtiu: true,
                total_curtidas: local.curtidas.length
            });
        }

    } catch (error) {
        console.error("ERRO AO CURTIR");
        console.error("Mensagem:", error.message);
        console.error("Stack:", error.stack);
        return res.status(500).json({ 
            message: "Erro ao processar curtida.",
            erro: error.message // ADICIONAR DETALHE DO ERRO
        });
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
            return res.status(400).json({ message: "ID do local inválido." });
        }

        const local = await Local.findById(id);

        if (!local) {
            return res.status(404).json({ message: "Local não encontrado." });
        }

        return res.status(200).json(local);
    } catch (error) {
        console.error("Erro ao buscar local:", error);
        return res.status(500).json({ message: "Erro interno ao buscar local." });
    }
};