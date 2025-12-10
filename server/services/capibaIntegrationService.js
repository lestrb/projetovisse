import axios from 'axios';

const CAPIBA_API_URL = 'https://gamificacao.homolog.app.emprel.gov.br/api';

export const capibaCheckIn = async (token, checkInData) => {
    try {
        const response = await axios.post(
            `${CAPIBA_API_URL}/check-in`,
            checkInData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Erro ao fazer check-in Capiba:', error.response?.data || error.message);
        throw error;
    }
};