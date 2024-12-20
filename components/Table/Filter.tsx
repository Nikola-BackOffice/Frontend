import { Table } from '@tanstack/react-table';
import { Button } from '../ui/button';
import DialogDemo from '../ui/dialog';
import { InputForm } from '../forms/example';
import { DialogDemoShadcn } from '../ui/dialog-example-shadcn';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Filter({ table }: { table: Table<any> }) {
  return (
    <DialogDemo trigger={<button className="text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded bg-background px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
      Edit profile
    </button>} title="Dialog Title" description="Dialog Description">
      <InputForm />
    </DialogDemo>
    // <DialogDemoShadcn />
  );
}
