import { authAsyncHandler } from "@/utils/asyncHandler";
import {
    IHokageCategory,
    IHokageCategoryReturn,
    IHokageFaq,
    IHokageFaqReturn,
    IHokageFormCategoryReturn,
} from "../types";
import { db } from "@/lib/db";
import redis from "@/lib/redis";

export const addCategory = authAsyncHandler(
    "Admin",
    async ({ title }: IHokageCategory) => {
        const category = await db.category.create({ data: { title } });

        await redis.del("hokage_table_categories");
        return { success: true, message: "category added successfully" };
    },
);

export const updateCategory = authAsyncHandler(
    "Admin",
    async ({ id, title }: IHokageCategory) => {
        await db.category.update({
            where: { id },
            data: { title },
        });

        await redis.del("hokage_table_categories");
        return { success: true, message: "category updated successfully" };
    },
);

export const getHokageCategories = authAsyncHandler(
    "Admin",
    async (): Promise<IHokageCategoryReturn> => {
        const cached: IHokageCategory[] | null = await redis.get(
            "hokage_table_categories",
        );

        if (cached) {
            return {
                success: true,
                message: "categories fetched successfully",
                data: cached,
            };
        }

        const categories = await db.category.findMany({
            select: {
                id: true,
                title: true,
                _count: { select: { courses: true } },
                created_at: true,
            },
        });

        const modifiedCategories: IHokageCategory[] = categories.map(
            (category) => ({
                title: category.title,
                courses: category._count.courses,
                created_at: category.created_at,
                id: category.id,
            }),
        );

        await redis.set("hokage_table_categories", modifiedCategories);

        return {
            success: true,
            message: "categories fetched successfully",
            data: categories,
        };
    },
);

export const deleteCategory = authAsyncHandler(
    "Admin",
    async ({ id }: { id: string }) => {
        if (!id) throw new Error("Invalid category id");

        await db.category.delete({ where: { id } });

        await redis.del("hokage_table_categories");
        return { success: true, message: "category deleted successfully" };
    },
);

export const getFormCategories = authAsyncHandler(
    "Admin",
    async (): Promise<IHokageFormCategoryReturn> => {
        const categories = await db.category.findMany({
            select: { title: true, id: true },
        });

        const modifiedCategories = categories.map((cat) => ({
            label: cat.title,
            value: cat.id,
        }));

        return {
            success: true,
            message: "form categories fetched successfully",
            data: modifiedCategories,
        };
    },
);
