import { IServiceReturn } from "@/types/common";

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
  id?: string;
  video_section: string;
  video_title: string;
  video_url: string;
  video_length?: number;
  video_description: string;
  video_link_title?: string | null | undefined;
  video_link_url?: string | null | undefined;
}

export interface IHokageCourseData {
  video_title: string;
  video_description: string;
  video_url: string;
  video_section: string;
  video_link_title: string | null;
  video_link_url: string | null;
  video_length: number;
}

export interface IHokageCourseDetail {
  id: string;
  title: string;
  description: string;
  price: number;
  categoryId: string | null;
  discount: number | null;
  thumbnail: string;
  level: "Intermediate" | "Beginner" | "Advance";
  demo_url: string;
  benefits: string[];
  prerequisites: string[];
  course_data: IHokageCourseData[] | null;
}

export type IHokageCourseDetailReturn = Promise<{
  success: boolean;
  message: string;
  data: IHokageCourseDetail | null;
}>;

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

// ======== Course Analytics ================
export interface ICourseAnalytics {
  month: string;
  count: number;
}
export interface ICourseAnalyticsReturn extends IServiceReturn {
  data: ICourseAnalytics[];
}

// ====== Faq ===================

export interface IHokageFaq {
  id?: string;
  question: string;
  answer: string;
  active: boolean;
}

export interface IHokageFaqReturn extends IServiceReturn {
  data: IHokageFaq[];
}

// ====== Category ===================

export interface IHokageCategory {
  id?: string;
  title: string;
  courses?: number;
  created_at?: Date;
}

export interface IHokageFormCategory {
  value: string;
  label: string;
}

export interface IHokageCategoryReturn extends IServiceReturn {
  data: IHokageCategory[];
}

export interface IHokageFormCategoryReturn extends IServiceReturn {
  data: IHokageFormCategory[] | null;
}

// ========== Notifications =====================
export interface INotification {
  id: string;
  title: string;
  description: string;
  is_read: boolean;
  created_at: Date;
}

export interface INotificationReturn extends IServiceReturn {
  data: INotification[] | null;
}
