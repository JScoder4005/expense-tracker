import { CreateExpenseDialog } from "./CreateExpenseDialog";

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
        <CreateExpenseDialog />
      </div>

      {/* Coming soon: Expense list will go here */}
      <div className="rounded-lg border bg-card p-8 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="mx-auto max-w-md space-y-4 animate-fadeIn">
          <div className="mx-auto h-12 w-12 rounded-full bg-linear-to-br from-purple-100 to-pink-100 flex items-center justify-center transition-transform duration-300 hover:scale-110">
            <svg
              className="h-6 w-6 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold">Click "Add Expense" to get started</h3>
          <p className="text-sm text-muted-foreground">
            Start tracking your expenses by adding your first transaction
          </p>
        </div>
      </div>
    </div>
  );
}

