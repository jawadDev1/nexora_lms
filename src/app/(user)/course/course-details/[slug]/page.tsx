import CourseDetailPage from "@/modules/course/pages/CourseDetailPage";
import { getCourseDetails } from "@/modules/course/services";
import { notFound } from "next/navigation";
import React from "react";

const CourseDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const result = await getCourseDetails({ slug: decodeURIComponent(slug) });

  if (!result.success || !result.data) {
    return notFound();
  }

  const { discount, ratings, purchased, isEnrolled, ...course } = result.data;
  return (
    <>
      <CourseDetailPage
        course={{
          ...course,
          discount: discount as number,
          ratings: ratings as number,
          purchased: purchased as number,
        }}
        isEnrolled={isEnrolled}
      />
    </>
  );
};

export default CourseDetail;
