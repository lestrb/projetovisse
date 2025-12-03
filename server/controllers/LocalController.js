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
        } = req.body;

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

        // Validação das coordenadas
        //if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        //    return res.status(400).json({
        //        message: "Coordenadas inválidas. Envie latitude e longitude numéricas (ex.: -8.047, -34.877)."
        //    });
        //}

        // TENTAR OBTER COORDENADAS - SE FALHAR, RETORNAR ERRO (a fazer)

        // CHAMAR O SERViÇO DE GEOCODING (a fazer)

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

        //if (error.code === 11000) {
        //    return res.status(409).json({ message: "Já existe um local cadastrado nessas coordenadas." });
        //} 
        // vamos colocar uma mensagem tipo: 
        //if (error.code === 11000) {
        //    return res.status(409).json({ message: `Já existe um local nesse endereço, chamado ${req.body.nome}. Tem certeza que não é o mesmo local e deseja cadastrar este?` });
        //}

        return res.status(500).json({ message: "Erro interno do servidor.", error: error.message });
    }
};

// EM BREVE OUTRAS FUNÇÕES DE CONTROLE DE LOCAIS (listar, atualizar, deletar, etc.)