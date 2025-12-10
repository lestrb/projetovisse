import geocodeAddress from '../services/geocodingService.js';

async function testGeocoding() {
    console.log('🧪 Testando o serviço de geocoding...\n');
    
    const enderecosParaTestar = [
        'Rua do Sol, Recife, PE',
        'Avenida Paulista, 1000, São Paulo, SP',
        'Praça da Sé, São Paulo, SP',
        'Endereço que não existe, 999999, XXX, YY', // Deve falhar
        'Brasil' // deve falhar
    ];
    
    for (let endereco of enderecosParaTestar) {
        console.log(` Testando: "${endereco}"`);
        try {
            const resultado = await geocodeAddress(endereco);
            console.log(` SUCESSO:`);
            console.log(`   Latitude: ${resultado.latitude}`);
            console.log(`   Longitude: ${resultado.longitude}`);
            console.log(`   Endereço completo: ${resultado.endereco_completo}`);
            console.log(`   Importância: ${resultado.importancia}`);
            console.log(`   Tipo: ${resultado.tipo}\n`);
        } catch (error) {
            console.log(` ERRO: ${error.message}\n`);
        }
        

        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log(' Teste do geocoding concluído!');
}

testGeocoding();