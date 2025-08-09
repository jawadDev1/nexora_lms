import CourseAnalyticsPage from "@/modules/hokage/pages/CourseAnalyticsPage";
import { getCourseAnalytics } from "@/modules/hokage/services";
import React from "react";

const CourseAnalytics = async () => {
  const result = await getCourseAnalytics("");

  return <CourseAnalyticsPage data={result?.data ?? []} />;
};

export default CourseAnalytics;
