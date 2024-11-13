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

export default function InfoData() {
  const { order } = useOrder();

  const totalRevenue = order.reduce((acc, item) => acc + item.total, 0);
  const totalOrders = order.length;
  const totalUsers = order.map((item) => item.user.id).length;
  const totalCoffees = order.reduce((acc, item) => acc + item.items.length, 0);

  const chartData = order.map((item) => ({
    month: new Date(item.createdAt).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }),
    pedidos: item.items.length,
    usuarios: order.map((item) => item.user.id).length,
  }));

  return (
    <main className="flex flex-col gap-4 py-4">
      <div className="flex flex-col md:flex-row gap-4">
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
        <InfoCard label="Usuarios" icon={<UsersRound />} data={totalUsers} />
        <InfoCard
          label="Total de Cafés Vendidos"
          icon={<Coffee />}
          data={totalCoffees}
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-4 ">
        <Chart chartData={chartData} />
        <Card>
          <CardHeader>
            <CardTitle>Ultimas vendas</CardTitle>
            <CardDescription>
              você fez {order.length} ultilmas vendas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {order.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center px-2 w-[400px] transition-colors hover:bg-muted/50 rounded-md"
              >
                <div>
                  <Label className="text-lg">{item.user.name}</Label>
                  <p className="text-gray-400">{item.user.email}</p>
                </div>
                <Label className="text-lg">R$ {item.total}</Label>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
