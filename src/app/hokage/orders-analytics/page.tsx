import CourseAnalyticsPage from "@/modules/hokage/pages/CourseAnalyticsPage";
import OrdersAnalyticsPage from "@/modules/hokage/pages/OrdersAnalyticsPage";
import { getCourseAnalytics } from "@/modules/hokage/services";
import React from "react";

const CourseAnalytics = async () => {
  const result = await getCourseAnalytics("");

  return <OrdersAnalyticsPage data={result?.data ?? []} />;
};

export default CourseAnalytics;
