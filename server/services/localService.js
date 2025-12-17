import Local from '../models/Local.js';
import geocodeAddress from './geocodingService.js';

const RAIO_BUSCA_COORD = 0.001;

export const processarGeolocalizacao = async (endereco) => {
    try {
        return await geocodeAddress(endereco);
    } catch (error) {
        throw { status: 400, message: "Endereço inválido.", detalhe: error.message };
    }
};

export const verificarDuplicidade = async (latitude, longitude, forcarCriacao) => {
    if (forcarCriacao) return;

    const localExistente = await Local.findOne({
        latitude: { $gte: latitude - RAIO_BUSCA_COORD, $lte: latitude + RAIO_BUSCA_COORD },
        longitude: { $gte: longitude - RAIO_BUSCA_COORD, $lte: longitude + RAIO_BUSCA_COORD }
    });

    if (localExistente) {
        throw {
            status: 409,
            message: `Já existe um local nesse endereço: "${localExistente.nome}"`,
            localExistente
        };
    }
};

export const salvarLocal = async (dadosLocal) => {
    const novoLocal = new Local(dadosLocal);
    return await novoLocal.save();
};