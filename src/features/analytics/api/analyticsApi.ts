import { axiosInstance } from '@/lib/axios';
import type {
  DashboardSummary,
  CategoryChartData,
  MonthlyTrend,
  TopCategory,
  AnalyticsQueryParams,
} from '../types/analytics.types';

// Get dashboard summary
export const getDashboardSummary = async (
  params?: Pick<AnalyticsQueryParams, 'startDate' | 'endDate'>
): Promise<DashboardSummary> => {
  const response = await axiosInstance.get('/analytics/summary', { params });
  return response.data;
};

// Get category breakdown for charts
export const getCategoryBreakdown = async (
  params?: Pick<AnalyticsQueryParams, 'startDate' | 'endDate' | 'type'>
): Promise<CategoryChartData[]> => {
  const response = await axiosInstance.get('/analytics/category-breakdown', { params });
  return response.data;
};

// Get monthly trends
export const getMonthlyTrends = async (
  params?: Pick<AnalyticsQueryParams, 'months'>
): Promise<MonthlyTrend[]> => {
  const response = await axiosInstance.get('/analytics/monthly-trends', { params });
  return response.data;
};

// Get top categories
export const getTopCategories = async (
  params?: Pick<AnalyticsQueryParams, 'limit' | 'type'>
): Promise<TopCategory[]> => {
  const response = await axiosInstance.get('/analytics/top-categories', { params });
  return response.data;
};
