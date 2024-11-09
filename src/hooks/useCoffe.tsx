"use client";

import { Coffee } from "@/core/model/User";
import { useEffect, useState } from "react";

export default function useCoffes() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);

  const fetchCoffees = async () => {
    try {
      const response = await fetch("/api/services/coffee", {
        method: "GET",
      });
      const data = await response.json();
      setCoffees(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCoffees = async (id: string) => {
    try {
      const response = await fetch(`/api/services/coffee/${id}`, {
        method: "DELETE",
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      fetchCoffees();
    }
  };

  const createCoffees = async (data: Partial<Coffee>) => {
    try {
      const response = await fetch("/api/services/coffee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataSet = await response.json();
      setCoffees([...coffees, dataSet]);
    } catch (err) {
      console.log(err);
    } finally {
      fetchCoffees();
    }
  };

  useEffect(() => {
    fetchCoffees();
  }, []);

  return {
    coffees,
    createCoffees,
    deleteCoffees,
  };
}
