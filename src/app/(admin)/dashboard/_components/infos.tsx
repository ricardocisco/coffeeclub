"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Coffee, DollarSign, Package, UsersRound } from "lucide-react";
import { Label } from "@/components/ui/label";
import InfoCard from "./cards";
import { Chart } from "./chart";
import useOrder from "@/hooks/useOrder";
import { DatePickerWithRange } from "./date-picker";
import { useState } from "react";
import { Order } from "@/core/model/Order";
import { DateRange } from "react-day-picker";

export default function InfoData() {
  const { order }: { order: Order[] } = useOrder();
  const { loading } = useOrder();

  const totalRevenue = order.reduce((acc, item) => acc + item.total, 0);
  const totalOrders = order.length;
  const totalUsers = order.map((item) => item.user.id).length;
  const totalCoffees = order.reduce((acc, item) => acc + item.items.length, 0);

  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  const filteredData = order.filter((item) => {
    const createdAt = new Date(item.createdAt);
    const fromDate = dateRange?.from ? new Date(dateRange.from) : null;
    const toDate = dateRange?.to ? new Date(dateRange.to) : null;

    return (
      (fromDate ? createdAt >= fromDate : true) &&
      (toDate ? createdAt <= toDate : true)
    );
  });

  const chartData = filteredData.map((item) => ({
    month: new Date(item.createdAt).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }),
    pedidos: item.items.length,
    usuarios: order.map((item) => item.user.id).length,
    receita: item.total.toFixed(2),
  }));

  return (
    <main className="flex flex-col gap-4 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2 animate-pulse">
              <div className="h-6 rounded-md bg-muted/50"></div>
              <div className="h-6 rounded-md bg-muted/50"></div>
              <div className="h-6 rounded-md bg-muted/50"></div>
            </div>
          ))
        ) : (
          <>
            <InfoCard
              label="Receita Total"
              icon={<DollarSign />}
              data={`R$ ${totalRevenue.toFixed(2)}`}
            />
            <InfoCard
              label="Total de Pedidos"
              icon={<Package />}
              data={totalOrders}
            />
            <InfoCard
              label="Usuarios"
              icon={<UsersRound />}
              data={totalUsers}
            />
            <InfoCard
              label="Total de Cafés Vendidos"
              icon={<Coffee />}
              data={totalCoffees}
            />
          </>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <DatePickerWithRange
            selected={dateRange}
            onSelect={(range) => setDateRange(range as DateRange)}
          />
          <Chart chartData={chartData} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Ultimas vendas</CardTitle>
            <CardDescription>
              Suas ultilmas {order.length} vendas
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {loading
              ? // Placeholder para as últimas vendas
                Array.from({ length: 5 }).map((_, index) => (
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
              : order.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center px-2 transition-colors hover:bg-muted/50 rounded-md"
                  >
                    <div>
                      <Label className="text-lg">{item.user.name}</Label>
                      <p className="text-gray-400">{item.user.email}</p>
                    </div>
                    <Label className="text-base">R$ {item.total}</Label>
                  </div>
                ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
