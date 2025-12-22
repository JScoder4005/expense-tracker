import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} from "../api/expenseApi";
import type {
  CreateExpenseRequest,
  UpdateExpenseRequest,
  ExpenseFilters,
} from "../types/expense.types";

/**
 * Hook to fetch all expenses with optional filters
 */
export const useExpenses = (filters?: ExpenseFilters) => {
  return useQuery({
    queryKey: ["expenses", filters],
    queryFn: () => getAllExpenses(filters),
  });
};

/**
 * Hook to fetch a single expense by ID
 */
export const useExpense = (id: number) => {
  return useQuery({
    queryKey: ["expense", id],
    queryFn: () => getExpenseById(id),
    enabled: !!id,
  });
};

/**
 * Hook to create a new expense
 */
export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateExpenseRequest) => createExpense(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success("Expense created successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create expense");
    },
  });
};

/**
 * Hook to update an expense
 */
export const useUpdateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateExpenseRequest }) =>
      updateExpense(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["expense", variables.id] });
      toast.success("Expense updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update expense");
    },
  });
};

/**
 * Hook to delete an expense
 */
export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteExpense(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success("Expense deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete expense");
    },
  });
};
