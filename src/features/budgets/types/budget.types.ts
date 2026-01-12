// Budget types
export interface Budget {
  id: number;
  name: string;
  amount: number;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  categoryId: number | null;
  category: {
    id: number;
    name: string;
    icon: string | null;
    color: string | null;
  } | null;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface BudgetProgress {
  budget: Budget;
  spent: number;
  remaining: number;
  percentage: number;
  periodStart: string;
  periodEnd: string;
}

export interface CreateBudgetData {
  name: string;
  amount: number;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  categoryId?: number;
}

export interface UpdateBudgetData {
  name?: string;
  amount?: number;
  period?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  categoryId?: number;
}
