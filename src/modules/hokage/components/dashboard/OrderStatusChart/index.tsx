"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface OrderStatusChartProps {
  data: Array<{ status: string; count: number }>;
}

const COLORS = {
  PAID: "#10B981",
  PENDING: "#F59E0B",
  FAILED: "#EF4444",
};

export function OrderStatusChart({ data }: OrderStatusChartProps) {
  const chartData = data.map((item) => ({
    name: item.status,
    value: item.count,
    color: COLORS[item.status as keyof typeof COLORS] || "#6B7280",
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#222",
            border: "1px solid #374151",
            borderRadius: "8px",
            color: "white",
          }}
        />
        <Legend wrapperStyle={{ color: "#F9FAFB" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
