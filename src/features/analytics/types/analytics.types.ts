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
  expenses: number; // Alternative name for backend compatibility
  net: number;
  savings: number; // Alternative name for backend compatibility
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

// Backend API response types
export interface DashboardSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  savings: number;
  transactionCount: number;
  categoryBreakdown: CategoryBreakdownItem[];
  comparison?: {
    income: number;
    expenses: number;
    incomeChange: number;
    expenseChange: number;
  };
}

export interface CategoryBreakdownItem {
  category: string;
  categoryId: number;
  color?: string;
  icon?: string;
  amount: number;
  count: number;
  type: string;
}

export interface CategoryChartData {
  name: string;
  categoryId: number;
  value: number;
  count: number;
  color: string;
  icon?: string;
}

export interface TopCategory {
  categoryId: number;
  name: string;
  color?: string;
  icon?: string;
  total: number;
  count: number;
}

export interface AnalyticsQueryParams {
  startDate?: string;
  endDate?: string;
  type?: 'expense' | 'income';
  months?: number;
  limit?: number;
}
