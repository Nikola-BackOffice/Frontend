import { Table } from '@tanstack/react-table';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { FilterForm } from '@/components/forms/FilterForm';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Filter({ table }: { table: Table<any> }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Filtros</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className=''>
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription>Filtra los resultados de la tabla.</SheetDescription>
        </SheetHeader>
        <FilterForm />
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Filtrar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
