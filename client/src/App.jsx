import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importe suas páginas e layouts
import Login from './pages/Login/index.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import PaginaInicialFeed from './pages/Feed/PaginaInicial.jsx'; // A página de feed correta
import MapScreen from './pages/MapScreen/index.jsx';
import FormularioCadastroLocal from './pages/Formulario/FormularioCadastroLocal.jsx';
// OBS: O 'Home' antigo e o 'TestPage' que estava faltando foram removidos.

function App() {
  return (
    <Routes>
      {/* Rota 1: A raiz do site, que será a tela de Login */}
      <Route path="/" element={<Login />} />

      {/* Rota 2: O layout principal da aplicação logada, em "/app" */}
      <Route path="/app" element={<MainLayout />}>
        
        {/* A página inicial (index) dentro do layout principal será o seu Feed */}
        <Route index element={<PaginaInicialFeed />} />
        
        {/* A página do mapa em "/app/mapa" */}
        <Route path="mapa" element={<MapScreen />} />

        {/* [NOVO] Rota para o formulário de adicionar local */}
        <Route path="adicionar-local" element={<FormularioCadastroLocal />} />
        
        {/* Aqui você pode adicionar outras rotas que devem aparecer dentro do layout principal
          ex: <Route path="perfil" element={<PaginaPerfil />} />
          ex: <Route path="buscar" element={<PaginaBusca />} /> 
        */}

      </Route>
      
      {/* Adicione aqui rotas que NÃO usam o MainLayout, se necessário */}
      {/* ex: <Route path="/sobre" element={<PaginaSobre />} /> */}

    </Routes>
  );
}

export default App;