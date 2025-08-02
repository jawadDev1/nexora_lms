import { authAsyncHandler } from "@/utils/asyncHandler";
import { IProfileBody } from "../types";
import { db } from "@/lib/db";
import { Session } from "next-auth";

export const updateProfile = authAsyncHandler(
  "USER",
  async({ name, avatar, user }: IProfileBody & { user: Session["user"] }) => {
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
