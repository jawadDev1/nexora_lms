import { z } from "zod";

export const hero_schem = z.object({
    id: z.string(),
    title: z.string().min(10, "title must be atleast 10 characters"),
    subtitle: z.string().min(10, "subtitle must be atleast 10 characters"),
    image: z.string().min(1, "image is required "),
});

export type HeroFormData = z.infer<typeof hero_schem>;
