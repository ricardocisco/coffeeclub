"use client";

import { Order } from "@/core/model/Order";
import { useEffect, useState } from "react";

interface ApiError {
  message: string;
  status: number;
}

export default function useOrder() {
  const [order, setOrder] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderDetail, setOrderDetail] = useState<Order[]>([]);

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
          case 400:
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

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Erro ao criar pedido");
      }

      const dataResponse = await response.json();
      return dataResponse;
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message);
      console.error(apiError.message);
      throw error;
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

      const items = await response.json();

      setOrderDetail((prevDetails) => {
        const originalOrder = order.find((orderItem) => orderItem.id === id);
        if (!originalOrder) return prevDetails;
        const existingOrder = prevDetails.find((order) => order.id === id);
        if (existingOrder) {
          return prevDetails.map((order) =>
            order.id === id ? { ...order, items } : order
          );
        } else {
          return [
            ...prevDetails,
            {
              ...originalOrder,
              items,
            },
          ];
        }
      });
      return items;
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const deleteOrderId = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/services/orders/${id}`, {
        method: "DELETE",
      });
      console.log(response);
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderId = async (id: string, status: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/services/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro desconhecido");
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return {
    order,
    loading,
    error,
    fetchOrder,
    createOrder,
    fetchById,
    orderDetail,
    deleteOrderId,
    updateOrderId,
  };
}
