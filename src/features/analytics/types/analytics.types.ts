export interface DashboardStats {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  savings: number;
  incomeChange: number;
  expenseChange: number;
  savingsChange: number;
}

export interface CategorySpending {
  categoryId: number;
  categoryName: string;
  categoryIcon: string | null;
  categoryColor: string | null;
  totalAmount: number;
  percentage: number;
}

export interface MonthlyTrend {
  month: string;
  income: number;
  expense: number;
  net: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  fill?: string;
}

export interface IncomeExpenseComparison {
  period: string;
  income: number;
  expense: number;
}
