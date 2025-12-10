import api from './api';

export const authService = {
  // Login com CPF (não email!)
  async login(cpf, senha) {
    try {
      const response = await api.post('/auth/login', { cpf, senha });
      
      if (response.data.token) {
        // Salva token e dados do usuário no localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.usuario));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao fazer login' };
    }
  },

  // Registro não existe mais (API Capiba gerencia os usuários)
  async register() {
    throw new Error('Registro não disponível. Use o sistema Conecta Recife.');
  },

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Verifica se usuário está autenticado
  isAuthenticated() {
    return localStorage.getItem('token') !== null;
  },

  // Obtém dados do usuário atual
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};