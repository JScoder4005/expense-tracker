import { useQuery } from '@tanstack/react-query';
import {
  getDashboardSummary,
  getCategoryBreakdown,
  getMonthlyTrends,
  getTopCategories,
} from '../api/analyticsApi';
import type { AnalyticsQueryParams } from '../types/analytics.types';

// Hook for dashboard summary
export const useDashboardSummary = (
  params?: Pick<AnalyticsQueryParams, 'startDate' | 'endDate'>
) => {
  return useQuery({
    queryKey: ['analytics', 'summary', params],
    queryFn: () => getDashboardSummary(params),
  });
};

// Hook for category breakdown
export const useCategoryBreakdown = (
  params?: Pick<AnalyticsQueryParams, 'startDate' | 'endDate' | 'type'>
) => {
  return useQuery({
    queryKey: ['analytics', 'category-breakdown', params],
    queryFn: () => getCategoryBreakdown(params),
  });
};

// Hook for monthly trends
export const useMonthlyTrends = (
  params?: Pick<AnalyticsQueryParams, 'months'>
) => {
  return useQuery({
    queryKey: ['analytics', 'monthly-trends', params],
    queryFn: () => getMonthlyTrends(params),
  });
};

// Hook for top categories
export const useTopCategories = (
  params?: Pick<AnalyticsQueryParams, 'limit' | 'type'>
) => {
  return useQuery({
    queryKey: ['analytics', 'top-categories', params],
    queryFn: () => getTopCategories(params),
  });
};
