import api from './api';

export const comentarioService = {
  // Criar comentário em um local
  async criarComentario(local_id, texto) {
    try {
      const response = await api.post('/comentarios', {
        local_id,
        texto
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao criar comentário' };
    }
  },

  // Listar comentários de um local
  async listarComentarios(local_id) {
    try {
      const response = await api.get(`/comentarios/local/${local_id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao listar comentários' };
    }
  },

  // Atualizar comentário
  async atualizarComentario(id, texto) {
    try {
      const response = await api.put(`/comentarios/${id}`, { texto });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao atualizar comentário' };
    }
  },

  // Deletar comentário
  async deletarComentario(id) {
    try {
      const response = await api.delete(`/comentarios/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao deletar comentário' };
    }
  }
  
};