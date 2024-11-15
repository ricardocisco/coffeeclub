"use client";

import { OrderItem } from "@/core/model/Order";
import useOrder from "@/hooks/useOrder";
import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns as generateColumns } from "./columns";

export default function OrderList() {
  const { order, fetchById, loading, error } = useOrder();
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

  const orderFilter = order.map((item) => ({
    ...item,
    id: item.user.id,
    email: item.user.email,
    name: item.user.name,
    status: item.status,
    items: orderDetails[item.id],
    date: new Date(item.createdAt).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
  }));

  const columns = generateColumns;

  return (
    <div className="flex flex-col gap-4">
      {loading ? (
        Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse flex  justify-between items-center px-2 py-3 rounded-md bg-muted/50"
          >
            <div>
              <div className="h-4 w-24 bg-muted/50 rounded mb-1"></div>
              <div className="h-3 w-32 bg-muted/50 rounded"></div>
            </div>
            <div className="h-4 w-16 bg-muted/50 rounded"></div>
          </div>
        ))
      ) : error ? (
        <div className="flex justify-center items-center h-64 text-red-600">
          Erro ao carregar os pedidos
        </div>
      ) : (
        <DataTable columns={columns} data={orderFilter} />
      )}
    </div>
  );
}
