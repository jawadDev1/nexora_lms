import CoursesPage from "@/modules/course/pages/CoursesPage";
import React from "react";

interface CoursesProps {
  searchParams: Promise<{ category?: string; search?: string }>;
}

const Courses = async ({ searchParams }: CoursesProps) => {
  const { category, search } = await searchParams;

  return (
    <>
      <CoursesPage category={category} search={search} />
    </>
  );
};

export default Courses;
