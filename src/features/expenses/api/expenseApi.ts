import { axiosInstance } from "@/lib/axios";
import type {
  Expense,
  CreateExpenseRequest,
  UpdateExpenseRequest,
  ExpenseFilters,
} from "../types/expense.types";

/**
 * Create a new expense
 */
export const createExpense = async (
  data: CreateExpenseRequest
): Promise<Expense> => {
  const response = await axiosInstance.post<Expense>("/expenses", data);
  return response.data;
};

/**
 * Get all expenses with optional filters
 */
export const getAllExpenses = async (
  filters?: ExpenseFilters
): Promise<Expense[]> => {
  const params = new URLSearchParams();

  if (filters?.startDate) params.append("startDate", filters.startDate);
  if (filters?.endDate) params.append("endDate", filters.endDate);
  if (filters?.categoryId)
    params.append("categoryId", filters.categoryId.toString());
  if (filters?.type) params.append("type", filters.type);

  const response = await axiosInstance.get<Expense[]>(
    `/expenses${params.toString() ? `?${params.toString()}` :""}`
  );
  return response.data;
};

/**
 * Get  expense by ID
 */
export const getExpenseById = async (id: number): Promise<Expense> => {
  const response = await axiosInstance.get<Expense>(`/expenses/${id}`);
  return response.data;
};

/**
 * Update an expense
 */
export const updateExpense = async (
  id: number,
  data: UpdateExpenseRequest
): Promise<Expense> => {
  const response = await axiosInstance.put<Expense>(`/expenses/${id}`, data);
  return response.data;
};

/**
 * Delete an expense
 */
export const deleteExpense = async (id: number): Promise<{ message: string }> => {
  const response = await axiosInstance.delete<{ message: string }>(
    `/expenses/${id}`
  );
  return response.data;
};
