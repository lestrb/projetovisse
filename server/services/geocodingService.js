import axios from 'axios';

const geocodeAddress = async (endereco) => {
  try {
    // Requisição para API do OpenStreetMap (Nominatim)
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

    // Verifica se encontrou resultados
    if (!response.data || response.data.length === 0) {
      throw new Error('Endereço não encontrado. Verifique se digitou corretamente.');
    }

    const result = response.data[0];
    const addressType = result.type || '';
    const addressClass = result.class || '';

    const tiposEspecificos = [
      'house', 'building', 'residential', 'commercial', 'retail',
      'road', 'street', 'pedestrian', 'footway', 'path',
      'museum', 'university', 'school', 'hospital', 'clinic',
      'restaurant', 'cafe', 'bar', 'shop', 'mall',
      'park', 'attraction', 'monument', 'memorial',
      'bus_stop', 'station', 'subway', 'airport',
      'hotel', 'apartment', 'office', 'church', 'mosque', 'temple'
    ];

    // Lista de tipos muito genericos que devem ser rejeitados
    const tiposMuitoGenericos = [
      'country', 'state', 'region', 'province',
      'city', 'town', 'village', 'municipality',
      'administrative'
    ];

    const isGenerico = tiposMuitoGenericos.includes(addressType) || 
                       tiposMuitoGenericos.includes(addressClass) ||
                       addressType.includes('administrative');

    if (isGenerico) {
      throw new Error('Endereço muito genérico. Adicione mais detalhes (rua, número, bairro ou ponto de referência).');
    }

    // verificar se o resultado tem pelo menos um CEP, rua ou ponto específico
    const displayName = result.display_name || '';
    const temCEP = /\d{5}-?\d{3}/.test(displayName);
    const temNumero = /\d+/.test(endereco); // Verifica se o usuário digitou algum número
    const isEspecifico = tiposEspecificos.includes(addressType) || 
                         tiposEspecificos.includes(addressClass);

    // Se não é um tipo específico conhecido, não tem CEP e nem número, rejeita
    if (!isEspecifico && !temCEP && !temNumero) {
      throw new Error('Endereço muito genérico. Adicione rua, número ou bairro para maior precisão.');
    }

    return {
      latitude: parseFloat(result.lat),
      longitude: parseFloat(result.lon),
      endereco_completo: result.display_name,
      tipo: addressType
    };

  } catch (error) {
    // Se for um erro que já lançamos (validação), relançar como está
    if (error.message.includes('Endereço não encontrado') ||
        error.message.includes('muito genérico')) {
      throw error;
    }

    // Erros de rede ou da API
    console.error('Erro no geocoding:', error.message);
    throw new Error('Serviço de localização temporariamente indisponível. Tente novamente mais tarde.');
  }
}; 

export default geocodeAddress;