"use server";

import { validateNoNulls } from "@/utils/service";
import { ISignup } from "../types";
import { Signup, VerifyEmail } from "../services";

export const SIGNUP = async (body: ISignup) => {
  try {
    validateNoNulls(body);

    const res = await Signup(body);

    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Something went wrong" };
  }
};

export const VERIFY_USER = async (otp: string) => {
  try {

    const res = await VerifyEmail(otp);

    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Something went wrong" };
  }
};
