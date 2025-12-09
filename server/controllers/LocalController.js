import Local from '../models/Local.js';
import mongoose from 'mongoose';
import geocodeAddress from '../services/geocodingService.js';

// CRIAR LOCAL
export const createLocal = async (req, res) => {
    try {
        const autor_id = req.usuario._id;
        // Pega os dados do frontend
        const {
            nome,
            descricao,
            tipo,
            imagem_url, 
            endereco, 
            forceCreate
        } = req.body;

        const forcarCriacao = forceCreate === true || forceCreate === 'true' || forceCreate === 1 || forceCreate === '1';

        // parseFloat transforma string em número
        //const latitude = req.body.latitude !== undefined ? parseFloat(req.body.latitude) : NaN;
        //const longitude = req.body.longitude !== undefined ? parseFloat(req.body.longitude) : NaN;

        // Valida se tem os dados mínimos
        if (!nome || !descricao || !tipo || !endereco) { 
            return res.status(400).json({ message: "Dados incompletos. Verifique os campos obrigatórios." });
        }

        // Verifica se autor_id tem o formato de ObjectId 
        if (!mongoose.Types.ObjectId.isValid(autor_id)) {
            return res.status(400).json({ message: "autor_id inválido." });
        }

        let latitude, longitude;
    
        try {
        const coords = await geocodeAddress(endereco);
        latitude = coords.latitude;
        longitude = coords.longitude;
        console.log(`Geocoding realizado: ${latitude}, ${longitude}`);
        } catch (geocodeError) {
        // 🚨 ERRO NO GEOCODING - informar usuário
        return res.status(400).json({
            message: geocodeError.message,
            sugestao: "Tente adicionar bairro, cidade e estado. Ex: 'Rua das Flores, 123 - Boa Vista, Recife - PE'"
        });
        }

        // Validação das coordenadas
        //if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        //    return res.status(400).json({
        //        message: "Coordenadas inválidas. Envie latitude e longitude numéricas (ex.: -8.047, -34.877)."
        //    });
        //}

        // TENTAR OBTER COORDENADAS - SE FALHAR, RETORNAR ERRO (a fazer)

        // CHAMAR O SERViÇO DE GEOCODING (a fazer)

        const localExistente = await Local.findOne({
            latitude: { $gte: latitude - 0.001, $lte: latitude + 0.001 },
            longitude: { $gte: longitude - 0.001, $lte: longitude + 0.001 }
        });

        // Se encontrou local existente E NÃO foi forçado a criar
        if (localExistente && !forcarCriacao) {
            return res.status(409).json({ 
                message: `Já existe um local nesse endereço, chamado "${localExistente.nome}". Tem certeza que não é o mesmo local e deseja cadastrar este?`,
                localExistente: {
                    nome: localExistente.nome,
                    tipo: localExistente.tipo,
                    endereco: localExistente.endereco
                },
                // Dados que o frontend pode usar para confirmar
                confirmacaoNecessaria: true,
                coordenadas: { latitude, longitude }
            });
        }

        // Cria o objeto 'novoLocal' seguindo o Schema de Local
        const novoLocal = new Local({
            nome,
            descricao,
            tipo,
            curtidas: [], // Começa com um array de curtidas vazio
            imagem_url: imagem_url || null, // Vai ser opcional
            autor_id, // O autor que cadastrou o local
            endereco,
            latitude, // Usar coordenadas do geocoding (a fazer)
            longitude, // Usar coordenadas do geocoding (a fazer)
        });

        // Salva no Banco de Dados
        await novoLocal.save();

        // Envia resposta de sucesso para o frontend
       return res.status(201).json({ message: "Local criado com sucesso!", local: novoLocal });

    } catch (error) {
        // Trata erros
        console.error("Erro ao criar local:", error);

        if (error.code === 11000) {
            return res.status(409).json({ 
                message: "Já existe um local cadastrado com esses dados.",
                error: error.message 
            });
        }
        
        return res.status(500).json({ 
            message: "Erro interno do servidor.", 
            error: error.message 
        });
    }
};

// LISTAR TODOS OS LOCAIS
export const getAllLocais = async (req, res) => {
    try {
        // Busca todos os locais. O .sort({ _id: -1 }) traz os mais recentes primeiro
        // Se tiver timestamps no model, troque por .sort({ createdAt: -1 })
        const locais = await Local.find().sort({ _id: -1 }); 

        return res.status(200).json(locais);
    } catch (error) {
        console.error("Erro ao listar locais:", error);
        return res.status(500).json({ message: "Erro ao buscar locais." });
    }
};

// BUSCAR LOCAL POR ID
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

// ATUALIZAR LOCAL
export const updateLocal = async (req, res) => {
    try {
        const { id } = req.params;
        const autor_id = req.usuario._id; // ID do usuário logado
        const { nome, descricao, tipo, imagem_url, endereco } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido." });
        }

        // 1. Busca o local antigo
        const local = await Local.findById(id);

        if (!local) {
            return res.status(404).json({ message: "Local não encontrado." });
        }

        // 2. Verifica se o usuário é o dono do local (Segurança)
        if (local.autor_id.toString() !== autor_id) {
            return res.status(403).json({ message: "Você não tem permissão para editar este local." });
        }

        // 3. Atualiza os campos simples
        if (nome) local.nome = nome;
        if (descricao) local.descricao = descricao;
        if (tipo) local.tipo = tipo;
        if (imagem_url) local.imagem_url = imagem_url;

        // 4. Se o endereço mudou, precisamos recalcular a lat/long
        if (endereco && endereco !== local.endereco) {
            try {
                const coords = await geocodeAddress(endereco);
                local.endereco = endereco;
                local.latitude = coords.latitude;
                local.longitude = coords.longitude;
                console.log(`Endereço atualizado. Novo Geocoding: ${coords.latitude}, ${coords.longitude}`);
            } catch (geocodeError) {
                return res.status(400).json({
                    message: "Erro ao validar o novo endereço.",
                    detalhe: geocodeError.message
                });
            }
        }

        // Salva as alterações
        await local.save();

        return res.status(200).json({ message: "Local atualizado com sucesso!", local });

    } catch (error) {
        console.error("Erro ao atualizar local:", error);
        return res.status(500).json({ message: "Erro interno ao atualizar local." });
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

        // Verifica permissão (apenas o dono pode deletar)
        if (local.autor_id.toString() !== autor_id) {
            return res.status(403).json({ message: "Você não tem permissão para excluir este local." });
        }

        await local.deleteOne(); // Ou Local.findByIdAndDelete(id)

        return res.status(200).json({ message: "Local excluído com sucesso." });

    } catch (error) {
        console.error("Erro ao deletar local:", error);
        return res.status(500).json({ message: "Erro interno ao excluir local." });
    }
};