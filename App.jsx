import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importe suas páginas e layouts
import Login from './pages/Login/index.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import PaginaInicialFeed from './pages/Feed/PaginaInicial.jsx'; // A página de feed correta
import MapScreen from './pages/MapScreen/index.jsx';
import FormularioCadastroLocal from './pages/Formulario/FormularioCadastroLocal.jsx';
// Importamos a tela de DescriçãoLocal
import DescricaoLocal from './pages/Descrição Local/DescriçãoLocal.jsx';
// Telas de perfil para os usuarios e de favoritos
import ProfileScreen from './pages/Profile/ProfileScreen.jsx'; 
import FavoriteScreen from './pages/Favorites/FavoriteScreen.jsx';

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

        {/* Rota para o formulário de adicionar local */}
        <Route path="adicionar-local" element={<FormularioCadastroLocal />} />

        {/* [NOVA ROTA] Rota dinâmica para a descrição do local.
            O ":id" é um parâmetro que vai mudar (ex: /app/local/1, /app/local/sovaj-bar, etc.)
        */}
        <Route path="local/:id" element={<DescricaoLocal />} />

        {/* Rota para a tela de perfil do usuário */}
        <Route path="perfil" element={<ProfileScreen />} />
        
        {/* Rota para a tela de favoritos */} 
        <Route path="favoritos" element={<FavoriteScreen />} />
        

      </Route>
      
      {/* Adicione aqui rotas que NÃO usam o MainLayout, se necessário */}
      {/* ex: <Route path="/sobre" element={<PaginaSobre />} /> */}

    </Routes>
  );
}

export default App;