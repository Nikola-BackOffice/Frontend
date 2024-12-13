"use client";

import { useEffect, useState } from "react";
import { ColumnDef, ColumnFilter, ColumnSort } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import { getPaginatedClients } from "@/api/getPaginatedClients";
import { Table } from "@/components/Table";
import { SearchBar } from "@/components/SearchBar";
import useDebounce from "@/hooks/useDebounce";

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

  const columns: ColumnDef<any>[] = [
    { id: "identifier", accessorKey: "id", header: "ID" },
    { id: "name", accessorKey: "nombre_completo", header: "Nombre" },
    { id: "rut", accessorKey: "rut", header: "RUT" },
    { id: "phone", accessorKey: "telefono", header: "Teléfono" },
    { id: "email", accessorKey: "mail", header: "Correo" },
    {
      id: "metadata",
      accessorFn: (row) =>
        `${row.identifier} ${row.rut} ${row.name} ${row.email} ${row.phone}`,
      header: "Metadata",
    },
  ];

  const handleRowClick = (row: any) => {
    router.push(`/clients/${row.id}`);
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
        <div className="w-full justify-center items-center space-y-5">
          <div className="justify-between flex items-center w-full space-x-3">
            <SearchBar value={searchValue} onChange={handleSearch} />
            <div className="px-4 py-2 rounded border">Filtros</div>
          </div>
          <Table
            isLoading={isLoading}
            columns={columns}
            data={data}
            rowsCount={data.length}
            rowsPerPage={10}
            searchValue={searchDebouncedValue}
            filters={filters}
            handlePageChange={handlePageChange}
            handleRowClick={handleRowClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Clients;
