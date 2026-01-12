import { Loader2, Wallet } from 'lucide-react';
import { BudgetCard } from './BudgetCard';
import { CreateBudgetDialog } from './CreateBudgetDialog';
import { useBudgets } from '../hooks/useBudgets';
import { Card, CardContent } from '@/components/ui/card';

export function BudgetsPage() {
  const { data: budgets, isLoading } = useBudgets();

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Budgets</h2>
          <p className="text-muted-foreground">
            Set and track spending limits for better financial control
          </p>
        </div>
        <CreateBudgetDialog />
      </div>

      {/* Budgets Grid */}
      {budgets && budgets.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {budgets.map((budget) => (
            <BudgetCard key={budget.id} budgetId={budget.id} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Wallet className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No budgets yet</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
              Create your first budget to start tracking your spending and stay on top of your
              financial goals
            </p>
            <CreateBudgetDialog />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
