import { z } from "zod";

export const category_schema = z.object({
    title: z.string().min(5, "title must be atleast 5 characters"),
});

export type CategoryFormData = z.infer<typeof category_schema>;
