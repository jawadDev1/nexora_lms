import { authAsyncHandler } from "@/utils/asyncHandler";
import { IHokageFaq, IHokageFaqReturn } from "../types";
import { db } from "@/lib/db";

export const addFaq = authAsyncHandler(
    "Admin",
    async ({ question, answer, active }: IHokageFaq) => {
        const faq = await db.faq.create({ data: { question, answer, active } });

        return { success: true, message: "faq added successfully" };
    },
);

export const updateFaq = authAsyncHandler(
    "Admin",
    async ({ id, question, answer, active }: IHokageFaq) => {
        const faq = await db.faq.update({
            where: { id },
            data: { question, answer, active },
        });

        return { success: true, message: "faq updated successfully" };
    },
);

export const getHokageFaqs = authAsyncHandler(
    "Admin",
    async (): Promise<IHokageFaqReturn> => {
        const faqs = await db.faq.findMany({});

        return {
            success: true,
            message: "faqs fetched successfully",
            data: faqs,
        };
    },
);

export const deleteFaq = authAsyncHandler(
    "Admin",
    async ({ id }: { id: string }) => {
        if (!id) throw new Error("Invalid faq id");

        await db.faq.delete({ where: { id } });

        return { success: true, message: "faq deleted successfully" };
    },
);
