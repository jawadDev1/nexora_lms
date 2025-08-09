"use client";
import SectionTitle from "@/components/ui/typography/SectionTitle";
import React from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface UserAnalyticsPageProps {
  data: { month: string; count: number }[];
}

const UserAnalyticsPage = ({ data }: UserAnalyticsPageProps) => {
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
      <SectionTitle>User Analytics</SectionTitle>
      <div className="w-full h-[70vh] flex items-center justify-center">
        <ResponsiveContainer width={"90%"} height={"50%"}>
          <AreaChart
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            width={150}
            height={300}
            data={data}
          >
            <XAxis dataKey={"month"} />
            <YAxis domain={[minVal, "auto"]} />
            <Tooltip />
            <Area
              type={"monotone"}
              dataKey={"count"}
              stroke="#1E1E1E"
              fill="#FFDE00"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserAnalyticsPage;
