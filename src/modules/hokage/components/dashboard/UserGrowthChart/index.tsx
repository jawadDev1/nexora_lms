"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface UserGrowthChartProps {
  data: Array<{ month: string; users: number }>;
}

export function UserGrowthChart({ data }: UserGrowthChartProps) {
  return (
    <>
      <ResponsiveContainer width={"100%"} height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#374151" strokeDasharray={"3 3"} />
          <XAxis dataKey={"month"} stroke="#9CA3AF" fontSize={12} />
          <YAxis stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{
              background: "#1F2937",
              borderRadius: "6px",
              color: "#F9FAFB",
            }}
          />
          <Line
            type={"monotone"}
            dataKey={"users"}
            stroke="#FFDE00"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
