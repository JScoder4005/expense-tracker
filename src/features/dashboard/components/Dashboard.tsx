import { useAuth } from '@/features/auth/context/AuthContext';
import { Wallet, TrendingUp, TrendingDown, PieChart, Loader2 } from 'lucide-react';
import { StatCard } from './StatCard';
import { useDashboardSummary } from '@/features/analytics/hooks/useAnalytics';

export const Dashboard = () => {
  const { user } = useAuth();
  const { data: summary, isLoading, error } = useDashboardSummary();

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Format percentage change
  const formatChange = (value?: number) => {
    if (!value) return '+0.0%';
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome back, {user?.email?.split('@')[0]}! 👋
          </h2>
          <p className="text-muted-foreground">
            Unable to load dashboard data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const statsData = [
    {
      title: 'Total Balance',
      value: formatCurrency(summary?.balance || 0),
      change: formatChange(summary?.comparison?.incomeChange),
      trend: (summary?.balance || 0) >= 0 ? 'up' as const : 'down' as const,
      icon: Wallet,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Total Income',
      value: formatCurrency(summary?.totalIncome || 0),
      change: formatChange(summary?.comparison?.incomeChange),
      trend: (summary?.comparison?.incomeChange || 0) >= 0 ? 'up' as const : 'down' as const,
      icon: TrendingUp,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(summary?.totalExpenses || 0),
      change: formatChange(summary?.comparison?.expenseChange),
      trend: (summary?.comparison?.expenseChange || 0) >= 0 ? 'up' as const : 'down' as const,
      icon: TrendingDown,
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'Savings',
      value: formatCurrency(summary?.savings || 0),
      change: formatChange(summary?.comparison ? 
        ((summary.savings - (summary.comparison.income - summary.comparison.expenses)) / 
        (summary.comparison.income - summary.comparison.expenses)) * 100 : 0),
      trend: (summary?.savings || 0) >= 0 ? 'up' as const : 'down' as const,
      icon: PieChart,
      gradient: 'from-blue-500 to-cyan-500',
    },
  ];

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.email?.split('@')[0]}! 👋
        </h2>
        <p className="text-muted-foreground">
          Here's what's happening with your money today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <StatCard key={stat.title} {...stat} index={index} />
        ))}
      </div>
    </div>
  );
};
