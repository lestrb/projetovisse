import api from './api';

export const pontuacaoService = {
  // Buscar pontuação do usuário logado
  async buscarMinhaPontuacao() {
    try {
      const response = await api.get('/pontuacao/minha');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao buscar pontuação' };
    }
  },

  // Converter pontos Visse em Capibas
  async converterParaCapiba(pontos_converter, latitude, longitude) {
    try {
      const response = await api.post('/pontuacao/converter', {
        pontos_converter,
        latitude,
        longitude
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao converter pontos' };
    }
  }
};