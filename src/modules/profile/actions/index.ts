"use server";

import { updateProfile } from "../services";
import { IProfileBody } from "../types";

export const UPDATE_PROFILE = async <T>(
  body: IProfileBody
): Promise<{
  success: boolean;
  message: string;
  data: { name: string; avatar: string } | null;
}> => {
  try {
    const result = await updateProfile(body);
    return result;
  } catch (error) {
    console.log("Error in UPDATE_PROFILE :: ", error);
    if (error instanceof Error) {
      return { success: false, message: error.message, data: null };
    }
    return { success: false, message: "Something went wrong", data: null };
  }
};
