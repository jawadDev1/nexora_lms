"use server";

import { revalidatePath } from "next/cache";
import { deleteUser } from "../services/users.services";

export const DELETE_USER = async ({ userId }: { userId: string }) => {
  try {

    const result = await deleteUser({userId});

    revalidatePath('/hokage/users')

    return result;
  } catch (error) {
    console.log("Error in DELETE_USER :: ", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Something went wrong" };
  }
};
