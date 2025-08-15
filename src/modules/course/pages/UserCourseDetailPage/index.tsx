"use client";
import React, { useState } from "react";
import SectionDetail from "../../components/UserCourse/SectionDetail";
import SectionsList from "../../components/UserCourse/SectionsList";
import { ICourse } from "../../types";

interface UserCourseDetailPageProps {
  course: ICourse;
  isReviewd: boolean;
}

const UserCourseDetailPage = ({
  course,
  isReviewd,
}: UserCourseDetailPageProps) => {
  const [currentSectoin, setCurrentSection] = useState<number>(0);

  const section_details = course.course_data[currentSectoin];

  const handleCurrentSection = (index: number) => {
    if (index < 0 || index >= course.course_data.length) return;
    setCurrentSection(index);
  };

  return (
    <main className="max-w-[1200px] py-7 mx-auto grid grid-cols-1 md:grid-cols-[70%,2%,28%]">
      <SectionDetail
        {...{
          title: section_details.video_title,
          description: section_details.video_description as string,
          video_url: section_details.video_url,
          video_link_title: section_details.video_link_title as string,
          vidoe_link_url: section_details.video_link_url as string,
          sectionId: section_details.id,
          currentSection: currentSectoin,
          handleCurrentSection,
        }}
      />
      <div />
      <SectionsList
        currentVideoIndex={currentSectoin}
        sections={course.course_data}
        handleActiveSection={handleCurrentSection}
        courseId={course.id as string}
        isReviewed={isReviewd}
      />
    </main>
  );
};

export default UserCourseDetailPage;
