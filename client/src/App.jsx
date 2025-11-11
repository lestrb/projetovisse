import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

const MapScreen = lazy(() => import('./pages/MapScreen'));
const TestPage = lazy(() => import('./pages/TestPage'));
const Login = lazy(() => import('./pages/Login'));

export default function App() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        {/* rota pública inicial: login */}
        <Route path="/" element={<Login />} />

        {/* rotas pós-login */}
        <Route path="/app" element={<MainLayout />}>
          <Route index element={<MapScreen />} />
          <Route path="mapScreen" element={<MapScreen />} />
          <Route path="test" element={<TestPage />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
