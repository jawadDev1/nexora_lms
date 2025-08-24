import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { NEXT_PUBLIC_APP_URL } from "@/constants";
import { db } from "@/lib/db";
import sendMail from "@/lib/email";
import { stripe } from "@/lib/stripe";
import { ICoursePurchased } from "@/types/email";
import { calculatePriceAfterDiscount } from "@/utils";
import { asyncHandler, authAsyncHandler } from "@/utils/asyncHandler";
import { getServerSession, Session } from "next-auth";
import {
  ICourseReviewCreate,
  ICreateQuestion,
  IGetQuestionsReturn,
  IReplyQuestion,
} from "../types";
import { Prisma } from "@/lib/prisma-client";
import { pushNotification } from "@/modules/hokage/services";

export const getCourseDetails = asyncHandler(
  async ({ slug }: { slug: string }) => {
    const courseDetails = await db.course.findFirst({
      where: { slug },
      include: {
        course_data: {
          select: {
            id: true,
            video_length: true,
            video_title: true,
            video_description: true,
            video_url: true,
            video_link_title: true,
            video_link_url: true,
            video_section: true,
          },
        },
        Category: { select: { title: true } },
        reviews: {
          select: {
            rating: true,
            comment: true,
            created_at: true,
            User: { select: { name: true, avatar: true } },
          },
        },
      },
      omit: { updated_at: true },
    });

    if (!courseDetails) {
      return { success: false, message: "course not found", data: null };
    }

    let isEnrolled = false;

    const session = await getServerSession(authOptions);

    if (session && session.user) {
      const isUserEnrolled = await db.enrollment.findFirst({
        where: { userId: session.user.id, courseId: courseDetails.id },
      });

      isEnrolled = !!isUserEnrolled;
    }

    return {
      success: true,
      message: "course details fetched successfully",
      data: { ...courseDetails, isEnrolled },
    };
  }
);

export const getUserCourseDetails = authAsyncHandler(
  "User",
  async ({ slug, user }: { slug: string; user: Session["user"] }) => {
    const courseDetails = await db.course.findFirst({
      where: { slug },
      include: {
        course_data: {
          select: {
            id: true,
            video_length: true,
            video_section: true,
            video_title: true,
            video_description: true,
            video_url: true,
            video_link_title: true,
            video_link_url: true,
          },
        },
        Category: { select: { title: true } },
        reviews: {
          select: {
            rating: true,
            comment: true,
            created_at: true,
            User: { select: { name: true, avatar: true } },
          },
        },
      },
      omit: { updated_at: true },
    });

    if (!courseDetails) {
      return { success: false, message: "course not found", data: null };
    }

    const isEnrolled = await db.enrollment.findFirst({
      where: { userId: user.id, courseId: courseDetails.id },
    });

    const isReviewed = await db.review.findFirst({
      where: { courseId: courseDetails.id, userId: user.id },
    });

    if (!isEnrolled) {
      return { success: false, message: "Unauthorized", data: null };
    }

    return {
      success: true,
      message: "course details fetched successfully",
      data: {
        course: courseDetails,
        isReviewed: !!isReviewed,
      },
    };
  }
);

export const getAdminCourseDetails = authAsyncHandler(
  "Admin",
  async ({ slug, user }: { slug: string; user: Session["user"] }) => {
    const courseDetails = await db.course.findFirst({
      where: { slug },
      include: {
        course_data: {
          select: {
            id: true,
            video_length: true,
            video_section: true,
            video_title: true,
            video_description: true,
            video_url: true,
            video_link_title: true,
            video_link_url: true,
          },
        },
        Category: { select: { title: true } },
        reviews: {
          select: {
            rating: true,
            comment: true,
            created_at: true,
            User: { select: { name: true, avatar: true } },
          },
        },
      },
      omit: { updated_at: true },
    });

    if (!courseDetails) {
      return { success: false, message: "course not found", data: null };
    }

    const isReviewed = true;

    return {
      success: true,
      message: "course details fetched successfully",
      data: {
        course: courseDetails,
        isReviewed: !!isReviewed,
      },
    };
  }
);

export const processPayment = authAsyncHandler(
  "User",
  async ({ amount }: { amount: number }) => {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      metadata: {
        company: "Nexora",
      },
      automatic_payment_methods: { enabled: true },
    });

    return {
      success: true,
      message: "payment process successfully",
      data: { client_secret: payment.client_secret },
    };
  }
);

// ====== Order ========================

