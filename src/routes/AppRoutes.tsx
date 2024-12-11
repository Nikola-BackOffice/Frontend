import { Route, Routes, BrowserRouter } from 'react-router-dom';
import App from '../App.tsx';

import Client from '@/pages/Client';
import Clients from '@/pages/Clients';
import Projects from '@/pages/Projects';
import Proyecto from '@/pages/Proyecto';

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/clientes" element={<Clients />} />
      <Route path="/proyectos" element={<Projects />} />
      <Route path="/clientes/:id" element={<Client />} />
      <Route path="/proyectos/:id" element={<Proyecto />} />
    </Routes>
  </BrowserRouter>
);
