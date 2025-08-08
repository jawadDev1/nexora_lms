import UpdateCoursePage from "@/modules/hokage/pages/UpdateCourse";
import { getHokageCourseDetails } from "@/modules/hokage/services";
import { notFound } from "next/navigation";
import React from "react";

const HokageCourseUpdate = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const result = await getHokageCourseDetails({ courseId: id });

  if (!result.success || !result.data) {
    return notFound();
  }

  const {
    id: courseId,
    benefits,
    prerequisites,
    course_data,
    discount,
    ...course_info
  } = result.data;

  return (
    <>
      <UpdateCoursePage
        course_info={{ ...course_info, discount: discount as number }}
        course_options={{ benefits, prerequisites }}
        id={courseId}
        course_content={{ contents: course_data ?? [] }}
      />
    </>
  );
};

export default HokageCourseUpdate;
