import axios from 'axios';
import Usuario from '../models/Usuario.js';

const CAPIBA_API_URL = 'https://gamificacao.homolog.app.emprel.gov.br/api';

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                message: 'Token não fornecido. Use: Bearer <token>' 
            });
        }

        const token = authHeader.split(' ')[1];

        // Validar token chamando a API Capiba
        try {
            const response = await axios.get(`${CAPIBA_API_URL}/self`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const capibaData = response.data;
            
            // Busca usuário no banco local pelo cpf/CPF
            const usuarioLocal = await Usuario.findOne({ 
                cpf: capibaData.cpf 
            });

            if (!usuarioLocal) {
                return res.status(401).json({ 
                    message: 'Usuário não encontrado. Faça login novamente.' 
                });
            }

            // Adiciona dados do usuário à requisição
            req.usuario = {
                _id: usuarioLocal._id, // ID do MongoDB (para relacionamentos)
                capiba_id: usuarioLocal.capiba_id,
                nome: usuarioLocal.nome,
                cpf: usuarioLocal.cpf,
                email: usuarioLocal.email,
                // Dados atualizados da API Capiba
                balance: capibaData.balance,
                newAchievements: capibaData.newAchievements,
                capibaData: capibaData
            };

            next();

        } catch (apiError) {
            console.error('Erro ao validar token na API Capiba:', apiError.message);
            
            if (apiError.response?.status === 401) {
                return res.status(401).json({ message: 'Token inválido ou expirado' });
            }
            
            return res.status(500).json({ 
                message: 'Erro ao validar autenticação',
                error: apiError.message 
            });
        }

    } catch (error) {
        console.error('Erro no middleware de autenticação:', error);
        return res.status(500).json({ 
            message: 'Erro no servidor durante autenticação',
            error: error.message 
        });
    }
}; 

export default authMiddleware;