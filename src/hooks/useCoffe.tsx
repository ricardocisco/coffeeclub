"use client";

import { Coffee } from "@/core/model/User";
import { useEffect, useState } from "react";

interface ApiError {
  message: string;
  status: number;
}

export default function useCoffes() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCoffees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/services/coffee", {
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

      const data = await response.json();
      setCoffees(data);
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCoffees = async (id: string) => {
    try {
      const response = await fetch(`/api/services/coffee/${id}`, {
        method: "DELETE",
      });
      console.log(response);
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message);
    } finally {
      fetchCoffees();
    }
  };

  const createCoffees = async (data: Partial<Coffee>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/services/coffee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Erro ao criar o anuncio");
      const dataSet = await response.json();
      setCoffees([...coffees, dataSet]);
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message);
    } finally {
      await fetchCoffees();
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoffees();
  }, []);

  return {
    coffees,
    createCoffees,
    deleteCoffees,
    error,
    loading,
  };
}
