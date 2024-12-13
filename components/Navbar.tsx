import Image from 'next/image';
import logo from '../assets/logo.png';
import { ModeToggle } from './mode-toggle';

const Navbar = () => {
  return (
    <div className="bg-gray-800 text-white text-center py-4 flex items-center">
      <Image
        src={logo}
        style={{
          width: 'auto',
          height: '40px',
          filter: 'brightness(0) invert(1)',
        }}
        alt="Logo"
        className="ml-4"
      />
      <div className="ml-4">
        <a href="/clients" className="text-white hover:underline mx-2">
          Clientes
        </a>
        <a href="/projects" className="text-white hover:underline mx-2">
          Proyectos
        </a>
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
