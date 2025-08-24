import { IHomeHeroBody } from "@/modules/hokage/types/home.types";

export type IHomeHeroReturn = Promise<{
    success: boolean;
    message: string;
    data: IHomeHeroBody | null;
}>;


export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
  rating: number;
  content: string;
  course: string;
  videoUrl?: string;
  featured?: boolean;
}


export interface FAQ {
  question: string;
  answer: string;
}


export interface IHomeCourse {
  title: string;
  slug: string;
  price: number;
  discount: number | null;
  thumbnail: string;
  level: any;
  ratings: number | null;
  reviews: {
    rating: number;
  }[];
  _count: {
    reviews: number;
    course_data: number;
  };
}