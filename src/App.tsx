import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VSLPage from './pages/VSLPage';
import {WhatsAppConnection} from './components/WhatsAppConnection';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vsl" element={<VSLPage />} />
      <Route path="/connect-whatsapp" element={<WhatsAppConnection />} />
    </Routes>
  );
}

export default App;
