export const runtime = "nodejs";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { NEXT_PUBLIC_APP_URL } from "@/constants";
import { db } from "@/lib/db";
import sendMail from "@/lib/email";
import { stripe } from "@/lib/stripe";
import { ICoursePurchased } from "@/types/email";
import { calculatePriceAfterDiscount } from "@/utils";
import { asyncHandler, authAsyncHandler } from "@/utils/asyncHandler";
import { getServerSession, Session } from "next-auth";

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
      throw new Error("Course not found");
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
  "Admin",
  async ({ slug, user }: { slug: string; user: Session["user"] }) => {
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
      throw new Error("Course not found");
    }

    const isEnrolled = await db.enrollment.findFirst({
      where: { userId: user.id, courseId: courseDetails.id },
    });

    if (!isEnrolled) {
      throw new Error("Unauthorized");
    }

    return {
      success: true,
      message: "course details fetched successfully",
      data: courseDetails,
    };
  }
);

export const processPayment = authAsyncHandler(
  "Admin",
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
  "Admin",
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

    const course = await db.course.findFirst({ where: { id: courseId } });

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

    return { success: true, message: "course enrolled successfully" };
  }
);
