import UpdateCoursePage from "@/modules/hokage/pages/UpdateCourse";
import { getHokageCourseDetails } from "@/modules/hokage/services";
import { notFound } from "next/navigation";
import React from "react";

const HokageCourseUpdate = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
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
    categoryId,
    ...course_info
  } = result.data;

  const contents = course_data?.reduce((data: any, video) => {
    if (data[video.video_section]) {
      const { video_section, ...rest } = video;
      data[video.video_section].videos.push(rest);
      return data;
    }

    const { video_section, ...rest } = video;
    data[video.video_section] = { video_section, videos: [rest] };

    return data;
  }, {});
  const data = Object.values(contents);


  return (
    <>
      <UpdateCoursePage
        course_info={{
          ...course_info,
          discount: discount as number,
          categoryId: categoryId as string,
        }}
        course_options={{ benefits, prerequisites }}
        id={courseId}
        course_content={{ contents: (data as any) ?? [] }}
      />
    </>
  );
};

export default HokageCourseUpdate;
