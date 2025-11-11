import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './App/Home';
import TestPage from './App/TestPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
}

export default App;
