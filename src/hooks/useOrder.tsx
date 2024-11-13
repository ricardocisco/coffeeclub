"use client";

import { Order, OrderItem } from "@/core/model/Order";
import { useEffect, useState } from "react";

export default function useOrder() {
  const [order, setOrder] = useState<Order[]>([]);

  const fetchOrder = async () => {
    try {
      const response = await fetch("/api/services/orders", {
        method: "GET",
      });
      const data: Order[] = await response.json();
      setOrder(data);
    } catch (err) {
      console.log(err);
    }
  };

  const createOrder = async (data: Order) => {
    try {
      const response = await fetch("/api/services/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataResponse = await response.json();
      return dataResponse;
    } catch (err) {
      console.log(err);
    } finally {
      fetchOrder();
    }
  };

  const fetchById = async (id: string) => {
    try {
      const response = await fetch(`/api/services/orders/${id}`, {
        method: "GET",
      });
      const data: OrderItem[] = await response.json();
      console.log(" Api interna", data);
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return { order, fetchOrder, createOrder, fetchById };
}
