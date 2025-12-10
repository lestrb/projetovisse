import api from './api';

export const capibaService = {

//Fazer check-in em um local, isso vai dar pontos Capiba ao usuário
  async fazerCheckIn(dados) {
    try {
      const response = await api.post('/check-in', {
        userIdentifier: dados.userIdentifier,
        eventName: dados.eventName || 'Visita a local cultural',
        checkInDateTime: new Date().toISOString(),
        cidade: dados.cidade || 'Recife',
        bairro: dados.bairro,
        rua: dados.rua,
        identifier: dados.identifier,
        document: dados.document,
        latitude: dados.latitude,
        longitude: dados.longitude,
        eventDescription: dados.eventDescription
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao fazer check-in' };
    }
  },

//Fazer check-in em local com desafio, Ganha pontos ao completar um desafio
  async checkInComDesafio(challengeId, requirementId, latitude, longitude) {
    try {
      const response = await api.post(
        `/check-in/location/challenge/${challengeId}/requirement/${requirementId}`,
        { latitude, longitude }
      );
      return response.data; 
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao fazer check-in com desafio' };
    }
  },

//Listar desafios disponíveis
  async listarDesafios() {
    try {
      const response = await api.get('/self/challenges');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao listar desafios' };
    }
  },

//Buscar saldo atual de pontos
  async buscarSaldo() {
    try {
      const response = await api.get('/self');
      return response.data.balance;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao buscar saldo' };
    }
  }
};