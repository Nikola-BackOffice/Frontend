"use client";

import { useEffect, useState } from "react";
import {
  Cell,
  ColumnDef,
  ColumnFilter,
  ColumnSort,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import { getPaginatedClients } from "@/api/getPaginatedClients";
import { Table } from "@/components/Table";
import { SearchBar } from "@/components/SearchBar";
import useDebounce from "@/hooks/useDebounce";
import { Checkbox } from "@/components/ui/checkbox";
import { Client } from "@/types/Clients";

const Clients = () => {
  const router = useRouter();

  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<ColumnSort>();
  const [filters, setFilters] = useState<ColumnFilter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const searchDebouncedValue = useDebounce(searchValue);

  const addFilter = (id: string, value: any) =>
    setFilters((prev) => [...prev, { id, value }]);
  const updateFilter = (id: string, value: any) => {
    const filterIndex = filters.findIndex((filter) => filter.id === id);
    const newFilters = filters;
    newFilters[filterIndex] = { id, value };
    setFilters(newFilters);
  };
  const removeFilter = (id: string) => {
    const filterIndex = filters.findIndex((filter) => filter.id === id);
    const newFilters = filters;
    newFilters.splice(filterIndex, 1);
    setFilters(newFilters);
  };

  const columns: ColumnDef<Client>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
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
    { id: "identifier", accessorKey: "id", header: "ID", enableHiding: false },
    {
      id: "name",
      accessorKey: "nombre_completo",
      header: "Nombre",
      enableHiding: false,
    },
    { id: "rut", accessorKey: "rut", header: "RUT" },
    { id: "phone", accessorKey: "telefono", header: "Teléfono" },
    { id: "email", accessorKey: "mail", header: "Correo" },
    {
      id: "metadata",
      accessorFn: (row) =>
        `${row.id} ${row.rut} ${row.nombre_completo} ${row.mail} ${row.telefono}`,
      header: "Metadata",
    },
  ];

  const handleCellClick = (cell: Cell<any, unknown>) => {
    console.log(cell);
    if (cell.column.id === "select") {
      cell.row.toggleSelected();
    } else {
      router.push(`/clients/${cell.row.original.id}`);
    }
  };
  const handlePageChange = (page: number) => setPage(page);
  const handleSearch = (value: string) => setSearchValue(value);

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);

      const clients = await getPaginatedClients({
        page: 1,
        sort: "",
        filters: "",
        search: "",
      });
      setData(clients);

      setIsLoading(false);
    };

    fetchClients();
  }, [page, sort, filters, searchValue]);

  return (
    <div className="flex flex-col h-full w-full items-center justify-center p-10">
      <div className="w-full max-w-6xl">
        <div className="text-4xl font-medium my-8">Clientes</div>
        <Table
          isLoading={isLoading}
          columns={columns}
          data={data}
          rowsCount={data.length}
          rowsPerPage={data.length}
          searchValue={searchDebouncedValue}
          filters={filters}
          handlePageChange={handlePageChange}
          handleCellClick={handleCellClick}
          handleSearch={handleSearch}
          containerClassName="w-full justify-center items-center space-y-5"
        />
      </div>
    </div>
  );
};

export default Clients;
