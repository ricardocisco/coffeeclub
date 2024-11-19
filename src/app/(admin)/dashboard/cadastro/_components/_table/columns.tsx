import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Coffee } from "@/core/model/User";
import { toast } from "@/hooks/use-toast";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";

export const columns = (
  deleteCoffees: (id: string) => void
): ColumnDef<Coffee>[] => [
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
  {
    accessorKey: "imageUrl",
    header: "Imagem",
    cell: ({ row }) => (
      <picture>
        <img
          className="w-[50px] h-[50px] rounded-sm"
          src={row.original.imageUrl}
          alt={row.original.name}
        />
      </picture>
    ),
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "price",
    header: "Preco",
    cell: ({ row }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(row.original.price),
  },
  {
    accessorKey: "stock",
    header: "Quantidade",
  },
  {
    id: "delete",
    cell: ({ row }) => (
      <Button
        variant={"ghost"}
        size={"sm"}
        onClick={() => {
          console.log(row.original.id);
          try {
            deleteCoffees(row.original.id);
            toast({
              title: "Sucesso",
              description: "Café deletado com sucesso",
              variant: "default",
            });
          } catch (error) {
            console.error(error);
            toast({
              title: "Erro",
              description: "Erro ao deletar o cafe",
              variant: "destructive",
            });
          }
        }}
      >
        <Trash className="text-red-600 h-4 w-4" />
      </Button>
    ),
  },
];
