import { z } from "zod";

export const course_info_schema = z.object({
  title: z.string().min(10, "title must be atlead 10 characters long"),
  description: z
    .string()
    .min(50, "course description must be atleast 50 characters long"),
  price: z.number().min(1, "price is required"),
  thumbnail: z.string().min(1, "thumbnail is required"),
  discount: z.number().optional(),
  level: z.enum(["Beginner", "Intermediate", "Advance"]),
  demo_url: z.string().min(1, "demo url is required"),
});

export const course_options_schema = z.object({
  benefits: z.array(z.string()).min(1, "benefits are required"),
  prerequisites: z.array(z.string()).min(1, "prerequisites are required"),
});

export const course_content_item_schema = z.object({
  video_section: z.string().min(2, "video section title is required"),
  video_title: z.string().min(4, "video title must be atleast 4 characters"),
  video_url: z.string("enter a valid url"),
  // video_thumbnail: z.string(),
  id: z.string().optional(),
  video_description: z
    .string()
    .min(50, "course description must be atleast 50 characters long"),
  video_link_title: z.string().optional().nullable(),
  video_link_url: z.url().optional().nullable(),
});

export const course_content_schema = z.object({
  contents: z
    .array(course_content_item_schema)
    .min(1, "course content is required"),
});
export type CourseInfoFormData = z.infer<typeof course_info_schema>;
export type CourseContentFormData = z.infer<typeof course_content_schema>;
export type CourseOptionsFormData = z.infer<typeof course_options_schema>;
export type CourseContentItem = z.infer<typeof course_content_item_schema>;

// Combined Schema
export const CombinedCourseSchema = z.object({
  ...course_info_schema.shape,
  ...course_options_schema.shape,
  course_data: course_content_schema,
});
// export const CombinedCourseSchema = z.object({
//   ...course_info_schema.shape,
//   ...course_options_schema.shape,
//   ...course_content_item_schema.shape
// })

export type ICombinedCourseSchema = z.infer<typeof CombinedCourseSchema>;
