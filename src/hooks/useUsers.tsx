"use client";
import { User } from "@/core/model/User";
import { useEffect, useState } from "react";

interface ApiError {
  message: string;
  status: number;
}

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/services/user", {
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
      setUsers(data);
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/services/user/${id}`, {
        method: "DELETE",
      });
      console.log(response);
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message);
    } finally {
      fetchUsers();
      setLoading(false);
    }
  };

  const fetchUserById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/services/user/${id}`, {
        method: "GET",
      });
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: string, data: Partial<User>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/services/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message);
    } finally {
      fetchUsers();
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    deleteUser,
    updateUser,
    loading,
    error,
    fetchUserById,
    userDetails,
  };
}
