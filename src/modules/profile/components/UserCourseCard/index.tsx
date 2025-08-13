import React from "react";
import { BookOpen } from "lucide-react";
import { calculatePriceAfterDiscount } from "@/utils";
import LinkButton from "@/components/ui/buttons/LinkButton";
import NextImage from "@/components/ui/common/NextImage";
import RenderStars from "@/modules/course/components/RatingStars";
import CourseLevel from "@/modules/course/components/CourseLevel";
import Link from "next/link";

interface CourseCardProps {
  title: string;
  lectures: number;
  level: "Beginner" | "Intermediate" | "Advance";
  price: number;
  discount?: number;
  imageUrl: string;
  slug: string;
  reviews: { rating: number }[];
}

const UserCourseCard: React.FC<CourseCardProps> = ({
  title,
  reviews,
  lectures,
  level,
  slug,
  imageUrl,
}) => {
  const totalRatings = reviews.length;
  const avgRating =
    reviews.reduce((sum, rat) => sum + rat.rating, 0) / totalRatings;

  return (
    <div className="group w-full relative bg-[#242424] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-800 hover:border-[#FFDE00]/30 max-w-sm mx-auto">
      {/* Course Image */}
      <div className="relative overflow-hidden">
        <NextImage
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Level Badge */}
        <CourseLevel level={level} />
        <Link href={`/course/my-courses/${slug}`} className="pt-3">
          <h3 className="text-white text-lg font-semibold leading-tight line-clamp-2 group-hover:text-[#FFDE00] transition-colors duration-200">
            {title}
          </h3>
        </Link>

        {/* Instructor */}
        <p className="text-[#797979] text-sm">by Monkey D. Luffy</p>

        {/* Rating and Lectures */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RenderStars rating={Math.trunc(avgRating)} />
            <span className="text-[#797979] text-sm">({totalRatings})</span>
          </div>

          <div className="flex items-center gap-1 text-[#797979] text-sm">
            <BookOpen className="w-4 h-4" />
            <span>{lectures} lectures</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCourseCard;
