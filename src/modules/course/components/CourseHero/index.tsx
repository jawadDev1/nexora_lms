import React from "react";
import { Star, Users, Clock, Award } from "lucide-react";
import { ICourseLevel, ICourse } from "../../types";
import VideoPlayer from "../VideoPlayer";
import { calculatePriceAfterDiscount } from "@/utils";
import CourseEnroll from "../CourseEnroll";

interface CourseHeroProps {
  course: ICourse;
  isEnrolled: boolean;
}

const CourseHero = ({ course, isEnrolled }: CourseHeroProps) => {
  const discountedPrice = course.discount
    ? calculatePriceAfterDiscount(course.price, course.discount)
    : course.price;

  const totalDuration = course.course_data.reduce(
    (sum, section) => sum + (section.video_length || 0),
    0
  );

  const totalSections = course.course_data.length;

  const getLevelColor = (level: ICourseLevel) => {
    switch (level) {
      case "Beginner":
        return "text-green-500";
      case "Intermediate":
        return "text-primary";
      case "Advance":
        return "text-tomato-red";
      default:
        return "text-light-gray";
    }
  };

  return (
    <>
      <div className="bg-dark-brown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-[60%,40%] gap-8">
            <div className=" space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {course.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center space-x-2 text-light-gray">
                  <Users className="w-4 h-4" />
                  <span>{course.purchased || 0} students</span>
                </div>

                <div className="flex items-center space-x-2 text-light-gray">
                  <Clock className="w-4 h-4" />
                  <span>
                    {Math.round(totalDuration / 60)}h {totalDuration % 60}m
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-light-gray" />
                  <span
                    className={`font-semibold ${getLevelColor(course.level)}`}
                  >
                    {course.level}
                  </span>
                </div>

                <div className="text-light-gray">{totalSections} sections</div>
              </div>
              <p className="text-light-gray text-lg leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Course Card */}
            <div>
              <div className="bg-card rounded-lg py-6 px-2 sticky top-8">
                <div className="relative mb-6">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <VideoPlayer videoUrl={course.course_data[0].video_url} />
                  </div>
                </div>

                <div className="max-w-[400px] mx-auto">
                  <div className="mb-6 ">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl font-bold text-white">
                        ${discountedPrice.toFixed(2)}
                      </span>
                      {course.discount && course.discount > 0 && (
                        <>
                          <span className="text-light-gray line-through text-lg">
                            ${course.price.toFixed(2)}
                          </span>
                          <span className="bg-tomato-red text-white px-2 py-1 rounded text-sm font-semibold">
                            {course.discount}% OFF
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <CourseEnroll
                    amount={discountedPrice}
                    courseId={course.id as string}
                    isEnrolled={isEnrolled}
                    slug={course.slug}
                  />

                  {/* Course Includes */}
                  <div className="mt-6 space-y-3">
                    <h3 className="text-white font-semibold">
                      This course includes:
                    </h3>
                    <ul className="space-y-2 text-sm text-light-gray">
                      <li className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          {Math.round(totalDuration / 60)} hours on-demand video
                        </span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Award className="w-4 h-4" />
                        <span>Certificate of completion</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>Lifetime access</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseHero;
