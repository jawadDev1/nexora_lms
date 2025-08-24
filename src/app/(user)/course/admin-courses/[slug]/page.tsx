import UserCourseDetailPage from "@/modules/course/pages/UserCourseDetailPage";
import { getAdminCourseDetails, getUserCourseDetails } from "@/modules/course/services";
import { notFound } from "next/navigation";
import React from "react";

const AdminCourseDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const result = await getAdminCourseDetails({ slug: decodeURIComponent(slug) });

  if (!result.success || !result.data) {
    return notFound();
  }

  const { discount, ratings, purchased, ...course } = result.data.course;

  return (
    <>
      <UserCourseDetailPage
        course={{
          ...course,
          discount: discount as number,
          ratings: ratings as number,
          purchased: purchased as number,
        }}
        isReviewd={result.data.isReviewed}
      />
    </>
  );
};

export default AdminCourseDetail;
