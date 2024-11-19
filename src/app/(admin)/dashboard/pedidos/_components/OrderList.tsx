"use client";

import { OrderItem } from "@/core/model/Order";
import useOrder from "@/hooks/useOrder";
import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns as generateColumns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrderList() {
  const { order, fetchById, loading, error, updateOrderId } = useOrder();
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
      if (item.id && !orderDetails[item.id]) {
        fetchOrderDetails(item.id);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  const orderFilter = order.map((item) => ({
    ...item,
    id: item.id,
    userId: item.user?.id,
    email: item.user?.email,
    name: item.user?.name,
    status: item.status,
    items: item.id ? orderDetails[item.id] : [],
    date: item.createdAt
      ? new Date(item.createdAt).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : null,
  }));

  const columns = generateColumns(updateOrderId);

  return (
    <div className="flex flex-col gap-4">
      {loading ? (
        Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4 w-full">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-[250px]" />
              <Skeleton className="h-6 w-[200px]" />
            </div>
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
