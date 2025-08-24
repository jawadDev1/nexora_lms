"use client";
import SectionTitle from "@/components/ui/typography/SectionTitle";
import React from "react";
import { CourseLevelChart } from "../../components/dashboard/CourseLevelChart";

interface CourseAnalyticsPageProps {
  data: { level: string; count: number }[];
}

const CourseAnalyticsPage = ({ data }: CourseAnalyticsPageProps) => {
  return (
    <div className="bg-card rounded-xl py-6 px-5  ">
      <SectionTitle>Course Analytics</SectionTitle>
      <div className="w-full h-[70vh] flex items-center justify-center">
        <CourseLevelChart data={data} />
      </div>
    </div>
  );
};

export default CourseAnalyticsPage;
