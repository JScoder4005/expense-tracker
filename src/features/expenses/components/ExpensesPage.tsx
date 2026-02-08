import { CreateExpenseDialog } from "./CreateExpenseDialog";
import { ExportButton } from "./ExportButton";
import { ExpenseList } from "./ExpenseList";
import { ExpenseStats } from "./ExpenseStats";

export function ExpensesPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold tracking-tight bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Expenses
            </h2>
            <span className="px-2.5 py-0.5 text-xs font-semibold bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-sm">
              New
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            Manage and track all your expenses with ease
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
