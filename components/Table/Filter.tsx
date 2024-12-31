import { Table } from '@tanstack/react-table';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { FilterForm } from '@/components/forms/FilterForm';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Filter = ({ table }: { table: Table<any> }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Filtros</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription>Filtra los resultados de la tabla por:</SheetDescription>
        </SheetHeader>
        <FilterForm />
      </SheetContent>
    </Sheet>
  );
};
