import { z } from 'zod';

export const createBudgetSchema = z.object({
  name: z.string().min(1, 'Budget name is required').max(50, 'Name must be less than 50 characters'),
  amount: z.number().positive('Amount must be greater than 0'),
  period: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
  categoryId: z.number().optional().nullable(),
});

export const updateBudgetSchema = createBudgetSchema.partial();

export type CreateBudgetFormData = z.infer<typeof createBudgetSchema>;
export type UpdateBudgetFormData = z.infer<typeof updateBudgetSchema>;
