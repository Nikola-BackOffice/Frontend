import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  ColumnSort,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  Cell,
} from '@tanstack/react-table';

import { Table as BaseTable } from '@/components/ui/table';
import { TableHeaders } from './Table/TableHeaders';
import { TableBody } from './Table/TableBody';
import ColumnSelector from './Table/ColumnSelector';
import { SearchBar } from './Table/SearchBar';
import Filter from './Table/Filter';
import { cn } from '@/utils/cn';

interface ITableProps<TData, TValue> {
  isLoading: boolean;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchValue?: string;
  debounceSearchValue?: string;
  filters?: any[];
  setOrderBy?: Dispatch<SetStateAction<ColumnSort | undefined>>;
  handleCellClick?: (cell: Cell<any, unknown>) => void;
  handleSearch: (value: string) => void;
  containerClassName?: string;
  tableClassName?: string;
}

export function TableScroll<TData, TValue>({
  isLoading,
  columns,
  data,
  searchValue = '',
  debounceSearchValue = '',
  filters,
  setOrderBy = () => {},
  handleCellClick = () => {},
  handleSearch,
  containerClassName = '',
  tableClassName = '',
}: ITableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [resetPageCount, setResetPageCount] = useState(false);

  const onColumnFilterChange = (newColumnFilters: any) => {
    setColumnFilters(newColumnFilters);
    setResetPageCount(!resetPageCount);
  };
  const onGlobalFilterChange = (newGlobalFilter: any) => {
    setGlobalFilter(newGlobalFilter);
    setResetPageCount(!resetPageCount);
  };

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: onColumnFilterChange,
    onGlobalFilterChange: onGlobalFilterChange,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
    },
  });

  useEffect(() => {
    if (setOrderBy && sorting.length > 0) setOrderBy(sorting[0]);
  }, [sorting, setOrderBy]);

  useEffect(() => {
    if (table.getColumn('metadata')?.getIsVisible())
      table.getColumn('metadata')?.toggleVisibility(false);
  }, [table]);

  useEffect(() => {
    table.setGlobalFilter(debounceSearchValue);
  }, [table, debounceSearchValue]);

  useEffect(() => {
    // TODO: convert filters to table filters
  }, [table, filters]);

  return (
    <div className={containerClassName}>
      <div className="flex flex-row items-center justify-between">
        <SearchBar value={searchValue} onChange={handleSearch} />
        <ColumnSelector table={table} />
        <Filter table={table} />
      </div>
      <div className={cn('h-[calc(90vh-200px)] overflow-auto rounded-md border', tableClassName)}>
        <BaseTable className="relative w-full">
          <TableHeaders
            table={table}
            className="sticky top-0 z-10" // Error: Styles not applied
          />
          <TableBody
            isLoading={isLoading}
            table={table}
            columns={columns}
            handleCellClick={handleCellClick}
            className="w-full"
          />
        </BaseTable>
      </div>
    </div>
  );
}
