import { ChevronDown } from 'lucide-react';
import { Table } from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { initialVisibleProjectIds } from '@/const';

export const ColumnSelector = ({ table }: { table: Table<any> }) => {
  const handleViewAll = () => {
    table.getAllColumns().forEach((column) => column.toggleVisibility(true));
  };

  const handleHideAll = () => {
    table
      .getAllColumns()
      .filter((column) => column.getCanHide() && !initialVisibleProjectIds.includes(column.id))
      .forEach((column) => column.toggleVisibility(false));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          Columns <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuCheckboxItem onClick={handleHideAll}>Comprimir</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem onClick={handleViewAll}>Expandir</DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide() && column.id !== 'metadata')
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {typeof column.columnDef.header === 'function'
                  ? column.id
                  : column.columnDef.header}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
