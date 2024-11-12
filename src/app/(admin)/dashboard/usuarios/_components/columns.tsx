import { deleteUser } from "@/backend/services/userService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/core/model/User";
import { toast } from "@/hooks/use-toast";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, TrashIcon } from "lucide-react";

export const columns = (
  handleEditUser: (user: User) => void
): ColumnDef<User>[] => [
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
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
  },
  {
    id: "edit",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div>
          <Button
            onClick={() => handleEditUser(user)}
            className="h-8 w-8 p-0"
            variant="ghost"
          >
            <EditIcon className="h-4 w-4 text-blue-600" />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="h-8 w-8 p-0" variant="ghost">
                <TrashIcon className="h-4 w-4 text-red-600" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Deletar Usuário</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja deletar esse usuário?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction>
                  <Button
                    variant={"destructive"}
                    onClick={() => {
                      try {
                        deleteUser(user.id);
                        toast({
                          title: "Sucesso",
                          description: "Usuario deletado com sucesso",
                          variant: "default",
                        });
                      } catch (error) {
                        console.log(error);
                        toast({
                          title: "Erro",
                          description: "Erro ao deletar o usuario",
                          variant: "destructive",
                        });
                      }
                    }}
                  >
                    Deletar
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
