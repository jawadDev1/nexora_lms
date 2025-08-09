"use client";
import SectionTitle from "@/components/ui/typography/SectionTitle";
import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Label,
  LabelList,
} from "recharts";

interface CourseAnalyticsPageProps {
    data: {month: string, count: number}[]
}

const CourseAnalyticsPage = ({ data }: CourseAnalyticsPageProps) => {
  const analyticsData = [
    { name: "Jun 2023", uv: 3 },
    { name: "July 2023", uv: 7 },
    { name: "August 2023", uv: 2 },
    { name: "Sept 2023", uv: 12 },
    { name: "October 2023", uv: 4 },
  ];

  console.log("data ========> ", data)

  const minVal = 0;

  return (
    <div className="bg-card rounded-xl py-6 px-5  ">
      <SectionTitle>Course Analytics</SectionTitle>
      <div className="w-full h-[70vh] flex items-center justify-center">
        <ResponsiveContainer width={"90%"} height={"50%"}>
          <BarChart width={150} height={300} data={data}>
            <XAxis dataKey={"month"}>
              <Label offset={0} position={"insideBottom"} />
            </XAxis>
            <YAxis domain={[minVal, "auto"]} />
            <Bar dataKey={"count"} width={200} fill="#FFDE00">
              <LabelList dataKey={"count"} position={"top"} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CourseAnalyticsPage;
