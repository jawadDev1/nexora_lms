"use client";
import SectionTitle from "@/components/ui/typography/SectionTitle";
import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface OrderAnalyticsPageProps {
  data: { month: string; count: number }[];
}

const OrdersAnalyticsPage = ({ data }: OrderAnalyticsPageProps) => {
  const analyticsData = [
    { name: "Jun 2023", uv: 3 },
    { name: "July 2023", uv: 7 },
    { name: "August 2023", uv: 2 },
    { name: "Sept 2023", uv: 12 },
    { name: "October 2023", uv: 4 },
  ];

  console.log("data ========> ", data);

  const minVal = 0;

  return (
    <div className="bg-card rounded-xl py-6 px-5  ">
      <SectionTitle>Course Analytics</SectionTitle>
      <div className="w-full h-[70vh] flex items-center justify-center">
        <ResponsiveContainer width={"90%"} height={"50%"}>
          <LineChart width={150} height={300} data={data}>
            <CartesianGrid strokeDasharray={"3 3"} />
            <XAxis dataKey={"month"} />

            <YAxis domain={[minVal, "auto"]} />
            <Tooltip />
            <Legend />
            <Line type={"monotone"} dataKey={"count"} stroke="#FFDE00" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrdersAnalyticsPage;
