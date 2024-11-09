"use client";
import { User } from "@/core/model/User";
import { useEffect, useState } from "react";

export default function useUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/services/user", {
        method: "GET",
      });
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const response = await fetch(`/api/services/user/${id}`, {
        method: "DELETE",
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      fetchUsers();
    }
  };

  const updateUser = async (id: string, data: Partial<User>) => {
    try {
      const response = await fetch(`/api/services/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, deleteUser, updateUser };
}
