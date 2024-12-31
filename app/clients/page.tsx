'use client';

import { useEffect, useState } from 'react';
import { Cell, ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';

import { getClients } from '@/api/client/getClients';
import { TableScroll } from '@/components/TableScroll';
import useDebounce from '@/hooks/useDebounce';
import { Checkbox } from '@/components/ui/checkbox';
import { Client } from '@/types/Clients';

const Clients = () => {
  const router = useRouter();

  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const searchDebouncedValue = useDebounce(searchValue);

  const columns: ColumnDef<Client>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    { id: 'identifier', accessorKey: 'id', header: 'ID', enableHiding: false },
    {
      id: 'name',
      accessorKey: 'nombre_completo',
      header: 'Nombre',
      enableHiding: false,
    },
    { id: 'rut', accessorKey: 'rut', header: 'RUT' },
    { id: 'phone', accessorKey: 'telefono', header: 'Teléfono' },
    { id: 'email', accessorKey: 'mail', header: 'Correo' },
    {
      id: 'metadata',
      accessorFn: (row) =>
        `${row.id} ${row.rut} ${row.nombre_completo} ${row.mail} ${row.telefono}`,
      header: 'Metadata',
    },
  ];

  const handleCellClick = (cell: Cell<any, unknown>) => {
    console.log(cell);
    if (cell.column.id === 'select') {
      cell.row.toggleSelected();
    } else {
      router.push(`/clients/${cell.row.original.id}`);
    }
  };
  const handleSearch = (value: string) => setSearchValue(value);

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);

      const clients = await getClients();
      setData(clients);

      setIsLoading(false);
    };

    fetchClients();
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-10">
      <div className="w-full max-w-6xl">
        <div className="my-8 text-4xl font-medium">Clientes</div>
        <TableScroll
          searchValue={searchValue}
          isLoading={isLoading}
          columns={columns}
          data={data}
          debounceSearchValue={searchDebouncedValue}
          handleCellClick={handleCellClick}
          handleSearch={handleSearch}
          containerClassName="w-full justify-center items-center space-y-5"
        />
      </div>
    </div>
  );
};

export default Clients;
