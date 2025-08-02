"use server";

import { validateNoNulls } from "@/utils/service";
import { updatePassword, updateProfile } from "../services";
import { IChangePassword, IProfileBody } from "../types";

export const UPDATE_PROFILE = async <T>(
  body: IProfileBody
): Promise<{
  success: boolean;
  message: string;
  data: { name: string; avatar: string } | null;
}> => {
  try {
    validateNoNulls(body);

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

export const CHANGE_PASSWORD = async (body: IChangePassword) => {
  try {
    validateNoNulls(body);

    const result = await updatePassword(body);
    return result;
  } catch (error) {
    console.log("Error in CHANGE_PASSWORD :: ", error);
    if (error instanceof Error) {
      return { success: false, message: error.message, data: null };
    }
    return { success: false, message: "Something went wrong", data: null };
  }
};
