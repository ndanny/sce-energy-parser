"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AggregationResult } from "@/lib/types";

const chartConfig = {
  views: {
    label: "",
  },
  usage: {
    label: "Usage",
    color: "hsl(var(--chart-5))",
  },
  cost: {
    label: "Cost",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const UsageChart = ({ aggregationResult }: { aggregationResult: AggregationResult }) => {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("usage");

  const aggregatedData = aggregationResult.aggregatedData

  const chartData = Object.keys(aggregatedData)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .map(date => ({
      date,
      usage: aggregatedData[date].usage,
      cost: aggregatedData[date].cost
    }));

  const total = React.useMemo(
    () => ({
      usage: chartData.reduce((acc, curr) => acc + curr.usage, 0),
      cost: chartData.reduce((acc, curr) => acc + curr.cost, 0),
    }),
    []
  );

  return (
    <Card className="mt-5">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Energy Usage Chart</CardTitle>
          <CardDescription>
            Showing total kWH usage for {chartData[0].date} - {chartData[chartData.length - 1].date}
          </CardDescription>
        </div>
        <div className="flex">
          {["usage", "cost"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default UsageChart;
