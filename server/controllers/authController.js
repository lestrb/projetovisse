import axios from 'axios';
import Usuario from '../models/Usuario.js';

const CAPIBA_AUTH_URL = 'https://gamificacao.homolog.app.emprel.gov.br/api/authenticate/conecta';
const CAPIBA_API_URL = 'https://gamificacao.homolog.app.emprel.gov.br/api';


  //Login via API Capiba e Registro/Atualização Local

export const login = async (req, res) => {
    try {
        const { cpf, senha } = req.body;

        // Validação
        if (!cpf || !senha) {
            return res.status(400).json({ 
                message: "Por favor, informe CPF e senha." 
            });
        }

        // Faz login na API 
        const response = await axios.post(CAPIBA_AUTH_URL, {
            username: cpf,
            password: senha
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const { access_token } = response.data;

        // Busca dados do usuário na API 
        let capibaUserData = null;
        try {
            const userResponse = await axios.get(`${CAPIBA_API_URL}/self`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });
            capibaUserData = userResponse.data;
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error.message);
            return res.status(500).json({
                message: "Erro ao buscar dados do usuário."
            });
        }

        // Verifica se usuário já existe no nosso banco
        let usuarioLocal = await Usuario.findOne({ 
            cpf: cpf 
        });

        if (usuarioLocal) {
            // Atualiza dados do usuário 
            usuarioLocal.nome = capibaUserData.name;
            usuarioLocal.email = capibaUserData.email;
            
            await usuarioLocal.save();
        } else {
            // Cria novo usuário no nosso banco 
            usuarioLocal = new Usuario({
                capiba_id: String(capibaUserData.id),
                cpf: cpf,
                nome: capibaUserData.name,
                email: capibaUserData.email
            });
            
            await usuarioLocal.save();
        }

        // Retorna token e dados
        res.json({
            message: "Login realizado com sucesso!",
            token: access_token,
            usuario: {
                _id: usuarioLocal._id,
                capiba_id: usuarioLocal.capiba_id,
                nome: usuarioLocal.nome,
                email: usuarioLocal.email,
                cpf: usuarioLocal.cpf,
                balance: capibaUserData.balance,
                newAchievements: capibaUserData.newAchievements
            }
        });

    } catch (error) {
        console.error("Erro no login:", error.response?.data || error.message);

        if (error.response?.status === 401 || error.response?.status === 403) {
            return res.status(401).json({ 
                message: "CPF ou senha inválidos." 
            });
        }

        res.status(500).json({ 
            message: "Erro ao fazer login. Tente novamente.",
            error: error.response?.data || error.message 
        });
    }
};

