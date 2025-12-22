import type { Category } from "@/features/categories/types/category.types";

export interface Expense {
  id: number;
  amount: number;
  description: string;
  date: string;
  type: "expense" | "income";
  categoryId: number;
  category: Category;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateExpenseRequest {
  amount: number;
  description: string;
  date?: string;
  type?: "expense" | "income";
  categoryId: number;
}

export interface UpdateExpenseRequest {
  amount?: number;
  description?: string;
  date?: string;
  categoryId?: number;
}

export interface ExpenseFilters {
  startDate?: string;
  endDate?: string;
  categoryId?: number;
  type?: "expense" | "income";
}

export type ExpenseType = "expense" | "income";
