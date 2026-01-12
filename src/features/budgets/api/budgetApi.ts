import { axiosInstance } from '@/lib/axios';
import type { Budget, BudgetProgress, CreateBudgetData, UpdateBudgetData } from '../types/budget.types';

// Create budget
export const createBudget = async (data: CreateBudgetData): Promise<Budget> => {
  const response = await axiosInstance.post('/budgets', data);
  return response.data;
};

// Get all budgets
export const getAllBudgets = async (): Promise<Budget[]> => {
  const response = await axiosInstance.get('/budgets');
  return response.data;
};

// Get budget by ID
export const getBudgetById = async (id: number): Promise<Budget> => {
  const response = await axiosInstance.get(`/budgets/${id}`);
  return response.data;
};

// Get budget progress
export const getBudgetProgress = async (id: number): Promise<BudgetProgress> => {
  const response = await axiosInstance.get(`/budgets/${id}/progress`);
  return response.data;
};

// Update budget
export const updateBudget = async (id: number, data: UpdateBudgetData): Promise<Budget> => {
  const response = await axiosInstance.put(`/budgets/${id}`, data);
  return response.data;
};

// Delete budget
export const deleteBudget = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/budgets/${id}`);
};
