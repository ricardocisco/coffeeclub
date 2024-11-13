"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  pedidos: {
    label: "Pedidos",
    color: "#2563eb",
  },
  usuarios: {
    label: "Usuarios",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function Chart({ chartData }) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          allowDataOverflow={true}
          tickFormatter={(value) =>
            new Date(value).toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            })
          }
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="pedidos" fill="var(--color-pedidos)" radius={4} />
        <Bar dataKey="usuarios" fill="var(--color-usuarios)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
