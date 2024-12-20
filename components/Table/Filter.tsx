import { Table } from '@tanstack/react-table';
import { Button } from '../ui/button';
import DialogDemo from '../ui/dialog';
import { DialogDemoShadcn } from '../ui/dialog-example-shadcn';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Filter({ table }: { table: Table<any> }) {
  return (
    <DialogDemo />
    // <DialogDemoShadcn />
  );
}
