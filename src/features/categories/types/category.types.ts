export interface Category {
  id: number;
  name: string;
  icon: string | null;
  color: string | null;
  type: "expense" | "income";
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  icon?: string;
  color?: string;
  type: "expense" | "income";
}

export interface CategoryWithExpenseCount extends Category {
  expenseCount?: number;
}

export type CategoryType = "expense" | "income";
