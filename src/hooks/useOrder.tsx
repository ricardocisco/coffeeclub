"use client";

import { Order, OrderItem } from "@/core/model/Order";
import { useEffect, useState } from "react";

interface ApiError {
  message: string;
  status: number;
}

export default function useOrder() {
  const [order, setOrder] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/services/orders", {
        method: "GET",
      });
      if (!response.ok) {
        let message = "Erro ao buscar o anúncio";

        switch (response.status) {
          case 404:
            message = "Solicitação inválida, Verifique os parâmetros";
          case 404:
            message = "Recurso não encontrado. Verifique o URL.";
            break;
          case 500:
            message = "Erro interno do servidor. Tente novamente mais tarde.";
            break;
          default:
            message = `Erro inesperado: ${response.status}`;
        }

        throw { message, status: response.status };
      }
      const data: Order[] = await response.json();
      setOrder(data);
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (data: Order) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/services/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Erro ao criar pedido");
      const dataResponse = await response.json();
      return dataResponse;
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/services/orders/${id}`, {
        method: "GET",
      });

      if (!response.ok) throw new Error("Erro ao buscar pedido");

      const data: OrderItem[] = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return { order, loading, error, fetchOrder, createOrder, fetchById };
}
