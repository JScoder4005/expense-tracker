import { z } from "zod";

export const createExpenseSchema = z.object({
  amount: z.coerce.number().positive("Amount must be positive").max(1000000000, "Amount too large"),
  description: z.string().min(1, "Description is required").max(200, "Description too long"),
  categoryId: z.coerce.number().positive("Please select a category"),
  type: z.enum(["expense", "income"]).default("expense"),
  date: z.string().optional(),
});

export const updateExpenseSchema = createExpenseSchema.partial();

export type CreateExpenseFormData = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseFormData = z.infer<typeof updateExpenseSchema>;
