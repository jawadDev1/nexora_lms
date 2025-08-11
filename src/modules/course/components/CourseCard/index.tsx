import React from "react";
import { Star, BookOpen, Signal } from "lucide-react";
import { calculatePriceAfterDiscount } from "@/utils";
import RenderStars from "../RatingStars";
import LinkButton from "@/components/ui/buttons/LinkButton";
import CourseLevel from "../CourseLevel";
import NextImage from "@/components/ui/common/NextImage";

interface CourseCardProps {
  title: string;
  rating: number;
  totalRatings?: number;
  lectures: number;
  level: "Beginner" | "Intermediate" | "Advance";
  price: number;
  discount?: number;
  imageUrl: string;
  slug: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  rating,
  totalRatings = 0,
  lectures,
  level,
  price,
  discount,
  slug,
  imageUrl,
}) => {
  const discountedPrice = discount
    ? calculatePriceAfterDiscount(price, discount)
    : price;

  return (
    <div className="group w-full relative bg-[#242424] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-800 hover:border-[#FFDE00]/30 max-w-sm mx-auto">
      {/* Course Image */}
      <div className="relative overflow-hidden">
        <NextImage
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {discount ? (
          <div className="absolute top-3 right-3 bg-[#FF0000] text-white px-2 py-1 rounded-lg text-sm font-semibold">
            -{discount}%
          </div>
        ) : (
          ""
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Level Badge */}
        <CourseLevel level={level} />

        <h3 className="text-white text-lg font-semibold leading-tight line-clamp-2 group-hover:text-[#FFDE00] transition-colors duration-200">
          {title}
        </h3>

        {/* Instructor */}
        <p className="text-[#797979] text-sm">by Monkey D. Luffy</p>

        {/* Rating and Lectures */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RenderStars rating={rating} />
            {rating && (
              <span className="text-[#797979] text-sm">
                {rating.toFixed(1)} ({totalRatings})
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[#797979] text-sm">
            <BookOpen className="w-4 h-4" />
            <span>{lectures} lectures</span>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-700">
          <div className="flex items-baseline gap-2">
            <span className="text-[#FFDE00] text-xl font-bold">
              ${discountedPrice.toFixed(2)}
            </span>
            {discount ? (
              <span className="text-[#797979] text-sm line-through">
                ${price.toFixed(2)}
              </span>
            ) : (
              ""
            )}
          </div>

          <LinkButton
            href={`/course/${slug}`}
            className="bg-[#FFDE00] hover:bg-[#FFDE00]/90 text-black px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FFDE00]/50"
          >
            Enroll Now
          </LinkButton>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
