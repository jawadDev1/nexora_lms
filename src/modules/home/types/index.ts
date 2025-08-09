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