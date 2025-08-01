"use server";

import { validateNoNulls } from "@/utils/service";
import { ICourseBody, IUpdateCourseBody } from "../types";
import { createCourse, updateCourse } from "../services";

export const CREATE_COURSE = async (data: ICourseBody) => {
  try {
    validateNoNulls(data);

    const result = await createCourse(data);

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


