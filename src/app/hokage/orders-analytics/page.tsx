import OrdersAnalyticsPage from "@/modules/hokage/pages/OrdersAnalyticsPage";
import { getOrdersAnalytics } from "@/modules/hokage/services";
import React from "react";

const CourseAnalytics = async () => {
  const result = await getOrdersAnalytics("");

  return <OrdersAnalyticsPage data={result?.data ?? []} />;
};

export default CourseAnalytics;
