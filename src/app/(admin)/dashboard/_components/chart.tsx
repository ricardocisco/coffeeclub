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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

const chartConfig = {
  pedidos: {
    label: "Pedidos",
    color: "hsl(var(--chart-1))",
  },
  usuarios: {
    label: "Usuarios",
    color: "hsl(var(--chart-2))",
  },
  receita: {
    label: "Receita",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function Chart({ chartData }) {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("pedidos");

  return (
    <Card className="w-full max-w-full overflow-hidden">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-2 sm:py-2">
          <CardTitle>Grafico Interativo</CardTitle>
          <CardDescription>
            Mostrando o total de {chartConfig[activeChart].label}
          </CardDescription>
        </div>
        <div className="flex">
          {["pedidos", "usuarios", "receita"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-2 py-2 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-2 sm:py-2"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="p-2 pt-6">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={chartData.month}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey={activeChart}
              fill={`var(--color-${activeChart})`}
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
