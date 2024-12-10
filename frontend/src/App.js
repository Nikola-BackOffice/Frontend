import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Banner from './components/Banner';
import './input.css';
import Clients from './pages/Clients';
import Projects from './pages/Projects';
function App() {
  const [clients, setClients] = useState([]);

  return (
    <Router>
      <Banner />
      <Routes>
        <Route path="/clientes" element={<Clients />} />
        <Route path="/proyectos" element={<Projects />} />
        <Route path="/" element={<Clients />} />
      </Routes>
    </Router>
  );
}

export default App;
