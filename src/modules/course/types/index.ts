export interface ICourse {
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
  video_description?: string;
  video_length?: number;
  video_url: string;
  //   duration?: number;
  //   order: number;
  //   is_free: boolean;
  //   courseId: string;
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
