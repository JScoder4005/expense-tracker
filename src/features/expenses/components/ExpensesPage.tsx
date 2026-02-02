import { CreateExpenseDialog } from "./CreateExpenseDialog";
import { ExportButton } from "./ExportButton";
import { ExpenseList } from "./ExpenseList";
import { ExpenseStats } from "./ExpenseStats";

export function ExpensesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Expenses</h2>
          <p className="text-muted-foreground">
            Manage and track all your expenses
          </p>
        </div>
        <div className="flex gap-2">
          <ExportButton />
          <CreateExpenseDialog />
        </div>
      </div>

      {/* Quick Stats */}
      <ExpenseStats />

      {/* Expense List */}
      <ExpenseList />
    </div>
  );
}
