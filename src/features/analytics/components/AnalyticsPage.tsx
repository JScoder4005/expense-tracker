import { useState } from 'react';
import { Loader2, Calendar } from 'lucide-react';
import { CategoryPieChart } from './CategoryPieChart';
import { MonthlyTrendsChart } from './MonthlyTrendsChart';
import { ExpenseIncomeBarChart } from './ExpenseIncomeBarChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  useCategoryBreakdown,
  useMonthlyTrends,
  useTopCategories,
} from '../hooks/useAnalytics';

export function AnalyticsPage() {
  const [expenseType, setExpenseType] = useState<'expense' | 'income'>('expense');
  const [monthsToShow, setMonthsToShow] = useState(6);

  const { data: categoryData, isLoading: categoryLoading } = useCategoryBreakdown({
    type: expenseType,
  });

  const { data: monthlyData, isLoading: monthlyLoading } = useMonthlyTrends({
    months: monthsToShow,
  });

  const { data: topCategories, isLoading: topLoading } = useTopCategories({
    limit: 5,
    type: expenseType,
  });

  const isLoading = categoryLoading || monthlyLoading || topLoading;

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Visualize your spending patterns and trends
          </p>
        </div>
        
        {/* Time Period Selector */}
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div className="flex gap-1">
            {[3, 6, 12].map((months) => (
              <Button
                key={months}
                variant={monthsToShow === months ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMonthsToShow(months)}
              >
                {months}M
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs for Expense/Income */}
      <Tabs value={expenseType} onValueChange={(v) => setExpenseType(v as 'expense' | 'income')}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="expense">Expenses</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
        </TabsList>

        <TabsContent value={expenseType} className="space-y-6 mt-6">
          {/* Top Categories Card */}
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Categories</CardTitle>
              <CardDescription>
                Your highest {expenseType === 'expense' ? 'spending' : 'earning'} categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              {topCategories && topCategories.length > 0 ? (
                <div className="space-y-4">
                  {topCategories.map((category, index) => (
                    <div key={category.categoryId} className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg font-bold text-lg"
                        style={{ backgroundColor: category.color || '#8884d8', color: 'white' }}>
                        {index + 1}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium leading-none">
                            {category.icon} {category.name}
                          </p>
                          <p className="font-semibold">{formatCurrency(category.total)}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {category.count} transaction{category.count > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No {expenseType} data available
                </div>
              )}
            </CardContent>
          </Card>

          {/* Charts Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Category Pie Chart */}
            <CategoryPieChart
              data={categoryData || []}
              title="Category Breakdown"
              description={`${expenseType === 'expense' ? 'Spending' : 'Income'} distribution by category`}
            />

            {/* Monthly Trends Line Chart - Spans 2 columns on md+ */}
            <div className="md:col-span-2">
              <MonthlyTrendsChart
                data={monthlyData || []}
                title={`${monthsToShow} Month Trends`}
                description="Track your income, expenses, and savings over time"
              />
            </div>

            {/* Expense vs Income Bar Chart - Spans 2 columns on md+ */}
            <div className="md:col-span-2">
              <ExpenseIncomeBarChart
                data={monthlyData || []}
                title="Income vs Expenses Comparison"
                description="Monthly comparison of income and expenses"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Empty State - only shown if no data at all */}
      {!monthlyData?.length && !categoryData?.length && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <svg
                className="h-6 w-6 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">No data to analyze yet</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              Start adding expenses and income to see detailed analytics and insights about your financial habits
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
