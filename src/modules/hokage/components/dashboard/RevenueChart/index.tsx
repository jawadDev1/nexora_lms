"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RevenueChartProps {
  data: Array<{ month: string; revenue: number }>;
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <>
      {/* <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
          <YAxis
            stroke="#9CA3AF"
            fontSize={12}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#F9FAFB",
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#FFDE00"
            strokeWidth={2}
            fillOpacity={1}
            fill="#FFDE00"
          />
        </AreaChart>
      </ResponsiveContainer> */}
      <ResponsiveContainer width={"100%"} height={300}>
        <AreaChart data={data}>
          <CartesianGrid stroke="#374151" strokeDasharray={"3 3"} />
          <XAxis dataKey={"month"} stroke="#9CA3AF" fontSize={12} />
          <YAxis
            stroke="#9CA3AF"
            fontSize={12}
            tickFormatter={(val) => `$${val}`}
          />
          <Tooltip
            contentStyle={{
              background: "#1F2937",
              color: "#F9FAFB",
              borderRadius: "6px",
            }}
          />
          <Area
            dataKey={"revenue"}
            strokeWidth={3}
            type={"monotone"}
            stroke="#FFDE00"
            fill="#FFDE00"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}
