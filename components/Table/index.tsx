import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  ColumnSort,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table as BaseTable,
} from '@/components/ui/table';
import { TableHeaders } from './TableHeaders';
import { Pagination } from './Pagination';
import { TableBody } from './TableBody';
import { cn } from '@/utils/cn';


interface ITableProps<TData, TValue> {
  isLoading: boolean;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
	rowsCount: number;
	rowsPerPage?: number;
  searchValue?: string;
  filters?: any[]
	setOrderBy?: Dispatch<SetStateAction<ColumnSort | undefined>>;
	handlePageChange: (page: number) => void;
  handleRowClick?: (row: any) => void;
  containerClassName?: string;
  tableClassName?: string;
}


export function Table<TData, TValue>({
  isLoading,
  columns,
  data,
  rowsCount,
  rowsPerPage=10,
  searchValue='',
  filters,
  handlePageChange=() => {},
  setOrderBy=() => {},
  handleRowClick=() => {},
  containerClassName='',
  tableClassName='',
}: ITableProps<TData, TValue>) {
  
  const [pageCount, setPageCount] = useState<number>(Math.ceil(rowsCount / rowsPerPage));
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [resetPageCount, setResetPageCount] = useState(false);


  const onColumnFilterChange = (newColumnFilters: any) => {
    setColumnFilters(newColumnFilters);
    setResetPageCount(!resetPageCount);
  }
  const onGlobalFilterChange = (newGlobalFilter: any) => {
    setGlobalFilter(newGlobalFilter);
    setResetPageCount(!resetPageCount)
  }


  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount,
    
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
    initialState: {
      pagination: { pageSize: rowsPerPage, }
    }
  });
 

  useEffect(() => {
    if (setOrderBy && sorting.length > 0)
      setOrderBy(sorting[0]);
  }, [sorting, setOrderBy]);

  useEffect(() => {
    if (table.getColumn("metadata")?.getIsVisible())
      table.getColumn("metadata")?.toggleVisibility(false);
  }, [table]);

  useEffect(() => {
    table.setGlobalFilter(searchValue);
  }, [table, searchValue]);

  useEffect(() => {
    // TODO: convert filters to table filters
    
  }, [table, filters]);

  useEffect(() => {

    console.log('globalFilter', globalFilter);
    console.log('columnFilters', columnFilters);
    console.log('rowsCount', rowsCount);
    console.log('rowsPerPage', rowsPerPage);
    if (!globalFilter && columnFilters.length === 0)
      setPageCount(Math.ceil(rowsCount / rowsPerPage));
    else {
      setPageCount(Math.ceil(table.getFilteredRowModel().rows.length / rowsPerPage));
    }
  }, [table, resetPageCount, rowsCount, rowsPerPage, globalFilter, columnFilters]);

  
  return (
    <div className={containerClassName}>
      <div
        className={cn(
          "rounded-md border overflow-x-scroll",
          tableClassName
        )}
      >
        <BaseTable>
          <TableHeaders table={table} />
          <TableBody
            isLoading={isLoading}
            table={table}
            columns={columns}
            handleRowClick={handleRowClick}
          />
        </BaseTable>
      </div>

      <Pagination table={table} handlePageChange={handlePageChange} />
    </div>
  );
};

