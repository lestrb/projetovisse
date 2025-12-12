import React from 'react';
import { render, screen } from '@testing-library/react';
import ConversaoCapibaScreen from '../pages/ConversaoCapiba/ConversaoCapibaScreen';
import { BrowserRouter } from 'react-router-dom';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('BB-04: Teste de Interface - Conversão', () => {
  test('Deve exibir o texto de moedas na tela', () => {
    render(
      <BrowserRouter>
        <ConversaoCapibaScreen />
      </BrowserRouter>
    );
    // Verifica se renderiza elementos chave da tela
    const labelElement = screen.getByText(/Capibas/i);
    expect(labelElement).toBeInTheDocument();
  });
});