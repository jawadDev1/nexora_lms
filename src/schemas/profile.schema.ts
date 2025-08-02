import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .min(4, "name must be atleast 4 characters long")
    .max(255, "name cannot be longer the 255"),
  email: z.email().optional().nullable(),
  profile: z
    .instanceof(File)
    .refine(
      (file) =>
        [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/svg+xml",
          "image/gif",
        ].includes(file.type),
      { message: "Invalid image file type" }
    )
    .nullable()
    .optional(),
});

export type ProfileSchemaData = z.infer<typeof profileSchema>;
