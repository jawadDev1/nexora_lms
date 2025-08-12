import React from "react";
import { getCategories, getCourses } from "@/modules/course/services";
import CourseCard from "../../components/CourseCard";
import Coursecategories from "../../components/CourseCategories";

interface CoursesPageProps {
  category?: string;
  search?: string;
}

const CoursesPage = async ({ category, search }: CoursesPageProps) => {
  const result = await getCourses({ category, search });
  const categories = await getCategories();
  const courses = result.data;

  return (
    <main className="max-w-[1200px] mx-auto py-5 md:py-20">
      <Coursecategories categories={categories.data} category={category} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses &&
          courses.length > 0 &&
          courses.map((course: any) => (
            <CourseCard
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
    </main>
  );
};

export default CoursesPage;
