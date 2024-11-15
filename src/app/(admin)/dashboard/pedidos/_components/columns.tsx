"use client";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Order, OrderItem } from "@/core/model/Order";
import { Status } from "@prisma/client";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Clock, InfoIcon, PackageCheck, Truck, X } from "lucide-react";

const StatusIcons = {
  PENDENTE: <Clock className="w-4 h-4 text-orange-600" />,
  ENVIADO: <Truck className="w-4 h-4 text-green-600" />,
  ENTREGUE: <PackageCheck className="w-4 h-4 text-blue-600" />,
  CANCELADO: <X className="w-4 h-4 text-red-600" />,
};

// Função para renderizar o ícone de status
function getStatusIcon(status: Status) {
  return StatusIcons[status] || null;
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
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
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Status;
      return <div>{getStatusIcon(status)}</div>;
    },
  },
  {
    accessorKey: "details",
    header: "Detalhes",
    cell: ({ row }) => {
      const details = row.original.items as OrderItem[]; // Assumindo que `items` contém os detalhes
      return (
        <HoverCard>
          <HoverCardTrigger>
            <InfoIcon className="cursor-pointer" />
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex flex-col">
              {details?.map((detail) => (
                <p key={detail.coffee.id}>{detail.coffee.name}</p>
              ))}
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
];
