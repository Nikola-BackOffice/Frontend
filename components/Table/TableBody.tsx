import { Cell, Table as ITable, flexRender } from '@tanstack/react-table';

import { TableBody as BaseTableBody, TableCell, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

interface ITableBodyProps {
  isLoading: boolean;
  table: ITable<any>;
  columns: any;
  handleCellClick: any;
  className?: string;
}
export const TableBody = ({
  isLoading,
  table,
  columns,
  handleCellClick,
  className,
}: ITableBodyProps) => {
  return (
    <BaseTableBody className={className}>
      {isLoading ? (
        [...Array(table.getState().pagination.pageSize)].map((_, i) => (
          <TableRow key={i} className="h-12">
            <TableCell colSpan={columns.length}>
              <Skeleton className="h-full w-full rounded-[5px]" />
            </TableCell>
          </TableRow>
        ))
      ) : table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            className="h-12"
            data-state={row.getIsSelected() && 'selected'}
            // onClick={() => handleRowClick(row.original)}
          >
            {row.getVisibleCells().map((cell: Cell<any, unknown>) => (
              <TableCell
                key={cell.id}
                className="text-center"
                onClick={() => handleCellClick(cell)}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow className="h-24">
          <TableCell colSpan={columns.length} className="h-full w-full text-center">
            Sin resultados.
          </TableCell>
        </TableRow>
      )}
    </BaseTableBody>
  );
};
