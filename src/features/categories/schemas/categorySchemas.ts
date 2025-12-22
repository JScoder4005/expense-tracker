import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Category name is required").max(50, "Name too long"),
  icon: z.string().min(1, "Please select an icon"),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid color format"),
  type: z.enum(["expense", "income"], {
    message: "Please select a type",
  }),
});

export type CreateCategoryFormData = z.infer<typeof createCategorySchema>;
