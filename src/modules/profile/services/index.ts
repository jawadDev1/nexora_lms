import { authAsyncHandler } from "@/utils/asyncHandler";
import { IChangePassword, IProfileBody } from "../types";
import { db } from "@/lib/db";
import { Session } from "next-auth";
import { comparePassword, hashPassword } from "@/utils/hash";

export const updateProfile = authAsyncHandler(
  "USER",
  async ({ name, avatar, user }: IProfileBody & { user: Session["user"] }) => {
    const updatedUser = await db.user.update({
      where: { email: user.email! },
      data: { name, avatar },
    });

    return {
      success: true,
      message: "profile updated successfully",
      data: updatedUser,
    };
  }
);

export const updatePassword = authAsyncHandler(
  "USER",
  async ({
    confirm_password,
    new_password,
    old_password,
    user,
  }: IChangePassword & { user: Session["user"] }) => {
    if (new_password !== confirm_password) {
      throw new Error("New and confirm password does not match");
    }

    const newUser = await db.user.findFirst({ where: { email: user.email! } });

    const hashedPassword = await hashPassword(new_password);
    // Case: signed up using social auth
    if (!newUser?.password) {
      await db.user.update({
        where: { email: user.email! },
        data: { password: hashedPassword },
      });
      return { success: true, message: "password created successfully" };
    }

    const isCorrectPassword = await comparePassword(
      old_password,
      newUser?.password!
    );

    if (!isCorrectPassword) {
      throw new Error("Invalid password");
    }

    await db.user.update({
      where: { email: user.email! },
      data: { password: hashedPassword },
    });

    return { success: true, message: "password updated successfully" };
  }
);
