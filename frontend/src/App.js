import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


import './App.css';
import Banner from './components/Banner';
import './input.css';
import Client from './pages/Client';
import Clients from './pages/Clients';
import Projects from './pages/Projects';
import Proyecto from './pages/Proyecto';
function App() {
  const [clients, setClients] = useState([]);

  return (
    <Router>
      <Banner />
      <Routes>
        <Route path="/clientes" element={<Clients />} />
        <Route path="/proyectos" element={<Projects />} />
        <Route path="/clientes/:id" element={<Client />} />
        <Route path="/proyectos/:id" element={<Proyecto />} />
      </Routes>
    </Router>
  );
}

export default App;
