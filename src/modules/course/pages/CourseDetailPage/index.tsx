import React from "react";
import { ICourseDetailPageProps } from "../../types";
import CourseHero from "../../components/CourseHero";
import CourseCurriculum from "../../components/CourseCurriculam";
import CourseBenefitsPrerequisites from "../../components/CourseBenefits";
import CourseReviews from "../../components/CourseReviews";

const CourseDetailPage = ({
  course,
  isEnrolled,
  userProgress = 0,
}: ICourseDetailPageProps) => {
  return (
    <>
      <main className="min-h-screen bg-bg">
        {/* Hero Section */}
        <CourseHero course={course} isEnrolled={isEnrolled} />

        {/* Course Curriculum */}
        <section id="curriculum">
          <CourseCurriculum
            courseData={course.course_data}
            isEnrolled={isEnrolled}
            userProgress={userProgress}
          />
        </section>

        {/* Benefits and Prerequisites */}
        <section id="benefits">
          <CourseBenefitsPrerequisites
            benefits={course.benefits}
            prerequisites={course.prerequisites}
          />
        </section>

        {/* Reviews */}
        <section id="reviews">
          <CourseReviews reviews={course.reviews} />
        </section>

        {/* Fixed Bottom Enrollment Bar for Mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-dark-brown border-t border-gray-700 p-4 lg:hidden z-50">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-white">
                  $
                  {course.discount
                    ? (
                        course.price -
                        (course.price * course.discount) / 100
                      ).toFixed(2)
                    : course.price.toFixed(2)}
                </span>
                {course.discount && course.discount > 0 && (
                  <span className="text-light-gray line-through text-sm">
                    ${course.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
            <button
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                isEnrolled
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-primary text-black hover:bg-yellow-400"
              }`}
            >
              {isEnrolled ? "Continue" : "Enroll Now"}
            </button>
          </div>
        </div>

        {/* Spacer for fixed bottom bar on mobile */}
        <div className="h-20 lg:hidden" />
      </main>
    </>
  );
};

export default CourseDetailPage;
