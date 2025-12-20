import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ConversaoCapibaScreen from '../pages/ConversaoCapiba/ConversaoCapibaScreen';

// --- MOCK ROBUSTO ---
// 1. Mock do useNavigate (do router)
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

// 2. Mock do Serviço
// Ajuste o caminho '../services/pontuacaoService' conforme a localização deste arquivo de teste.
// Se este teste está na pasta "src/tests", o caminho "../services..." está correto.
jest.mock('../services/pontuacaoService', () => ({
  pontuacaoService: {
    converterParaCapiba: jest.fn(),
    buscarMinhaPontuacao: jest.fn().mockResolvedValue({ pontos_visse: 2500 })
  }
}));

// 3. Mock da Geolocalização (Opcional, mas evita erros no console)
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn()
};
global.navigator.geolocation = mockGeolocation;

describe('BB-04: Teste de Interface - Conversão', () => {
  
  test('Deve renderizar o título e o saldo de Capibas', () => {
    render(
      <BrowserRouter>
        <ConversaoCapibaScreen />
      </BrowserRouter>
    );

    // screen.debug();
    // Verificação 1: O título da página aparece? (Garante que o componente montou)
    const titulo = screen.getByText(/Carteira Digital/i);
    expect(titulo).toBeInTheDocument();

    // Verificação 2: A palavra "Capibas" aparece?
    // Usamos getAllByText porque pode aparecer mais de uma vez na tela
    const textosCapiba = screen.getAllByText(/Capibas/i);
    expect(textosCapiba.length).toBeGreaterThan(0);
  });
});