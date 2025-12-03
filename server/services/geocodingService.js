import axios from 'axios';

// Criar função principal geocodeAddress(endereco) (a fazer)
const geocodeAddress = async (endereco) => {
    try {
      // Fazer requisição para API do OpenStreetMap (Nominatim) (a fazer)
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {

      });
      // Verificar se encontrou resultados, se o endereço não for encontrado: Retornar erro 400 para o usuário corrigir o endereço. (a fazer)

    } catch (error) {
        // Tratar erros de conexão (a fazer)
       
      }
    }; 