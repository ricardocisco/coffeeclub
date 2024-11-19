"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Order, OrderItem } from "@/core/model/Order";
import { Status } from "@prisma/client";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import {
  Clock,
  InfoIcon,
  PackageCheck,
  SquarePen,
  Truck,
  X,
} from "lucide-react";

const StatusIcons = {
  PENDENTE: <Clock className="w-4 h-4 text-orange-600" />,
  ENVIADO: <Truck className="w-4 h-4 text-blue-600" />,
  ENTREGUE: <PackageCheck className="w-4 h-4 text-green-600" />,
  CANCELADO: <X className="w-4 h-4 text-red-600" />,
};

// Função para renderizar o ícone de status
function getStatusIcon(status: Status) {
  return StatusIcons[status] || null;
}

export const columns = (
  updateOrderId: (id: string, status: string) => void
): ColumnDef<Order>[] => [
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
    accessorKey: "userId",
    header: "GUID",
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "total",
    header: "Preço",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"));
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as Status;
      return (
        <div className="flex items-center gap-2">
          <p>{getStatusIcon(status)}</p>
          <p>{status}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "details",
    header: "Detalhes",
    cell: ({ row }) => {
      const details = row.original.items as OrderItem[];
      return (
        <HoverCard>
          <HoverCardTrigger>
            <InfoIcon className="cursor-pointer" />
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex flex-col">
              {details?.map((detail) => (
                <p key={detail.coffee?.id}>{detail.coffee?.name}</p>
              ))}
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Data <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    id: "update",
    cell: ({ row }) => {
      const id = row.original.id!;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <SquarePen />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Alterar status</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                if (id) {
                  updateOrderId(id, "CANCELADO");
                } else {
                  console.log("ID do pedido não encontrado!");
                }
              }}
            >
              <X className="w-4 h-4 text-red-600" /> Cancelado
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                if (id) {
                  updateOrderId(id, "ENVIADO");
                } else {
                  console.log("ID do pedido não encontrado!");
                }
              }}
            >
              <Truck className="w-4 h-4 text-blue-600" /> Enviado
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                if (id) {
                  updateOrderId(id, "ENTREGUE");
                } else {
                  console.log("ID do pedido não encontrado!");
                }
              }}
            >
              <PackageCheck className="w-4 h-4 text-green-600" /> Entregue
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
