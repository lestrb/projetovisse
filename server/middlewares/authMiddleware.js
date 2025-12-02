// authMiddleware.js
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const authMiddleware = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                message: 'Token não fornecido ou formato inválido. Use: Bearer <token>' 
            });
        }

        // Extrair o token
        const token = authHeader.split(' ')[1];

        // Tenta pegar o segredo do .env, mesmo padrão do authController
        const secret = process.env.JWT_SECRET || 'segredo_padrao_desenvolvimento';

        // Verificar e decodificar o token
        const decoded = jwt.verify(token, secret);
        
        // Buscar usuário pelo ID do token (sem a senha)
        const usuario = await Usuario.findById(decoded.id).select('-senha');
        
        if (!usuario) {
            return res.status(401).json({ message: 'Token inválido - usuário não encontrado' });
        }

        // Adicionar usuário à request
        req.usuario = usuario;
        next();

    } catch (error) {
        console.error('Erro na autenticação:', error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token inválido' });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expirado' });
        }

        res.status(500).json({ message: 'Erro no servidor durante autenticação' });
    }
};

export default authMiddleware;

