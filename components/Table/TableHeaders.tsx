import { Table as ITable, Column, SortDirection, flexRender } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

export const TableHeaders = ({ table, className }: { table: ITable<any>; className?: string }) => {
  return (
    <TableHeader className={cn(className)}>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id} className="text-center">
                {header.isPlaceholder ? null : typeof header.column.columnDef.header ===
                  'string' ? (
                  <HeaderWithSort
                    column={header.column}
                    headerName={header.column.columnDef.header as string}
                  />
                ) : (
                  flexRender(header.column.columnDef.header, header.getContext())
                )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};

const HeaderWithSort = ({ column, headerName }: { column: Column<any>; headerName: string }) => {
  const sortDirection = column.getIsSorted();
  return (
    <Button
      variant="ghost"
      onClick={() => {
        if (!column.getIsSorted()) column.toggleSorting(false);
        else if (column.getIsSorted() === 'asc') column.toggleSorting(true);
        else column.clearSorting();
      }}
    >
      {headerName}
      <SortAwareArrow sortDirection={sortDirection} className="ml-2 h-4 w-4" />
    </Button>
  );
};

const SortAwareArrow = ({
  sortDirection,
  className = '',
}: {
  sortDirection: false | SortDirection;
  className: string;
}) => {
  if (sortDirection === 'asc') return <ArrowUp className={className} />;

  if (sortDirection === 'desc') return <ArrowDown className={className} />;

  return <ArrowUpDown className={className} />;
};
