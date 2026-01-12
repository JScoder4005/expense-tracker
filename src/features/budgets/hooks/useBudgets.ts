import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllBudgets,
  getBudgetById,
  getBudgetProgress,
  createBudget,
  updateBudget,
  deleteBudget,
} from '../api/budgetApi';
import type { CreateBudgetData, UpdateBudgetData } from '../types/budget.types';
import { toast } from 'sonner';

// Get all budgets
export const useBudgets = () => {
  return useQuery({
    queryKey: ['budgets'],
    queryFn: getAllBudgets,
  });
};

// Get budget by ID
export const useBudget = (id: number) => {
  return useQuery({
    queryKey: ['budgets', id],
    queryFn: () => getBudgetById(id),
    enabled: !!id,
  });
};

// Get budget progress
export const useBudgetProgress = (id: number) => {
  return useQuery({
    queryKey: ['budgets', id, 'progress'],
    queryFn: () => getBudgetProgress(id),
    enabled: !!id,
  });
};

// Create budget
export const useCreateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBudgetData) => createBudget(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      toast.success('Budget created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create budget');
    },
  });
};

// Update budget
export const useUpdateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateBudgetData }) =>
      updateBudget(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      toast.success('Budget updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update budget');
    },
  });
};

// Delete budget
export const useDeleteBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteBudget(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      toast.success('Budget deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete budget');
    },
  });
};
