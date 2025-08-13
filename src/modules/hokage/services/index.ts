import { asyncHandler, authAsyncHandler } from "@/utils/asyncHandler";
import {
  ICachedCourse,
  ICourseAnalyticsReturn,
  ICourseBody,
  ICourseDataBody,
  IHokageCourseDetailReturn,
  IHokageCourseReturn,
} from "../types";
import { generateRandomString, generateSlug } from "@/utils";
import { db } from "@/lib/db";
import redis from "@/lib/redis";
import { Session } from "next-auth";
import server_pusher from "@/lib/server-pusher";

export const createCourse = authAsyncHandler(
  "Admin",
  async ({
    course,
    course_data,
  }: {
    course: ICourseBody;
    course_data: ICourseDataBody[];
  }) => {
    let slug = generateSlug(course.title);

    const alreadyExists = await db.course.findFirst({ where: { slug } });

    if (alreadyExists) {
      slug = `slug-${generateRandomString()}`;
    }

    const new_course = await db.course.create({
      data: { ...course, slug },
    });

    await db.courseData.createMany({
      data: course_data.map((data) => ({
        ...data,
        courseId: new_course.id,
      })),
    });

    await redis.del("hokage_courses", "hokage_table_categories");

    return {
      success: true,
      message: "course created successfully",
      data: new_course,
    };
  }
);

export const updateCourse = authAsyncHandler(
  "Admin",
  async ({
    course,
    course_data,
    id,
  }: {
    course: ICourseBody;
    course_data: ICourseDataBody[];
    id: string;
  }) => {
    if (!id) {
      throw new Error("Invalid course id");
    }

    const new_course = await db.course.update({
      where: { id },
      data: { ...course },
    });

    // Batch update each courseData item
    const courseDataUpdates = course_data.map((data) =>
      db.courseData.update({
        where: { id: data.id }, // make sure `data.id` exists
        data: {
          video_title: data.video_title,
          video_description: data.video_description,
          video_url: data.video_url,
          video_section: data.video_section,
          video_link_title: data.video_link_title,
          video_link_url: data.video_link_url,
        },
      })
    );

    await db.$transaction(courseDataUpdates); // safely run all updates together

    await redis.del("hokage_courses");

    return {
      success: true,
      message: "course updated successfully",
      data: new_course,
    };
  }
);

// get course without purchasing
export const getSingleCourse = asyncHandler(async (slug: string) => {
  const course = await db.course.findFirst({
    where: { slug },
    include: {
      course_data: { omit: { video_url: true, suggestions: true } },
    },
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
    include: {
      course_data: { omit: { video_url: true, suggestions: true } },
    },
  });

  await redis.set("all_courses", JSON.stringify(courses));

  return {
    success: true,
    message: "all courses fetched successfully",
    data: courses,
  };
});

export const getUserCourse = authAsyncHandler(
  "User",
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

export const generateVideoUrl = asyncHandler(
  async ({ videoId }: { videoId: string }) => {
    const key = process.env.VDO_CIPHER_SECRET!;

    const response = await fetch(
      `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Apisecret ${key}`,
        },
      }
    );

    const data = await response.json();

    return {
      success: true,
      message: "video url generated successfull",
      data,
    };
  }
);

export const getHokageCourses = authAsyncHandler(
  "Admin",
  async ({
    page,
    pageSize,
  }: {
    pageSize: number;
    page: number;
  }): IHokageCourseReturn => {
    const isCached: ICachedCourse[] | null = await redis.get("hokage_courses");
    if (isCached) {
      return {
        success: true,
        message: "courses fetched successfully",
        data: isCached,
      };
    }

    const courses = await db.course.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        title: true,
        ratings: true,
        purchased: true,
        created_at: true,
      },
    });

    await redis.set("hokage_courses", JSON.stringify(courses));

    return {
      success: true,
      message: "data fetched successfully",
      data: courses,
    };
  }
);

export const deleteCourse = authAsyncHandler(
  "Admin",
  async ({ courseId }: { courseId: string }) => {
    if (!courseId) {
      throw new Error("Invalid course id");
    }

    await db.course.delete({ where: { id: courseId } });

    await redis.del("hokage_courses");

    return { success: true, message: "user deleted successfully" };
  }
);

export const getHokageCourseDetails = authAsyncHandler(
  "Admin",
  async ({ courseId }: { courseId: string }): IHokageCourseDetailReturn => {
    if (!courseId) {
      throw new Error("Invalid course id");
    }

    const course = await db.course.findFirst({
      where: { id: courseId },
      omit: {
        created_at: true,
        updated_at: true,
        ratings: true,
        purchased: true,
        slug: true,
      },

      include: {
        course_data: {
          omit: {
            created_at: true,
            updated_at: true,
            courseId: true,
            suggestions: true,
          },
        },
      },
    });

    return {
      success: true,
      message: "course fetched successfully",
      data: course,
    };
  }
);

export const getCourseAnalytics = authAsyncHandler(
  "Admin",
  async (): Promise<ICourseAnalyticsReturn> => {
    const coursesByMonth = await db.$queryRaw<
      { month: string; count: number }[]
    >`
SELECT 
  TO_CHAR("created_at", 'Mon YYYY') AS month,
  COUNT(*) AS count
FROM "Course"
GROUP BY month
ORDER BY MIN("created_at");
`;

    const formatted = coursesByMonth.map((row) => ({
      month: row.month,
      count: Number(row.count),
    }));

    return {
      success: true,
      message: "users analytics fetched successfully",
      data: formatted,
    };
  }
);

// ====== Orders =======================
export const getOrdersAnalytics = authAsyncHandler(
  "Admin",
  async (): Promise<ICourseAnalyticsReturn> => {
    const coursesByMonth = await db.$queryRaw<
      { month: string; count: number }[]
    >`
SELECT 
  TO_CHAR("created_at", 'Mon YYYY') AS month,
  COUNT(*) AS count
FROM "Course"
GROUP BY month
ORDER BY MIN("created_at");
`;

    const formatted = coursesByMonth.map((row) => ({
      month: row.month,
      count: Number(row.count),
    }));

    return {
      success: true,
      message: "course analytics fetched successfully",
      data: formatted,
    };
  }
);

export const getNotifications = authAsyncHandler("Admin", async () => {
  const notifications = await db.notification.findMany({
    where: { is_read: false },
    omit: { updated_at: true },
  });

  return {
    success: true,
    message: "notifications fetched successfully",
    data: notifications,
  };
});

// Pusher Notification
export const pushNotification = asyncHandler(
  async ({ title, description }: { title: string; description: string }) => {
    await db.notification.create({ data: { title, description } });

    const pusher = server_pusher;

    await pusher.trigger("notification-channel", "new-notification", {});

    return { success: true, message: "test successful" };
  }
);

export const updateNotificationStatus = authAsyncHandler(
  "Admin",
  async ({ id }: { id: string }) => {
    await db.notification.update({ where: { id }, data: { is_read: true } });

    return { success: true, message: "notification is updated successfully" };
  }
);

export const getHokageOrders = authAsyncHandler("Admin", async () => {
  const orders = await db.order.findMany({
    select: {
      id: true,
      created_at: true,
      Course: { select: { title: true, price: true, discount: true } },
      User: { select: { name: true, email: true } },
    },
  });

  const modifiedOrders = orders.map((order) => ({
    id: order.id,
    title: order.Course.title,
    price: order.Course.price,
    discount: order.Course.discount,
    email: order.User.email,
    created_at: order.created_at,
  }));

  return {
    success: true,
    message: "orders fetched successfully",
    data: modifiedOrders,
  };
});
