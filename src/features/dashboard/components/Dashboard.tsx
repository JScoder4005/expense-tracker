import { useAuth } from '@/features/auth/context/AuthContext';
import { TrendingUp, TrendingDown, Wallet, PieChart, ArrowUpRight, ArrowDownRight, Plus, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const statsData = [
  {
    title: 'Total Balance',
    value: '$12,345.00',
    change: '+12.5%',
    trend: 'up',
    icon: Wallet,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Total Income',
    value: '$8,450.00',
    change: '+8.2%',
    trend: 'up',
    icon: TrendingUp,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Total Expenses',
    value: '$3,210.00',
    change: '-3.1%',
    trend: 'down',
    icon: TrendingDown,
    gradient: 'from-orange-500 to-red-500',
  },
  {
    title: 'Savings',
    value: '$5,235.00',
    change: '+15.3%',
    trend: 'up',
    icon: PieChart,
    gradient: 'from-blue-500 to-cyan-500',
  },
];

const recentTransactions = [
  { id: 1, name: 'Grocery Shopping', amount: -125.50, category: 'Food', date: 'Today', color: 'bg-orange-500' },
  { id: 2, name: 'Salary Deposit', amount: 5000.00, category: 'Income', date: 'Today', color: 'bg-green-500' },
  { id: 3, name: 'Electric Bill', amount: -85.00, category: 'Utilities', date: 'Yesterday', color: 'bg-blue-500' },
  { id: 4, name: 'Restaurant', amount: -45.00, category: 'Food', date: 'Yesterday', color: 'bg-orange-500' },
  { id: 5, name: 'Freelance Work', amount: 750.00, category: 'Income', date: '2 days ago', color: 'bg-green-500' },
];

const quickActions = [
  { label: 'Add Expense', icon: ArrowDownRight, gradient: 'from-red-500 to-pink-500' },
  { label: 'Add Income', icon: ArrowUpRight, gradient: 'from-green-500 to-emerald-500' },
  { label: 'View Reports', icon: PieChart, gradient: 'from-blue-500 to-purple-500' },
  { label: 'Set Budget', icon: DollarSign, gradient: 'from-yellow-500 to-orange-500' },
];

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
          Welcome back, {user?.email?.split('@')[0]}! 👋
        </h2>
        <p className="text-muted-foreground text-lg">
          Here's what's happening with your money today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <Card 
            key={stat.title}
            className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-gray-50"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="flex items-center text-xs">
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="border-0 bg-gradient-to-br from-gray-50 to-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Quick Actions</CardTitle>
          <CardDescription>Manage your finances in one click</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={action.label}
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2 group hover:border-transparent hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className={`p-2 rounded-lg bg-gradient-to-br ${action.gradient} relative z-10`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium relative z-10 group-hover:text-white transition-colors">
                  {action.label}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="border-0 bg-gradient-to-br from-white to-gray-50 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Recent Transactions</CardTitle>
            <CardDescription>Your latest financial activities</CardDescription>
          </div>
          <Button
            variant="ghost"
            className="gap-2 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all"
          >
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-100 transition-all duration-200 group cursor-pointer"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${transaction.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{transaction.name}</p>
                    <p className="text-sm text-gray-500">{transaction.category} • {transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Expense FAB */}
      <button className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center group z-50">
        <Plus className="h-8 w-8 text-white group-hover:rotate-90 transition-transform duration-300" />
      </button>
    </div>
  );
};
