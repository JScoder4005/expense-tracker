import { ArrowDownCircle, ArrowUpCircle, Loader2, Receipt } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useExpenses } from '@/features/expenses/hooks/useExpenses';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function RecentTransactions() {
  const { data: expenses, isLoading } = useExpenses({ limit: 5 } as any);

  const recentExpenses = expenses?.slice(0, 5) ?? [];

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Receipt className="h-4 w-4 text-primary" />
          Recent Transactions
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/expenses" className="text-xs text-muted-foreground hover:text-primary">
            View all →
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="pt-0">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : recentExpenses.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            <Receipt className="h-10 w-10 mx-auto mb-2 opacity-30" />
            No transactions yet. Add your first expense!
          </div>
        ) : (
          <div className="space-y-3">
            {recentExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                {/* Icon */}
                <div className={`p-2 rounded-full shrink-0 ${
                  expense.type === 'income'
                    ? 'bg-green-100 dark:bg-green-900/30'
                    : 'bg-red-100 dark:bg-red-900/30'
                }`}>
                  {expense.type === 'income' ? (
                    <ArrowUpCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <ArrowDownCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  )}
                </div>

                {/* Description & Category */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{expense.description}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      {expense.category?.name ?? 'Uncategorized'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{formatDate(expense.date)}</span>
                  </div>
                </div>

                {/* Amount */}
                <span className={`text-sm font-semibold shrink-0 ${
                  expense.type === 'income'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {expense.type === 'income' ? '+' : '-'}{formatCurrency(expense.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
