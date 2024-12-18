'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { ModeToggle } from './ModeToggle';
import logo from '@/assets/logo.png';
import { cn } from '@/utils/cn';
import { Panel } from './Panel';

const Navbar = () => {
  const pathname = usePathname();

  const paths = [
    { name: 'Clientes', href: '/clients' },
    { name: 'Proyectos', href: '/projects' },
  ];

  const navigation = paths.map((item) => ({
    ...item,
    current: item.href === pathname,
  }));

  return (
    <nav className="bg-gray-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <Panel navigation={navigation} />
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link href="/">
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
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex h-full items-center space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={cn(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-200 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 font-medium'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <ModeToggle />
            <p>User</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
