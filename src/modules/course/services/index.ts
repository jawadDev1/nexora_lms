import { db } from "@/lib/db";
import { asyncHandler } from "@/utils/asyncHandler";

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
      omit: { id: true, updated_at: true },
    });

    console.log("Course details =============> ", courseDetails);

    return {
      success: true,
      message: "course details fetched successfully",
      data: courseDetails,
    };
  }
);
