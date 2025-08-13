"use server";

import { validateNoNulls } from "@/utils/service";
import {
  IHokageCategory,
  IHokageFormCategoryReturn,
  INotificationReturn,
} from "../types";
import { revalidatePath } from "next/cache";
import {
  addCategory,
  deleteCategory,
  getFormCategories,
  updateCategory,
} from "../services/category.servic";
import { IHomeHeroBody } from "../types/home.types";
import { updateHomeHero } from "../services/home.services";
import { deleteUser } from "../services/users.services";
import { getNotifications, updateNotificationStatus } from "../services";

export const ADD_CATEGORY = async (body: IHokageCategory) => {
  try {
    validateNoNulls(body);
    const result = await addCategory(body);
    revalidatePath("/hokage/category");
    return result;
  } catch (error) {
    console.log("Error in ADD_CATEGORY :: ", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Something went wrong" };
  }
};

export const UPDATE_CATEGORY = async (body: IHokageCategory) => {
  try {
    validateNoNulls(body);
    const result = await updateCategory(body);
    revalidatePath("/hokage/category");
    return result;
  } catch (error) {
    console.log("Error in UPDATE_CATEGORY :: ", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Something went wrong" };
  }
};

export const DELETE_CATEGORY = async ({ id }: { id: string }) => {
  try {
    if (!id) throw new Error("id is required");

    const result = await deleteCategory({ id });
    revalidatePath("/hokage/faq");
    return result;
  } catch (error) {
    console.log("Error in DELETE_CATEGORY :: ", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Something went wrong" };
  }
};

export const GET_FORM_CATEGORIES =
  async (): Promise<IHokageFormCategoryReturn> => {
    try {
      const result = await getFormCategories("");
      return result;
    } catch (error) {
      console.log("Error in GET_FORM_CATEGORIES :: ", error);
      if (error instanceof Error) {
        return { success: false, message: error.message, data: null };
      }
      return {
        success: false,
        message: "Something went wrong",
        data: null,
      };
    }
  };

// ==== HOME =======================

export const UPDATE_HOME_HERO = async (body: IHomeHeroBody) => {
  try {
    validateNoNulls(body);
    const result = await updateHomeHero(body);
    return result;
  } catch (error) {
    console.log("Error in UPDATE_HOME :: ", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Something went wrong" };
  }
};

// ======= USER ==============================

export const DELETE_USER = async ({ userId }: { userId: string }) => {
  try {
    const result = await deleteUser({ userId });

    revalidatePath("/hokage/users");

    return result;
  } catch (error) {
    console.log("Error in DELETE_USER :: ", error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Something went wrong" };
  }
};

// ======= Notifications ===========================

export const GET_NOTIFICATIONS = async (): Promise<INotificationReturn> => {
  try {
    const result = await getNotifications("");

    return result;
  } catch (error) {
    console.log("Error in GET_NOTIFICATIONS :: ", error);
    if (error instanceof Error) {
      return { success: false, message: error.message, data: null };
    }
    return { success: false, message: "Something went wrong", data: null };
  }
};

export const UPDATE_NOTIFICATION_STATUS = async ({id}: {id: string}) => {
try {
    const result = await updateNotificationStatus({id});

    return result;
  } catch (error) {
    console.log("Error in UPDATE_NOTIFICATION_STATUS :: ", error);
    if (error instanceof Error) {
      return { success: false, message: error.message, data: null };
    }
    return { success: false, message: "Something went wrong", data: null };
  }
}