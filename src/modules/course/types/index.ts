import { Session } from "next-auth";

export interface ICourse {
  id?: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  discount?: number;
  thumbnail: string;
  level: ICourseLevel;
  demo_url: string;
  benefits: string[];
  prerequisites: string[];
  reviews: IReview[];
  //   orders: Order[];
  //   enrollments: IEnrollment[];
  ratings: number;
  purchased?: number;
  course_data: ICourseData[];
  created_at: Date;
  categoryId: string | null;
  Category: ICategory | null;
}

export interface ICourseData {
  id: string;
  video_title: string;
  video_section?: string;
  video_description?: string;
  video_length?: number;
  video_url: string;
  video_link_title: string | null;
  video_link_url: string | null;
}

export interface IReview {
  rating: number;
  comment: string;
  User: {
    name: string;
    avatar?: string;
  };
  created_at: Date;
}

export interface ICategory {
  title: string;
}

export interface IOrder {
  id: string;
  userId: string;
  courseId: string;
  amount: number;
  status: IOrderStatus;
  created_at: Date;
}

export interface IEnrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  completed: boolean;
  enrolled_at: Date;
}

export type ICourseLevel = "Beginner" | "Intermediate" | "Advance";

export enum IOrderStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface ICourseDetailPageProps {
  course: ICourse;
  isEnrolled: boolean;
  userProgress?: number;
}

// ========= Question ==============================

export interface ICreateQuestion {
  question: string;
  content_id: string;
}

export interface IReplyQuestion {
  reply: string;
  question_id: string;
}

export interface questions {
  id: string;
  question: string;
  created_at: Date;
  User: {
    avatar: string;
    name: string;
    role?: string;
  } | null;
  replies: {
    id: string;
    reply: string;
    created_at: Date;
    User: {
      avatar: string;
      name: string;
      role?: string;
    } | null;
  }[];
}

export interface IGetQuestionsReturn {
  success: boolean;
  message: string;
  data: questions[] | null;
}

// ============== Fontend ====================
export interface IQuestion {
  id: string;
  question: string;
  created_at: Date;
  User: {
    avatar: string;
    name: string;
    role?: string;
  } | null;
  replies: IReply[];
}

export interface IReply {
  id: string;
  reply: string;
  created_at: Date;
  User: {
    avatar: string;
    name: string;
    role?: string;
  } | null;
}

export interface ICourseReviewCreate {
  rating: number;
  comment: string;
  courseId: string;
}


export interface ICourseWithCountAndReviews {
  title: string;
  price: number;
  discount: number | null;
  ratings: number | null;
  slug: string;
  level: string;
  thumbnail: string | null;
  reviews: { rating: number }[];
  _count: { course_data: number };
}