"use server";

import { validateNoNulls } from "@/utils/service";
import { IHokageFaq } from "../types";
import { addFaq, deleteFaq, updateFaq } from "../services/faq.service";
import { revalidatePath } from "next/cache";

export const ADD_FAQ = async (body: IHokageFaq) => {
    try {
        validateNoNulls(body);
        const result = await addFaq(body);
        revalidatePath("/hokage/faq");
        return result;
    } catch (error) {
        console.log("Error in UPDATE_HOME :: ", error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "Something went wrong" };
    }
};

export const UPDATE_FAQ = async (body: IHokageFaq) => {
    try {
        validateNoNulls(body);
        const result = await updateFaq(body);
        revalidatePath("/hokage/faq");
        return result;
    } catch (error) {
        console.log("Error in UPDATE_HOME :: ", error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "Something went wrong" };
    }
};

export const DELETE_FAQ = async ({ id }: { id: string }) => {
    try {
        if (!id) throw new Error("id is required");

        const result = await deleteFaq({ id });
        revalidatePath("/hokage/faq");
        return result;
    } catch (error) {
        console.log("Error in DELETE_FAQ :: ", error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "Something went wrong" };
    }
};
