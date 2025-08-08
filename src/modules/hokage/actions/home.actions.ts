"use server";

import { validateNoNulls } from "@/utils/service";
import { updateHomeHero } from "../services/home.services";
import { IHomeHeroBody } from "../types/home.types";

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
