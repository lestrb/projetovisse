// controllers/capibaController.js
import axios from 'axios';

const CAPIBA_API_URL = 'https://gamificacao.homolog.app.emprel.gov.br/api';

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