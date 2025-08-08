"use client";

import React, { useEffect } from "react";
import CourseInfoSection from "../../components/course/CourseInfoSection";
import CourseOptionSection from "../../components/course/CourseOptionSection";
import CourseContentSection from "../../components/course/CourseContentSection";
import CoursePreviewSection from "../../components/course/CoursePreviewSection";
import { useCourseForm } from "@/stores/course-form-store";
import CourseFormSteps from "../../components/course/CourseFormSteps";
import {
  CourseContentFormData,
  CourseInfoFormData,
  CourseOptionsFormData,
} from "@/schemas/course.schema";

const SECTIONS = {
  course_info: CourseInfoSection,
  course_options: CourseOptionSection,
  course_content: CourseContentSection,
  course_preview: CoursePreviewSection,
};

export type ICourseSection =
  | "course_info"
  | "course_content"
  | "course_options"
  | "course_preview";

interface UpdateCoursePageProps {
  course_info: CourseInfoFormData;
  course_options: CourseOptionsFormData;
  course_content: CourseContentFormData;
  id: string;
}

const UpdateCoursePage = ({
  course_content,
  course_info,
  course_options,
  id,
}: UpdateCoursePageProps) => {
  const { currentSection, handleSetUpdateCourse } = useCourseForm();
  const Section = SECTIONS[currentSection];

  useEffect(() => {
    if (id) {
      handleSetUpdateCourse({
        course_info,
        course_data: course_content,
        course_options,
        id,
      });
    }
  }, [id]);

  return (
    <div className="grid grid-cols-[75%,3%,22%] relative ">
      <Section />
      <div />
      <CourseFormSteps />
    </div>
  );
};

export default UpdateCoursePage;
