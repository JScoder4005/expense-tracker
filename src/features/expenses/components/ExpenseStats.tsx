import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useExpenses } from '../hooks/useExpenses';

export function ExpenseStats() {
  const { data: expenses } = useExpenses();

  if (!expenses || expenses.length === 0) return null;

  const totalIncome = expenses
    .filter((e) => e.type === 'income')
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpense = expenses
    .filter((e) => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0);

  const balance = totalIncome - totalExpense;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const stats = [
    {
      label: 'Total Income',
      value: formatCurrency(totalIncome),
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950',
    },
    {
      label: 'Total Expenses',
      value: formatCurrency(totalExpense),
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950',
    },
    {
      label: 'Balance',
      value: formatCurrency(balance),
      icon: Wallet,
      color: balance >= 0 ? 'text-blue-600' : 'text-red-600',
      bgColor: balance >= 0 ? 'bg-blue-50 dark:bg-blue-950' : 'bg-red-50 dark:bg-red-950',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={stat.label}
            className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            style={{
              animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
            }}
          >
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
                    {stat.label}
                  </p>
                  <p className={`text-2xl font-bold ${stat.color} transition-transform duration-200 group-hover:scale-105`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`rounded-full p-3 ${stat.bgColor} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              
              {/* Progress Bar Animation */}
              <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-linear-to-r ${
                    stat.label === 'Total Income' 
                      ? 'from-green-400 to-green-600' 
                      : stat.label === 'Total Expenses'
                      ? 'from-red-400 to-red-600'
                      : 'from-blue-400 to-blue-600'
                  } transition-all duration-1000 ease-out`}
                  style={{
                    width: '100%',
                    animation: `expandWidth 1s ease-out ${index * 0.2}s both`
                  }}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
      
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes expandWidth {
            from {
              width: 0%;
            }
            to {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
}
