import { Table } from "@tanstack/react-table";
import { Button } from "../ui/button";

export default function Filter({ table }: { table: Table<any> }) {
  return (
    <Button
      variant="outline"
      className="px-4 py-2 ml-4 flex rounded-md border border-input text-base shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
    >
      Filtros
    </Button>
  );
}
