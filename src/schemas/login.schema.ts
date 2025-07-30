import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "password must be at least 8 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
