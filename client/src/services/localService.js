import api from './api';

export const localService = {
  // Criar local 
  async criarLocalComUpload(formData) {
    try {
      
      const response = await api.post('/locais', formData, {
        headers: {
          
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao criar local' };
    }
  },

  // Atualizar local 
  async atualizarLocalComUpload(id, formData) {
    try {
      const response = await api.put(`/locais/${id}`, formData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao atualizar local' };
    }
  },


  async listarLocais() {
    try {
      const response = await api.get('/locais');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao listar locais' };
    }
  },

  async buscarLocalPorId(id) {
    try {
      const response = await api.get(`/locais/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao buscar local' };
    }
  },

  async deletarLocal(id) {
    try {
      const response = await api.delete(`/locais/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao deletar local' };
    }
  },

  async curtirLocal(id) {
    try {
      const response = await api.post(`/locais/${id}/curtir`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao curtir local' };
    }
  }
};