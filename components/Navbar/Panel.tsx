'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export const Panel = ({
  navigation,
}: {
  navigation: { name: string; href: string; current: boolean }[];
}) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = () => {
    setOpen(!open);
  };

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger>
        {open ? <X className="size-6" /> : <Menu className="size-6" />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {navigation.map((item) => (
          <DropdownMenuItem key={item.name}>
            <Link href={item.href}>{item.name}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
