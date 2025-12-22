import { axiosInstance } from "@/lib/axios";
import type { Category, CreateCategoryRequest } from "../types/category.types";

/**
 * Create a new category
 */
export const createCategory = async (
  data: CreateCategoryRequest
): Promise<Category> => {
  const response = await axiosInstance.post<Category>("/categories", data);
  return response.data;
};

/**
 * Get all categories with optional type filter
 */
export const getAllCategories = async (type?: string): Promise<Category[]> => {
  const params = type ? `?type=${type}` : "";
  const response = await axiosInstance.get<Category[]>(`/categories${params}`);
  return response.data;
};

/**
 * Delete a category
 */
export const deleteCategory = async (
  id: number
): Promise<{ message: string }> => {
  const response = await axiosInstance.delete<{ message: string }>(
    `/categories/${id}`
  );
  return response.data;
};
