import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Telas principais
import Login from './pages/Login/index.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import PaginaInicialFeed from './pages/Feed/PaginaInicial.jsx';
import MapScreen from './pages/MapScreen/index.jsx';
import FormularioCadastroLocal from './pages/Formulario/FormularioCadastroLocal.jsx';

// Telas de locais e gameficação
import DetalhesLocalScreen from './pages/Descrição Local/DetalhesLocalScreen.jsx';
import ConversaoCapibaScreen from './pages/ConversaoCapiba/ConversaoCapibaScreen.jsx';

// Telas de perfil e favoritos
import ProfileScreen from './pages/Profile/ProfileScreen.jsx'; 
import ProfileEditScreen from './pages/Profile/ProfileEditScreen.jsx';
import FavoriteScreen from './pages/Favorites/FavoriteScreen.jsx';
import VisitedScreen from './pages/Profile/VisitedScreen.jsx'; 
import ConfiguracoesScreen from './pages/Profile/ConfiguracoesScreen.jsx';

function App() {
  return (
    <Routes>
      {/* Tela de entrada deslogada */}
      <Route path="/" element={<Login />} />

      {/* Área logada */}
      <Route path="/app" element={<MainLayout />}>
        <Route index element={<PaginaInicialFeed />} />
        <Route path="mapa" element={<MapScreen />} />
        <Route path="adicionar-local" element={<FormularioCadastroLocal />} />
        
        {/* Rota que recebe o ID do MongoDB para o check-in */}
        <Route path="local/:id" element={<DetalhesLocalScreen />} />

        {/* Gerenciamento de perfil e pontos */}
        <Route path="perfil" element={<ProfileScreen />} />
        <Route path="perfil/editar" element={<ProfileEditScreen />} />
        <Route path="perfil/visitas" element={<VisitedScreen />} />
        <Route path="favoritos" element={<FavoriteScreen />} />
        
        {/* Configurações do App e pontos */}
        <Route path="configuracoes" element={<ConfiguracoesScreen />} />
        <Route path="conversao" element={<ConversaoCapibaScreen />} />
      </Route>
    </Routes>
  );
}

export default App;
