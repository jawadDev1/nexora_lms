import React from "react";
import { getUserCourses } from "../../services";
import CourseCard from "@/modules/course/components/CourseCard";
import UserCourseCard from "../../components/UserCourseCard";

const UserCoursesPage = async () => {
  const result = await getUserCourses("");

  if (!result.success) return;

  const courses = result.data;

  return (
    <div className="bg-dark-brown rounded-xl  ">
      <div className="max-w-[1200px] mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses &&
            courses.length > 0 &&
            courses.map((course: any) => (
              <UserCourseCard
                key={course.slug}
                {...{
                  title: course.title,
                  slug: course.slug,
                  discount: course.discount ?? 0,
                  price: course.price,
                  imageUrl: course.thumbnail,
                  level: course.level,
                  lectures: course._count.course_data,
                  reviews: course.reviews,
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserCoursesPage;
