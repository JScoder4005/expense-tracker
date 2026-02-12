import { useMemo, useCallback } from 'react';
import type { Category } from '@/features/categories/types/category.types';

/**
 * Custom hook to filter categories by type
 * Memoized to prevent unnecessary recalculations
 */
export const useFilteredCategories = (
  categories: Category[] | undefined,
  type: 'income' | 'expense'
) => {
  return useMemo(() => {
    if (!categories) return [];
    return categories.filter((cat) => cat.type === type);
  }, [categories, type]);
};

/**
 * Custom hook for form submission with optimized callbacks
 */
export const useFormSubmit = (
  mutation: any,
  onSuccess?: () => void
) => {
  return useCallback(
    (data: any) => {
      mutation.mutate(data, {
        onSuccess: () => {
          onSuccess?.();
        },
      });
    },
    [mutation, onSuccess]
  );
};
