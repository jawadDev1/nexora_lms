import { z } from "zod";

export const faq_schema = z.object({
    question: z.string().min(10, "question must be atleast 10 characters"),
    answer: z.string().min(10, "answer must be atleast 10 characters"),
    active: z.boolean(),
});

export type FaqFormData = z.infer<typeof faq_schema>;
