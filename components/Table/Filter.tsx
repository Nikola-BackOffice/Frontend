import { Table } from '@tanstack/react-table';
import { Button } from '../ui/button';
import Dialog from '../ui/dialog';
import { InputForm } from '../example/forms';
import { DialogDemoShadcn } from '../example/dialog-example-shadcn';
import { SheetDemo } from '../example/sheet-shadcn-example';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Filter({ table }: { table: Table<any> }) {
  return (
    // <Dialog trigger={dialogButton} title="Dialog Title" description="Dialog Description" className="sm:max-w-[425px]">
    //   <InputForm />
    // </Dialog>
    // <DialogDemoShadcn />
    <SheetDemo />
  );
}

const dialogButton = (
  <Button variant="outline">Filtros</Button>
);
