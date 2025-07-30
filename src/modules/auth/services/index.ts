import { db } from "@/lib/db";
import { ISignup } from "../types";
import { validateNoNulls } from "@/utils/service";
import bcrypt from 'bcrypt'

export const Signup = async (body: ISignup) => {
  try {
    validateNoNulls(body);

    const userExists = await db.user.findFirst({
      where: { email: body.email },
    });

    if (userExists) {
      throw new Error("User already exists");
    }

    const salt = 10;
    const hashedPassword = await bcrypt 

    const user = db.user.create({ data: body });
  } catch (error) {
    console.log("Error in Signup :: ", error);
    throw new Error("Something went wrong");
  }
};
