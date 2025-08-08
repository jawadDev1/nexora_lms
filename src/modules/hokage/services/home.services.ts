import { authAsyncHandler } from "@/utils/asyncHandler";
import { IHomeHeroBody, IHomeHeroReturn } from "../types/home.types";
import { db } from "@/lib/db";
import redis from "@/lib/redis";

export const updateHomeHero = authAsyncHandler(
    "Admin",
    async ({ id, title, subtitle, image }: IHomeHeroBody) => {
        const updatedHero = await db.hero.update({
            where: { id },
            data: { title, subtitle, image },
        });

        await redis.set("home_hero", JSON.stringify(updatedHero));

        return { success: true, message: "hero updated successfully" };
    },
);

export const getHomeHero = authAsyncHandler(
    "Admin",
    async (): IHomeHeroReturn => {
        const hero = await db.hero.findFirst({});

        return {
            success: true,
            message: "hero updated successfully",
            data: hero,
        };
    },
);

export const getUserHomeHero = authAsyncHandler(
    "Admin",
    async (): IHomeHeroReturn => {
        const cachedHero: IHomeHeroBody | null = await redis.get("home_hero");

        if (cachedHero) {
            return {
                success: true,
                message: "hero updated successfully",
                data: cachedHero,
            };
        }

        const hero = await db.hero.findFirst({ omit: { id: true } });

        await redis.set("home_hero", JSON.stringify(hero));

        return {
            success: true,
            message: "hero updated successfully",
            data: hero,
        };
    },
);
