import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './App/Home';
import TestPage from './App/TestPage';
import PaginaInicial from './App/Home/PaginaInicial';

function App() {
  return (
    <Routes>
      {/* Página inicial */}
      <Route path="/" element={<PaginaInicial />} />
      
      {/* Outras rotas */}
      <Route path="/home" element={<Home />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
}

export default App;

