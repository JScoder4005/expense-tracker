import { useAuth } from '@/features/auth/context/AuthContext';
import { Wallet, TrendingUp, TrendingDown, PieChart } from 'lucide-react';
import { StatCard } from './StatCard';

const statsData = [
  {
    title: 'Total Balance',
    value: '$12,345.00',
    change: '+12.5%',
    trend: 'up' as const,
    icon: Wallet,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Total Income',
    value: '$8,450.00',
    change: '+8.2%',
    trend: 'up' as const,
    icon: TrendingUp,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Total Expenses',
    value: '$3,210.00',
    change: '-3.1%',
    trend: 'down' as const,
    icon: TrendingDown,
    gradient: 'from-orange-500 to-red-500',
  },
  {
    title: 'Savings',
    value: '$5,235.00',
    change: '+15.3%',
    trend: 'up' as const,
    icon: PieChart,
    gradient: 'from-blue-500 to-cyan-500',
  },
];

export const Dashboard = () => {
  const { user } = useAuth();

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
