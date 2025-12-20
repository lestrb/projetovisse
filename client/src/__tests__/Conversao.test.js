import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import ConversaoCapibaScreen from '../pages/ConversaoCapiba/ConversaoCapibaScreen';
import { BrowserRouter } from 'react-router-dom';

// MOCK DO SERVIÇO (Simulação)
// Isso impede que o teste tente chamar a API de verdade ou quebre ao importar o axios
jest.mock('../services/pontuacaoService', () => ({
  pontuacaoService: {
    converterParaCapiba: jest.fn(),
    buscarMinhaPontuacao: jest.fn()
  }
}));

describe('BB-04: Teste de Interface - Conversão', () => {
  test('Deve exibir o texto de moedas na tela', () => {
    render(
      <BrowserRouter>
        <ConversaoCapibaScreen />
      </BrowserRouter>
    );

    // 'getAllByText' porque a palavra "Capiba" pode aparecer mais de uma vez na tela.
    // O regex /Capibas/i ignora maiúsculas/minúsculas.
    const labelElements = screen.getAllByText(/Capibas/i);
    
    // Verifica se encontrou pelo menos um elemento com esse texto
    expect(labelElements.length).toBeGreaterThan(0);
  });
});