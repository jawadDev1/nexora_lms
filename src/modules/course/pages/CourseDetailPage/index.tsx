import React from "react";
import { ICourseDetailPageProps } from "../../types";
import CourseHero from "../../components/CourseHero";
import CourseCurriculum from "../../components/CourseCurriculam";
import CourseBenefitsPrerequisites from "../../components/CourseBenefits";
import CourseReviews from "../../components/CourseReviews";

const CourseDetailPage = ({
  course,
  isEnrolled,
}: ICourseDetailPageProps) => {
  return (
    <>
      <main className="min-h-screen bg-bg">
        <CourseHero course={course} isEnrolled={isEnrolled} />

        <section id="curriculum">
          <CourseCurriculum
            courseData={course.course_data}
            isEnrolled={isEnrolled}
          />
        </section>

        <section id="benefits">
          <CourseBenefitsPrerequisites
            benefits={course.benefits}
            prerequisites={course.prerequisites}
          />
        </section>

        <section id="reviews">
          <CourseReviews reviews={course.reviews} />
        </section>

        <div className="h-20 lg:hidden" />
      </main>
    </>
  );
};

export default CourseDetailPage;
