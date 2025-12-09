import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout e tela de Login
import Login from './pages/Login/index.jsx';
import MainLayout from './layouts/MainLayout.jsx';

// Telas principais
import PaginaInicialFeed from './pages/Feed/PaginaInicial.jsx';
import MapScreen from './pages/MapScreen/index.jsx';
import FormularioCadastroLocal from './pages/Formulario/FormularioCadastroLocal.jsx';
import ConversaoCapibaScreen from './pages/ConversaoCapiba/ConversaoCapibaScreen.jsx';

// Telas novas que eu adicionei e caminhos atualizados
import ProfileScreen from './pages/Profile/ProfileScreen.jsx';
import ProfileEditScreen from './pages/Profile/ProfileEditScreen.jsx';
import ConfiguracoesScreen from './pages/Profile/ConfiguracoesScreen.jsx';
import FavoriteScreen from './pages/Favorites/FavoriteScreen.jsx';
import DetalhesLocalScreen from './pages/Descrição Local/DetalhesLocalScreen.jsx'; // Nova tela de visualização

function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* App */}
      <Route path="/app" element={<MainLayout />}>
        {/* Feed */}
        <Route index element={<PaginaInicialFeed />} />
        {/* Mapa com filtros */}
        <Route path="mapa" element={<MapScreen />} />
        {/* Redirecionar a busca para o mapa */}
        <Route path="buscar" element={<Navigate to="/app/mapa" replace />} />
        {/* Perfil e configurações */}
        <Route path="perfil" element={<ProfileScreen />} />
        <Route path="perfil/editar" element={<ProfileEditScreen />} />
        <Route path="configuracoes" element={<ConfiguracoesScreen />} />
        {/* Favoritos */}
        <Route path="favoritos" element={<FavoriteScreen />} />
        {/* Cadastro de locais (com o GPS) */}
        <Route path="adicionar-local" element={
            <FormularioCadastroLocal 
                aoEnviar={(d) => console.log("Dados enviados:", d)} 
                aoVoltar={() => window.history.back()} 
            />
        } />
        {/* Visualizar o local */}
        <Route path="local/:id" element={<DetalhesLocalScreen />} />
        {/* Conversão de pontos */}
        <Route path="conversao" element={<ConversaoCapibaScreen />} />

      </Route>
    </Routes>
  );
}

export default App;
