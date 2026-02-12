import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LoadingSpinner } from '@/components/LoadingStates';
import { ProtectedRoute } from './ProtectedRoute';

// Lazy load all page components for code splitting
const LoginForm = lazy(() => import('@/features/auth/components/LoginForm').then(m => ({ default: m.LoginForm })));
const RegisterForm = lazy(() => import('@/features/auth/components/RegisterForm').then(m => ({ default: m.RegisterForm })));
const Dashboard = lazy(() => import('@/features/dashboard/components/Dashboard').then(m => ({ default: m.Dashboard })));
const ExpensesPage = lazy(() => import('@/features/expenses/components/ExpensesPage').then(m => ({ default: m.ExpensesPage })));
const CategoriesPage = lazy(() => import('@/features/categories/components/CategoriesPage').then(m => ({ default: m.CategoriesPage })));
const AnalyticsPage = lazy(() => import('@/features/analytics/components/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));
const BudgetsPage = lazy(() => import('@/features/budgets/components/BudgetsPage').then(m => ({ default: m.BudgetsPage })));
const MainLayout = lazy(() => import('@/components/layout/MainLayout').then(m => ({ default: m.MainLayout })));

export const AppRouter = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            
            {/* Protected routes with sidebar */}
            <Route
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/expenses" element={<ExpensesPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/budgets" element={<BudgetsPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
