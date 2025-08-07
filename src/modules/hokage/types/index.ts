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
  title: string;
  purchased: number;
  ratings: number;
}

export interface ICourseDataBody {
  video_section: string;
  video_title: string;
  video_url: string;
  video_description: string;
  video_link_title?: string | null | undefined;
  video_link_url?: string | null | undefined;
}

export type IHokageCourseReturn = Promise<{
  success: boolean;
  message: string;
  data:
    | {
        title: string;
        id: string;
        ratings: number | null;
        purchased: number | null;
        created_at: Date;
      }[]
    | null;
}>;
