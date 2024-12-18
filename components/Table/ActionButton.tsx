import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Project } from '@/types/Projects';

export const ActionButton = ({ row }: { row: Row<Project> }) => {
  const handleExpand = () => {
    console.log('Expandir todo');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(row.original.direccion);
  };

  const handleEdit = () => {
    console.log('Editar');
  };

  const handleDelete = () => {
    console.log('Borrar');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleExpand}>Expandir todo</DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopy}>Copiar dirección</DropdownMenuItem>
        <DropdownMenuItem onClick={handleEdit}>Editar</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>Borrar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
