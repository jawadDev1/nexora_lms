import { IHomeHeroBody } from "@/modules/hokage/types/home.types";
import { IHomeCourse, IHomeHeroReturn } from "../types";
import redis from "@/lib/redis";
import { db } from "@/lib/db";
import { asyncHandler } from "@/utils/asyncHandler";

export const getUserHomeHero = async (): IHomeHeroReturn => {
  const cachedHero: IHomeHeroBody | null = await redis.get("home_hero");

  if (cachedHero) {
    return {
      success: true,
      message: "hero updated successfully",
      data: cachedHero,
    };
  }

  const hero = await db.hero.findFirst({ omit: { id: true } });

  await redis.set("home_hero", JSON.stringify(hero));

  return {
    success: true,
    message: "hero updated successfully",
    data: hero,
  };
};


export const getUserHomeCourses = asyncHandler(async () => {
  const cached: IHomeCourse[] | null = await redis.get("home_courses");

  if (cached) {
    return {
      success: true,
      message: "courses fetched successfully",
      data: cached,
    };
  }

  const courses = await db.course.findMany({
    take: 7,
    select: {
      title: true,
      price: true,
      discount: true,
      ratings: true,
      slug: true,
      level: true,
      thumbnail: true,
      reviews: { select: { rating: true } },
      _count: { select: { course_data: true, reviews: true } },
    },

    orderBy: { created_at: "desc" },
  });

  await redis.set("home_courses", JSON.stringify(courses));

  return {
    success: true,
    message: "courses fetched successfully",
    data: courses,
  };
});

export const getHomeFaqs = asyncHandler(async () => {
  const faqs = await db.faq.findMany({
    where: { active: true },
    select: { question: true, answer: true },
  });

  return { success: true, message: "faqs fetched successfully", data: faqs };
});
