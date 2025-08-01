import { asyncHandler, authAsyncHandler } from "@/utils/asyncHandler";
import { ICachedCourse, ICourseBody, IUpdateCourseBody } from "../types";
import { generateSlug } from "@/utils";
import { db } from "@/lib/db";
import redis from "@/lib/redis";
import { Session } from "next-auth";

export const createCourse = authAsyncHandler(
  "ADMIN",
  async (body: ICourseBody) => {
    const slug = generateSlug(body.title);

    const course = await db.course.create({
      data: { ...body, slug },
      omit: { id: true },
    });

    return {
      success: true,
      message: "course created successfull",
      data: course,
    };
  }
);

export const updateCourse = authAsyncHandler(
  "ADMIN",
  async (body: IUpdateCourseBody) => {
    const course = await db.course.update({
      where: { slug: body.slug },
      data: { ...body },
      omit: { id: true },
    });

    return {
      success: true,
      message: "course updated successfully",
      data: course,
    };
  }
);

// get course without purchasing
export const getSingleCourse = asyncHandler(async (slug: string) => {
  const course = await db.course.findFirst({
    where: { slug },
    include: { course_data: { omit: { videoUrl: true, suggestions: true } } },
  });

  if (!course) {
    throw new Error("Course not found");
  }

  return {
    success: true,
    message: "course fetched successfully",
    data: course,
  };
});

export const getAllCourses = asyncHandler(async () => {
  const cached: string | null = await redis.get("all_courses");

  if (cached) {
    const courses: ICachedCourse[] = JSON.parse(cached);
    return {
      success: true,
      message: "courses fetched successfully",
      data: courses,
    };
  }

  const courses = await db.course.findMany({
    include: { course_data: { omit: { videoUrl: true, suggestions: true } } },
  });

  await redis.set("all_courses", JSON.stringify(courses));

  return {
    success: true,
    message: "all courses fetched successfully",
    data: courses,
  };
});

export const getUserCourse = authAsyncHandler(
  "USER",
  async ({ courseId, user }: { courseId: string; user: Session["user"] }) => {
    const userId = user.id;

    const course = await db.enrollment.findFirst({
      where: { userId, courseId },
      include: {
        Course: true,
      },
    });

    if (!course) {
      throw new Error("Unauthorized");
    }

    return {
      success: true,
      message: "course fetched successfully",
      data: course,
    };
  }
);
