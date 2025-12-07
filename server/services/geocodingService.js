import axios from 'axios';

// Criar função principal geocodeAddress(endereco) (a fazer)
const geocodeAddress = async (endereco) => {
  try {
    // Fazer requisição para API do OpenStreetMap (Nominatim) (a fazer)
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: endereco,
        format: 'json',
        limit: 1,
        countrycodes: 'br',
        'accept-language': 'pt'
      },
      headers: {
        'User-Agent': 'ProjetoVisse/1.0'
      }
    });

    // Verificar se encontrou resultados, se o endereço não for encontrado: Retornar erro 400 para o usuário corrigir o endereço. (a fazer)
    if (response.data && response.data.length > 0) {
      const result = response.data[0];

      const importance = parseFloat(result.importance || 0);
      const addressType = result.type || '';


      if (importance < 0.3) {
        throw new Error('Endereço muito genérico ou impreciso');
      }

      return {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
        endereco_completo: result.display_name,
        importancia: importance,
        tipo: addressType
      };
    } else {

      throw new Error('Endereço não encontrado.');
    }

  } catch (error) {
    // Tratar erros de conexão (a fazer)
    if (error.message.includes('Endereço não encontrado') ||
      error.message.includes('muito genérico ou impreciso')) {
      throw error;
    }

    // Erro de conexão com a API
    throw new Error('Serviço de localização temporariamente indisponível. Tente novamente mais tarde.');
  }


}; 

export default geocodeAddress;