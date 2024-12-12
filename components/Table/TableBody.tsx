import { Table as ITable, flexRender } from '@tanstack/react-table';

import {
  TableBody as BaseTableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

interface ITableBodyProps {
  isLoading: boolean;
  table: ITable<any>;
  columns: any;
  handleRowClick: any;
}
export const TableBody = ({
  isLoading,
  table,
  columns,
  handleRowClick,
}: ITableBodyProps) => {
  return (
    <BaseTableBody>
      {isLoading ? (
        [...Array(table.getState().pagination.pageSize)].map((_, i) => (
          <TableRow key={i} className='h-12'>
            <TableCell colSpan={columns.length}>
              <Skeleton className='h-full w-full rounded-[5px]' />
            </TableCell>
          </TableRow>
        ))
      ) : table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            className='h-12'
            data-state={row.getIsSelected() && 'selected'}
            onClick={() => handleRowClick(row.original)}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className='text-center'>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow className='h-24'>
          <TableCell colSpan={columns.length} className='h-full w-full text-center'>
            Sin resultados.
          </TableCell>
        </TableRow>
      )}
    </BaseTableBody>
  );
};
