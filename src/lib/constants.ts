// Application Constants

/**
 * Color palette for category selection
 * Carefully curated colors for visual distinction
 */
export const CATEGORY_COLORS = [
  "#ef4444", // Red
  "#f97316", // Orange
  "#f59e0b", // Amber
  "#eab308", // Yellow
  "#84cc16", // Lime
  "#22c55e", // Green
  "#10b981", // Emerald
  "#14b8a6", // Teal
  "#06b6d4", // Cyan
  "#0ea5e9", // Sky
  "#3b82f6", // Blue
  "#6366f1", // Indigo
  "#8b5cf6", // Violet
  "#a855f7", // Purple
  "#d946ef", // Fuchsia
  "#ec4899", // Pink
] as const;

/**
 * Default category icons for common expense/income types
 */
export const DEFAULT_CATEGORY_ICONS = {
  // Expense categories
  groceries: "🛒",
  food: "🍔",
  transport: "🚗",
  entertainment: "🎬",
  shopping: "🛍️",
  bills: "📄",
  health: "🏥",
  education: "📚",
  travel: "✈️",
  other: "📁",
  
  // Income categories
  salary: "💰",
  freelance: "💼",
  investment: "📈",
  gift: "🎁",
  bonus: "🎉",
} as const;

/**
 * Date format constants
 */
export const DATE_FORMATS = {
  display: "MMM dd, yyyy",
  displayWithTime: "MMM dd, yyyy HH:mm",
  input: "yyyy-MM-dd",
  monthYear: "MMMM yyyy",
  shortDate: "MM/dd/yy",
} as const;

/**
 * API configuration
 */
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  timeout: 30000, // 30 seconds
  retries: 3,
} as const;

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  theme: "expense-tracker-theme",
  sidebarState: "expense-tracker-sidebar",
  recentCategories: "expense-tracker-recent-categories",
} as const;

/**
 * Chart colors for analytics
 */
export const CHART_COLORS = {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  accent: "hsl(var(--accent))",
  success: "#22c55e",
  warning: "#f59e0b",
  danger: "#ef4444",
  info: "#3b82f6",
} as const;

/**
 * Pagination defaults
 */
export const PAGINATION = {
  defaultPageSize: 20,
  pageSizeOptions: [10, 20, 50, 100],
} as const;

/**
 * Transaction type definitions
 */
export const TRANSACTION_TYPES = {
  expense: "expense",
  income: "income",
} as const;

/**
 * Currency configuration
 */
export const CURRENCY = {
  code: "INR",
  symbol: "₹",
  locale: "en-IN",
} as const;
