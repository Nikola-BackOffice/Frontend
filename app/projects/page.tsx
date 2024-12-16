"use client";

import { useEffect, useState } from "react";
import { Cell, ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import { getProjects } from "@/api/getProjects";
import { TableScroll } from "@/components/TableScroll";
import useDebounce from "@/hooks/useDebounce";
import { Checkbox } from "@/components/ui/checkbox";
import { Project } from "@/types/Projects";

const Projects = () => {
  const router = useRouter();

  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const searchDebouncedValue = useDebounce(searchValue);

  const columns: ColumnDef<Project>[] = [
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
      id: "key",
      accessorKey: "key",
      header: "Projecto",
      enableHiding: false,
    },
    { id: "titulo", accessorKey: "titulo", header: "Titulo" },
    { id: "num_cliente_distribuidora", accessorKey: "num_cliente_distribuidora", header: "Cliente"
    },
    { id: "comuna_sector", accessorKey: "comuna_sector", header: "Comuna/Sector" },
    { id: "direccion", accessorKey: "direccion", header: "Direccion" },
    { id: "facturacion_naturaleza", accessorKey: "facturacion_naturaleza", header: "Facturacion Naturaleza" },
    { id: "empresa_titular", accessorKey: "empresa_titular", header: "Empresa Titular" },
    { id: "centro_costo", accessorKey: "centro_costo", header: "Centro Costo" },
    { id: "fecha_firma_contrato", accessorKey: "fecha_firma_contrato", header: "Fecha Firma Contrato" },
    { id: "financiamiento", accessorKey: "financiamiento", header: "Financiamiento" },
    { id: "precio_venta_neto", accessorKey: "precio_venta_neto", header: "Precio Venta Neto" },
    { id: "coordenadas", accessorKey: "coordenadas", header: "Coordenadas" },
    { id: "distribuidora", accessorKey: "distribuidora", header: "Distribuidora" },
    { id: "opcion_tarifa", accessorKey: "opcion_tarifa", header: "Opcion Tarifa" },
    { id: "rut_cdv", accessorKey: "rut_cdv", header: "Rut CDV" },
    { id: "titular_cdv", accessorKey: "titular_cdv", header: "Titular CDV" },
    { id: "numero_medidor", accessorKey: "numero_medidor", header: "Numero Medidor" },
    { id: "fecha_inicio_obra", accessorKey: "fecha_inicio_obra", header: "Fecha Inicio Obra" },
    { id: "fecha_termino_obra", accessorKey: "fecha_termino_obra", header: "Fecha Termino Obra" },
    { id: "estado_proyecto", accessorKey: "estado_proyecto", header: "Estado Proyecto" },
    { id: "client_id", accessorKey: "client_id", header: "Client ID" },
    { id: "vendedor_id", accessorKey: "vendedor_id", header: "Vendedor ID" },
    { id: "ingeniero_id", accessorKey: "ingeniero_id", header: "Ingeniero ID" },

    {
      id: "metadata",
      accessorFn: (row) =>
        `${row.id} ${row.client_id} ${row.vendedor_id} ${row.ingeniero_id} ${row.titulo} ${row.direccion} ${row.comuna_sector} ${row.facturacion_naturaleza} ${row.estado_proyecto} `,
      header: "Metadata",
    },
  ];

  const handleCellClick = (cell: Cell<any, unknown>) => {
    console.log(cell);
    if (cell.column.id === "select") {
      cell.row.toggleSelected();
    } else {
      router.push(`/projects/${cell.row.original.id}`);
    }
  };
  const handleSearch = (value: string) => setSearchValue(value);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);

      const projects = await getProjects();
      setData(projects);

      setIsLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col h-full w-full items-center justify-center p-10">
      <div className="w-full max-w-6xl">
        <div className="text-4xl font-medium my-8">Clientes</div>
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

export default Projects;
