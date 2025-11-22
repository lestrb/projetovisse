// Controlador de autenticação para lidar com solicitações relacionadas à autenticação
// DESENVOLVIMENTO --->>> colocar no .env o JWT_SECRET='frase_muito_secreta_e_complexa_para_o_token'
import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs'; // Hash de senhas
import jwt from 'jsonwebtoken'; // Tokens JWT

// Função auxiliar para gerar o Token JWT
const gerarToken = (id) => {
    // Tenta pegar o segredo do .env, se não tiver, usa um padrão (APENAS PRA DESENVOLVIMENTO <<<-------)
    const secret = process.env.JWT_SECRET || 'segredo_padrao_desenvolvimento';
    return jwt.sign({ id }, secret, {
        expiresIn: '30d', // Token expira em 30 dias
    });
};

export const registro = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        // Validação
        if (!nome || !email || !senha) {
            return res.status(400).json({ message: "Por favor, preencha todos os campos." });
        }

        // Verifica se usuário já existe
        const usuarioExistente = await Usuario.findOne({ email });
        
        if (usuarioExistente) {
            return res.status(400).json({ message: "Usuário já cadastrado com este e-mail." });
        }

        // Faz hash da senha - padrão'salt' de 10 rounds
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        // Cria usuário no banco
        const novoUsuario = await Usuario.create({
            nome,
            email,
            senha: senhaHash
        });

        // Gera token JWT e Retorna dados
        if (novoUsuario) {
            res.status(201).json({
                _id: novoUsuario._id,
                nome: novoUsuario.nome,
                email: novoUsuario.email,
                token: gerarToken(novoUsuario._id), // Token é enviado nos requisitos que o usuário fizer 
                message: "Usuário cadastrado com sucesso!"
            });
        } else {
            res.status(400).json({ message: "Dados de usuário inválidos." });
        }

    } catch (error) {
        console.error("Erro no registro:", error); // Aparece no console do servidor - pra debug
        res.status(500).json({ message: "Erro no servidor ao registrar usuário.", error: error.message }); // Mensagem pro cliente
    }
};

export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Validação
        if (!email || !senha) {
            return res.status(400).json({ message: "Por favor, informe e-mail e senha." });
        }

        // Busca usuário por email
        const usuario = await Usuario.findOne({ email });

        // Verifica se usuário existe e se a senha bate
        if (usuario && (await bcrypt.compare(senha, usuario.senha))) { // Compara a senha texto puro com a hash salva no banco
            
            // Retorna usuário e Token
            res.json({
                _id: usuario._id,
                nome: usuario.nome,
                email: usuario.email,
                token: gerarToken(usuario._id),
                message: "Login realizado com sucesso!"
            });

        } else {
            res.status(401).json({ message: "E-mail ou senha inválidos." }); // Sem especificar exatamente qual o erro
        }

    } catch (error) {
        console.error("Erro no login:", error); // Aparece no console do servidor - pra debug
        res.status(500).json({ message: "Erro no servidor ao fazer login.", error: error.message }); // Mensagem pro cliente
    }
};