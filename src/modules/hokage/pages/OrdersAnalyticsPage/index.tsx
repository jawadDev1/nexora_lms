"use client";
import SectionTitle from "@/components/ui/typography/SectionTitle";
import React from "react";
import { RevenueChart } from "../../components/dashboard/RevenueChart";

interface OrderAnalyticsPageProps {
  data: { month: string; revenue: number }[];
}

const OrdersAnalyticsPage = ({ data }: OrderAnalyticsPageProps) => {
  return (
    <div className="bg-card rounded-xl py-6 px-5  ">
      <SectionTitle>Course Analytics</SectionTitle>
      <div className="w-full h-[70vh] flex items-center justify-center">
        <RevenueChart data={data} />
      </div>
    </div>
  );
};

export default OrdersAnalyticsPage;
