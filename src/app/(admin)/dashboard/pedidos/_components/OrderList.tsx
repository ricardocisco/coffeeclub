"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderItem, Status } from "@/core/model/Order";
import useOrder from "@/hooks/useOrder";
import { Clock, Info, PackageCheck, Truck, X } from "lucide-react";
import { useEffect, useState } from "react";

const StatusIcons = {
  PENDENTE: <Clock className="w-4 h-4 text-orange-600" />,
  ENVIADO: <Truck className="w-4 h-4 text-green-600" />,
  ENTREGUE: <PackageCheck className="w-4 h-4 text-blue-600" />,
  CANCELADO: <X className="w-4 h-4 text-red-600" />,
};

function getStatusIcon(status: Status): JSX.Element | null {
  return StatusIcons[status] || null;
}

export default function OrderList() {
  const { order, fetchById } = useOrder();
  const [orderDetails, setOrderDetails] = useState<{
    [key: string]: OrderItem[];
  }>({});

  const fetchOrderDetails = async (id: string) => {
    const details = await fetchById(id);
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [id]: details,
    }));
  };

  useEffect(() => {
    order.forEach((item) => {
      if (!orderDetails[item.id]) {
        fetchOrderDetails(item.id);
      }
    });
  }, [order]);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">GUID</TableHead>
            <TableHead className="w-[100px]">E-mail</TableHead>
            <TableHead className="w-[100px]">Nome</TableHead>
            <TableHead className="w-[100px]">Preço</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[100px]">Detalhes</TableHead>
            <TableHead className="w-[100px]">Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.user.id}</TableCell>
              <TableCell className="font-medium">{item.user.email}</TableCell>
              <TableCell className="font-medium">{item.user.name}</TableCell>
              <TableCell className="font-medium">
                R$ {item.total.toFixed(2)}
              </TableCell>
              <TableCell className="font-medium">
                {getStatusIcon(item.status)}
              </TableCell>
              <TableCell className="font-medium">
                <HoverCard>
                  <HoverCardTrigger>
                    <Info />
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div className="flex flex-col">
                      {orderDetails[item.id]?.map((detail) => (
                        <p key={detail.coffee.id}>{detail.coffee.name}</p>
                      ))}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </TableCell>
              <TableCell>
                {new Date(item.createdAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
