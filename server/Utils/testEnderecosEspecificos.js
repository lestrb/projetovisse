import geocodeAddress from '../services/geocodingService.js';

async function testEnderecos() {
    console.log('🧪 Testando endereços específicos...\n');
    
    const testes = [
        {
            endereco: 'R. do Sol, 123 - Santo Antônio, Recife - PE',
            descricao: 'Endereço completo com número e bairro'
        },
        {
            endereco: 'Avenida Paulista, 1578, Bela Vista, São Paulo, SP',
            descricao: 'Endereço famoso com número'
        },
        {
            endereco: 'Shopping Recife, Recife, PE',
            descricao: 'Ponto de referência'
        },
        {
            endereco: 'UFPE, Recife, PE',
            descricao: 'Instituição conhecida'
        },
        {
            endereco: 'Recife, PE',
            descricao: 'Apenas cidade - deve falhar'
        },
        {
            endereco: 'Brasil',
            descricao: 'País - deve falhar'
        }
    ];
    
    for (let teste of testes) {
        console.log(` ${teste.descricao}:`);
        console.log(`   Endereço: "${teste.endereco}"`);
        
        try {
            const resultado = await geocodeAddress(teste.endereco);
            console.log(` SUCESSO:`);
            console.log(`   Lat: ${resultado.latitude}`);
            console.log(`   Lon: ${resultado.longitude}`);
            console.log(`   Tipo: ${resultado.tipo}`);
            console.log(`   Partes: ${resultado.endereco_completo.split(',').length}\n`);
        } catch (error) {
            console.log(` ERRO: ${error.message}\n`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

testEnderecos();