"use server";

import { validateNoNulls } from "@/utils/service";
import {
  ICourseBody,
  ICourseDataBody,
  IHokageCourseReturn,
  IUpdateCourseBody,
} from "../types";
import {
  createCourse,
  generateVideoUrl,
  getHokageCourses,
  updateCourse,
} from "../services";

export const CREATE_COURSE = async ({
  course,
  course_data,
}: {
  course: ICourseBody;
  course_data: ICourseDataBody[];
}) => {
  try {
    validateNoNulls(course);
    validateNoNulls(course_data);

    const result = await createCourse({ course, course_data });

    return result;
  } catch (error) {
    console.log("Error in CREATE_COURSE :: ", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Something went wrong" };
  }
};

export const UPDATE_COURSE = async (data: IUpdateCourseBody) => {
  try {
    validateNoNulls(data);

    const result = await updateCourse(data);

    return result;
  } catch (error) {
    console.log("Error in UPDATE_COURSE :: ", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Something went wrong" };
  }
};

export const GENERATE_VIDEO_URL = async <T>({
  videoId,
}: {
  videoId: string;
}): Promise<{
  success: boolean;
  message: string;
  data: { otp: string; playbackInfo: string } | null;
}> => {
  try {
    const result = await generateVideoUrl({ videoId });

    return result;
  } catch (error) {
    console.log("Error in GENERATE_VIDEO_URL :: ", error);
    if (error instanceof Error) {
      return { success: false, message: error.message, data: null };
    }
    return { success: false, message: "Something went wrong", data: null };
  }
};

export const GET_HOKAGE_COURSES = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): IHokageCourseReturn => {
  try {
    const result = await getHokageCourses({ page, pageSize });

    return result;
  } catch (error) {
    console.log("Error in GET_HOKAGE_COURSES :: ", error);
    if (error instanceof Error) {
      return { success: false, message: error.message, data: null };
    }
    return { success: false, message: "Something went wrong", data: null };
  }
};