export const createOrder = authAsyncHandler(
  "User",
  async ({
    courseId,
    user,
    paymentId,
  }: {
    paymentId: string;
    courseId: string;
    user: Session["user"];
  }) => {
    if (!paymentId || !courseId) {
      throw new Error("Invalid request");
    }

    const course = await db.course.update({
      where: { id: courseId },
      data: { purchased: { increment: 1 } },
    });

    if (!course) {
      throw new Error("course not found");
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);

    if (paymentIntent.status !== "succeeded") {
      throw new Error("Payment not authorized");
    }

    const order = await db.order.create({
      data: {
        courseId,
        userId: user.id,
        payment_id: paymentId,
        payment_status: "PAID",
      },
    });

    await db.enrollment.create({
      data: { courseId, userId: user.id },
    });

    const payload: ICoursePurchased = {
      courseTitle: course.title,
      courseFinalPrice: course.discount
        ? calculatePriceAfterDiscount(course.price, course.discount)
        : course.price,
      courseOriginalPrice: course.price,
      discount: course.discount as number,
      courseUrl: `${NEXT_PUBLIC_APP_URL}/course/${course.slug}`,
      orderId: order.id,
      purchaseDate: order.created_at.toISOString(),
      userName: user.name as string,
    };

    await sendMail({
      to: user.email as string,
      context: payload,
      subject: "Course Purchased",
      template: "course-purchased",
    });

    await pushNotification({
      title: "New Course Purchased",
      description: `${course.title} has been purchased by ${user.email}`,
    });

    return { success: true, message: "course enrolled successfully" };
  }
);

// ====== Question ==================================

export const createQuestion = authAsyncHandler(
  "User",
  async ({
    question,
    content_id,
    user,
  }: ICreateQuestion & { user: Session["user"] }) => {
    if (!content_id) {
      throw new Error("Content id is required");
    }

    const newQuestion = await db.question.create({
      data: { question, userId: user.id, courseDataId: content_id },
      omit: { id: true },
      include: {
        CourseData: {
          select: {
            Course: { select: { title: true, slug: true } },
            video_title: true,
          },
        },
      },
    });

    if (user?.role !== "Admin") {
      await pushNotification({
        title: "New Question",
        description: `${newQuestion.CourseData?.Course?.title}, video ${newQuestion.CourseData?.video_title} has a new question`,
      });
    }

    return {
      success: true,
      message: "question created successfully",
      data: newQuestion,
    };
  }
);

export const getContentQuestions = authAsyncHandler(
  "User",
  async ({
    content_id,
  }: {
    content_id: string;
  }): Promise<IGetQuestionsReturn> => {
    if (!content_id) {
      throw new Error("Content id is required");
    }

    const questions = await db.question.findMany({
      where: { courseDataId: content_id },
      include: {
        replies: {
          include: {
            User: { select: { name: true, avatar: true, role: true } },
          },
          omit: { userId: true, questionId: true },
        },
        User: { select: { avatar: true, name: true, role: true } },
      },
      omit: { courseDataId: true, userId: true },
    });

    return {
      success: true,
      message: "questions fetched successfully",
      data: questions,
    };
  }
);

export const replyQuestion = authAsyncHandler(
  "User",
  async ({
    reply,
    user,
    question_id,
  }: IReplyQuestion & { user: Session["user"] }) => {
    const questions = await db.reply.create({
      data: { reply, questionId: question_id, userId: user.id },
      omit: { id: true },
    });

    return {
      success: true,
      message: "question replied successfully",
      data: questions,
    };
  }
);

export const addCourseReview = authAsyncHandler(
  "User",
  async ({
    comment,
    rating,
    courseId,
    user,
  }: ICourseReviewCreate & { user: Session["user"] }) => {
    if (!courseId) {
      throw new Error("Course id is required");
    }

    await db.review.create({
      data: { rating, comment, courseId, userId: user.id },
    });

    return { success: true, message: "review added successfully" };
  }
);

export const getCourses = asyncHandler(
  async ({ category, search }: { category?: string; search?: string }) => {
    let payload: Prisma.CourseFindManyArgs = {
      select: {
        title: true,
        price: true,
        discount: true,
        ratings: true,
        slug: true,
        level: true,
        thumbnail: true,
        reviews: { select: { rating: true } },
        _count: { select: { course_data: true } },
      },
      orderBy: { created_at: "asc" },
    };

    if (category) {
      payload.where = { categoryId: category };
    }

    if (search) {
      payload.where = payload.where
        ? { ...payload.where, title: { contains: search, mode: "insensitive" } }
        : { title: { contains: search, mode: "insensitive" } };
    }
    const courses = await db.course.findMany(payload);

    return {
      success: true,
      message: "courses fetched successfully",
      data: courses,
    };
  }
);

export const getCategories = asyncHandler(async () => {
  const categories = await db.category.findMany({
    select: { title: true, id: true },
  });

  return {
    success: true,
    message: "categories fetched successfully",
    data: categories,
  };
});
