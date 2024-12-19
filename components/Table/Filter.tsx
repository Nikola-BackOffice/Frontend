import { Table } from '@tanstack/react-table';
import { Button } from '../ui/button';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Filter({ table }: { table: Table<any> }) {
  return (
    <Button
      variant="outline"
      disabled
      className="flex rounded-md border border-input px-4 py-2 text-base shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
    >
      Filtros
    </Button>
  );
}
