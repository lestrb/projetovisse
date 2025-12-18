// controllers/capibaController.js
import axios from 'axios';

const CAPIBA_API_URL = 'https://gamificacao.homolog.app.emprel.gov.br/api';

// Função auxiliar para validar a distância (em metros)
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

    return R * c; // Distância em metros
}

//Fazer check-in (encaminha para API Capiba)

export const fazerCheckIn = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        // Encaminha requisição para API Capiba
        const response = await axios.post(
            `${CAPIBA_API_URL}/check-in`,
            req.body,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error('Erro ao fazer check-in:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            message: 'Erro ao fazer check-in',
            error: error.response?.data || error.message
        });
    }
};

//Check-in em local com desafio
export const checkInComDesafio = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const { challengeId, requirementId } = req.params;

        const response = await axios.post(
            `${CAPIBA_API_URL}/check-in/location/challenge/${challengeId}/requirement/${requirementId}`,
            req.body,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error('Erro ao fazer check-in com desafio:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            message: 'Erro ao fazer check-in com desafio',
            error: error.response?.data || error.message
        });
    }
};

//Listar desafios do usuário
export const listarDesafios = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        const response = await axios.get(
            `${CAPIBA_API_URL}/self/challenges`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error('Erro ao listar desafios:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            message: 'Erro ao listar desafios',
            error: error.response?.data || error.message
        });
    }
};