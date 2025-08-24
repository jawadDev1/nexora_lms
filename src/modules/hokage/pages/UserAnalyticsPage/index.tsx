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
import { UserGrowthChart } from "../../components/dashboard/UserGrowthChart";

interface UserAnalyticsPageProps {
  data: { month: string; users: number }[];
}

const UserAnalyticsPage = ({ data }: UserAnalyticsPageProps) => {
  return (
    <div className="bg-card rounded-xl py-6 px-5  ">
      <SectionTitle>User Analytics</SectionTitle>
      <div className="w-full h-[70vh] flex items-center justify-center">
        <UserGrowthChart data={data} />
      </div>
    </div>
  );
};

export default UserAnalyticsPage;
