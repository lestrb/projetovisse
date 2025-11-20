// Auth controller for handling authentication-related requests
import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registro = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        // 1. Verificar se usuário já existe
        // 2. Criar usuário no banco
        // 3. Retornar usuário
        // Opcional:
        // 4. Fazer hash da senha
        // 5. Gerar token JWT
        // 6. Retornar token

    } catch (error) {
        res.status(500).json({ message: "Erro no servidor", error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // 1. Buscar usuário por email
        // 2. Verificar senha
        // 3. Retornar usuário
        // Opcional:
        // 4. Gerar token JWT
        // 5. Retornar token

    } catch (error) {
        res.status(500).json({ message: "Erro no servidor", error: error.message });
    }
};