import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, AlertTriangle } from 'lucide-react';
import type { BudgetProgress } from '../types/budget.types';
import { useBudgetProgress, useDeleteBudget } from '../hooks/useBudgets';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface BudgetCardProps {
  budgetId: number;
  onEdit?: () => void;
}

export function BudgetCard({ budgetId, onEdit }: BudgetCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { data: progress, isLoading } = useBudgetProgress(budgetId);
  const deleteBudgetMutation = useDeleteBudget();

  const handleDelete = () => {
    deleteBudgetMutation.mutate(budgetId);
    setShowDeleteDialog(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPeriodLabel = (period: string) => {
    return period.charAt(0).toUpperCase() + period.slice(1);
  };

  if (isLoading || !progress) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 w-32 bg-muted animate-pulse rounded" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-2 bg-muted animate-pulse rounded" />
            <div className="h-4 w-24 bg-muted animate-pulse rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const { budget, spent, remaining, percentage } = progress;
  const isOverBudget = percentage > 100;
  const isNearLimit = percentage >= 80 && percentage <= 100;

  return (
    <>
      <Card className={`transition-all duration-200 hover:shadow-lg ${isOverBudget ? 'border-red-500' : isNearLimit ? 'border-yellow-500' : ''}`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2">
                {budget.category && budget.category.icon && (
                  <span className="text-2xl">{budget.category.icon}</span>
                )}
                {budget.name}
              </CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{getPeriodLabel(budget.period)}</Badge>
                {budget.category && (
                  <Badge
                    variant="secondary"
                    style={{
                      backgroundColor: `${budget.category.color}20`,
                      color: budget.category.color || undefined,
                    }}
                  >
                    {budget.category.name}
                  </Badge>
                )}
              </div>
            </div>
            {isOverBudget && (
              <AlertTriangle className="h-5 w-5 text-red-500" />
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Spent</span>
              <span className="font-semibold">{percentage.toFixed(1)}%</span>
            </div>
            <Progress
              value={Math.min(percentage, 100)}
              className="h-2"
              indicatorClassName={
                isOverBudget
                  ? 'bg-red-500'
                  : isNearLimit
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }
            />
            {isOverBudget && (
              <div className="h-2 bg-red-100 dark:bg-red-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 transition-all duration-300"
                  style={{ width: `${Math.min((percentage - 100) * 2, 100)}%` }}
                />
              </div>
            )}
          </div>

          {/* Amount Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Spent</p>
              <p className={`text-lg font-semibold ${isOverBudget ? 'text-red-600' : ''}`}>
                {formatCurrency(spent)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {isOverBudget ? 'Over by' : 'Remaining'}
              </p>
              <p className={`text-lg font-semibold ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                {formatCurrency(Math.abs(remaining))}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Budget Limit</span>
              <span className="font-semibold">{formatCurrency(budget.amount)}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-red-600 hover:text-red-700"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </CardFooter>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Budget</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{budget.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
