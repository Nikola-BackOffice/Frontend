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
import { FoldHorizontal, UnfoldHorizontal } from 'lucide-react';

import { Table as BaseTable } from '@/components/ui/table';
import { TableHeaders } from './Table/TableHeaders';
import { TableBody } from './Table/TableBody';
import ColumnSelector from './Table/ColumnSelector';
import { SearchBar } from './Table/SearchBar';
import Filter from './Table/Filter';
import { cn } from '@/utils/cn';
import { Button } from './ui/button';

interface ITableProps<TData, TValue> {
  title?: string;
  isLoading: boolean;
  columns: ColumnDef<TData, TValue>[];
  initialVisibility?: VisibilityState;
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
  title,
  isLoading,
  columns,
  initialVisibility = {},
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
  const [expand, setExpand] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [resetPageCount, setResetPageCount] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialVisibility);

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

  console.log(window.innerWidth);

  return (
    <div className={cn(containerClassName, !expand && 'max-w-7xl')}>
      {title && <div className="mb-8 text-4xl font-medium">{title}</div>}
      <div className="flex flex-wrap items-center justify-end gap-2 md:flex-nowrap md:justify-between">
        <SearchBar value={searchValue} onChange={handleSearch} />
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setExpand(!expand)}
            className="hidden min-[1500px]:block"
          >
            {expand ? <FoldHorizontal /> : <UnfoldHorizontal />}
          </Button>
          <ColumnSelector table={table} />
          <Filter table={table} />
        </div>
      </div>

      <div
        className={cn(
          'h-[calc(90vh-200px)] min-h-96 overflow-auto rounded-md border',
          tableClassName
        )}
      >
        <BaseTable className="relative w-full">
          <TableHeaders table={table} className="sticky top-0" />
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
