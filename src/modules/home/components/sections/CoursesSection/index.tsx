import Content from "@/components/ui/typography/Content";
import SectionTitle from "@/components/ui/typography/SectionTitle";
import CourseCard from "@/modules/course/components/CourseCard";
import { getUserHomeCourses } from "@/modules/home/services";
import React from "react";

const CoursesSection = async () => {
  const result = await getUserHomeCourses();

  if (!result.success) return null;

  const courses = result.data;

  return (
    <div className="bg-dark-brown rounded-xl py-6 px-5">
      <div className="max-w-[1200px] mx-auto ">
        <h2 className="text-4xl md:text-5xl text-center font-bold text-white mb-4">
          Discover <span className="text-primary">Courses</span>
        </h2>
        <Content className="text-light-gray text-center text-lg max-w-2xl mx-auto mb-12">
          Master in-demand skills with expert-led courses designed for
          real-world success. From beginner to pro, we've got your learning
          journey covered.
        </Content>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses &&
            courses.length > 0 &&
            courses.map(
              ({
                title,
                price,
                discount,
                level,
                ratings,
                _count,
                thumbnail,
                slug,
              }) => (
                <CourseCard
                  key={slug}
                  {...{
                    title,
                    slug,
                    discount: discount ?? 0,
                    price,
                    imageUrl: thumbnail,
                    level,
                    lectures: _count.course_data,
                    rating: ratings ?? 0,
                  }}
                />
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default CoursesSection;
