'use client';

import { useEffect, useState } from 'react';
import { Cell, ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';

import useDebounce from '@/hooks/useDebounce';
import { getProjects } from '@/api/getProjects';
import { TableScroll } from '@/components/TableScroll';
import { ActionButton } from '@/components/Table/ActionButton';
import { getInitialColumnVisibility } from '@/utils/table';
import { initialVisibleProjectIds } from '@/const';
import { Project } from '@/types/Projects';

const Projects = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const router = useRouter();
  const searchDebouncedValue = useDebounce(searchValue);

  const columns: ColumnDef<Project>[] = [
    { id: 'identifier', accessorKey: 'id', header: 'ID'},
    {
      id: 'key',
      accessorKey: 'key',
      header: 'Proyecto',
    },
    { id: 'titulo', accessorKey: 'titulo', header: 'Título' },
    { id: 'comuna_sector', accessorKey: 'comuna_sector', header: 'Comuna/Sector' },
    { id: 'direccion', accessorKey: 'direccion', header: 'Dirección' },
    { id: 'client_name', accessorKey: 'client_name', header: 'Cliente' },
    {
      id: 'num_cliente_distribuidora',
      accessorKey: 'num_cliente_distribuidora',
      header: 'Nº Cliente',
    },
    { id: 'vendedor_name', accessorKey: 'vendedor_name', header: 'Vendedor' },
    { id: 'ingeniero_name', accessorKey: 'ingeniero_name', header: 'Ingeniero' },
    {
      id: 'facturacion_naturaleza',
      accessorKey: 'facturacion_naturaleza',
      header: 'Facturacion Naturaleza',
    },
    { id: 'empresa_titular', accessorKey: 'empresa_titular', header: 'Empresa Titular' },
    { id: 'centro_costo', accessorKey: 'centro_costo', header: 'Centro Costo' },
    {
      id: 'fecha_firma_contrato',
      accessorKey: 'fecha_firma_contrato',
      header: 'Fecha Firma Contrato',
    },
    { id: 'financiamiento', accessorKey: 'financiamiento', header: 'Financiamiento' },
    { id: 'precio_venta_neto', accessorKey: 'precio_venta_neto', header: 'Precio Venta Neto' },
    { id: 'coordenadas', accessorKey: 'coordenadas', header: 'Coordenadas' },
    { id: 'distribuidora', accessorKey: 'distribuidora', header: 'Distribuidora' },
    { id: 'opcion_tarifa', accessorKey: 'opcion_tarifa', header: 'Opción Tarifa' },
    { id: 'rut_cdv', accessorKey: 'rut_cdv', header: 'Rut CDV' },
    { id: 'titular_cdv', accessorKey: 'titular_cdv', header: 'Titular CDV' },
    { id: 'numero_medidor', accessorKey: 'numero_medidor', header: 'Nº Medidor' },
    { id: 'fecha_inicio_obra', accessorKey: 'fecha_inicio_obra', header: 'Fecha Inicio Obra' },
    { id: 'fecha_termino_obra', accessorKey: 'fecha_termino_obra', header: 'Fecha Termino Obra' },
    { id: 'estado_proyecto', accessorKey: 'estado_proyecto', header: 'Estado Proyecto' },
    {
      id: 'actions',
      enableHiding: false,
      enableSorting: false,
      cell: ActionButton,
    },
    {
      id: 'metadata',
      accessorFn: (row) =>
        `${row.titulo} ${row.direccion} ${row.comuna_sector} ${row.estado_proyecto} `,
      header: 'Metadata',
      enableSorting: false,
    },
  ];

  const initialVisibility = getInitialColumnVisibility(columns, initialVisibleProjectIds);

  const handleCellClick = (cell: Cell<any, unknown>) => {
    if (cell.column.id === 'select') {
      cell.row.toggleSelected();
    } else if (cell.column.id === 'titulo') {
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

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center md:p-10 py-4 px-2">
      <TableScroll
        title="Proyectos"
        searchValue={searchValue}
        isLoading={isLoading}
        columns={columns}
        initialVisibility={initialVisibility}
        data={data}
        debounceSearchValue={searchDebouncedValue}
        handleCellClick={handleCellClick}
        handleSearch={handleSearch}
        containerClassName="w-full justify-center items-center space-y-5"
      />
    </div>
  );
};

export default Projects;
