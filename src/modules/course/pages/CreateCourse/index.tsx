"use client";

import React from "react";
import CourseInfoSection from "../../components/CourseInfoSection";
import CourseOptionSection from "../../components/CourseOptionSection";
import CourseContentSection from "../../components/CourseContentSection";
import CourseFormSteps from "../../components/CourseFormSteps";
import { useCourseForm } from "@/stores/course-form-store";
import CoursePreviewSection from "../../components/CoursePreviewSection";

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

const CreateCoursePage = () => {
  const { currentSection } = useCourseForm();
  const Section = SECTIONS[currentSection];

  return (
    <div className="grid grid-cols-[75%,3%,22%] relative ">
      <Section />
      <div />
      <CourseFormSteps />
    </div>
  );
};

export default CreateCoursePage;
