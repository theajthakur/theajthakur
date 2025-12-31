"use client";

import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  {
    name: "Jan",
    total: 12,
  },
  {
    name: "Feb",
    total: 24,
  },
  {
    name: "Mar",
    total: 18,
  },
  {
    name: "Apr",
    total: 35,
  },
  {
    name: "May",
    total: 28,
  },
  {
    name: "Jun",
    total: 45,
  },
  {
    name: "Jul",
    total: 32,
  },
  {
    name: "Aug",
    total: 40,
  },
  {
    name: "Sep",
    total: 38,
  },
  {
    name: "Oct",
    total: 55,
  },
  {
    name: "Nov",
    total: 48,
  },
  {
    name: "Dec",
    total: 60,
  },
];

export default function OverviewChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
            <Bar
              dataKey="total"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
