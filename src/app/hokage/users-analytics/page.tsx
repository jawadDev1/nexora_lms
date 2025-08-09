import CourseAnalyticsPage from "@/modules/hokage/pages/CourseAnalyticsPage";
import UserAnalyticsPage from "@/modules/hokage/pages/UserAnalyticsPage";
import { getCourseAnalytics } from "@/modules/hokage/services";
import { getUsersAnalytics } from "@/modules/hokage/services/users.services";
import React from "react";

const UserAnalytics = async () => {
  const result = await getUsersAnalytics("");

  return <UserAnalyticsPage data={result?.data ?? []} />;
};

export default UserAnalytics;
