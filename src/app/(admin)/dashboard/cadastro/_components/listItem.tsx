"use client";

import useCoffes from "@/hooks/useCoffe";
import { DataTable } from "./_table/data-table";
import { columns as generateColumns } from "./_table/columns";

export default function ListItem() {
  const { coffees, deleteCoffees, loading, error } = useCoffes();

  const columns = generateColumns(deleteCoffees);

  return (
    <div className="flex flex-col gap-4 py-2">
      {loading ? (
        Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse flex justify-between items-center px-2 py-3 rounded-md bg-muted/50"
          >
            <div>
              <div className="h-4 w-24 bg-muted/50 rounded mb-1"></div>
              <div className="h-3 w-32 bg-muted/50 rounded"></div>
            </div>
            <div className="h-4 w-16 bg-muted/50 rounded"></div>
          </div>
        ))
      ) : error ? (
        <div>erro ao consultar: {error}</div>
      ) : (
        <DataTable columns={columns} data={coffees} />
      )}
    </div>
  );
}
