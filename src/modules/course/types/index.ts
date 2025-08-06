export interface ICourseBody {
  title: string;
  description: string;
  price: number;
  discount?: number;
  thumbnail: string;
  level: "Beginner" | "Intermediate" | "Advance";
  demo_url: string;
  benefits: string[];
  prerequisites: string[];
}

export interface IUpdateCourseBody extends Partial<ICourseBody> {
  slug: string;
}

export interface ICachedCourse {
  id: string;
  created_at: Date;
  updated_at: Date;
  courseId: string | null;
  title: string;
  description: string;
  videoThumbnail: string;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  benefits: string[];
  prerequisites: string[];
}

export interface ICourseDataBody {
  video_section: string;
  video_title: string;
  video_url: string;
  video_description: string;
  video_link_title?: string | null | undefined;
  video_link_url?: string | null | undefined;
}
