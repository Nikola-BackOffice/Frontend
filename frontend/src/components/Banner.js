import React from 'react';
import logo from '../assets/logo.png';
function Banner() {
  return (
    <div className="bg-gray-800 text-white text-center py-4 flex items-center">
      <img src={logo} style={{ width: 'auto', height: '40px', filter: 'brightness(0) invert(1)' }} alt="Logo" className="ml-4" />
      <div className="ml-4">
        <a href="/clientes" className="text-white hover:underline mx-2">Clientes</a>
        <a href="/proyectos" className="text-white hover:underline mx-2">Proyectos</a>
      </div>
    </div>
  );
}

export default Banner; 