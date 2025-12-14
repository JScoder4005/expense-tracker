export function ExpensesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Expenses</h2>
        <p className="text-muted-foreground">
          Manage and track all your expenses
        </p>
      </div>

      <div className="rounded-lg border bg-card p-8 text-center">
        <div className="mx-auto max-w-md space-y-4">
          <div className="mx-auto h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
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
          <h3 className="text-lg font-semibold">No expenses yet</h3>
          <p className="text-sm text-muted-foreground">
            Start tracking your expenses by adding your first transaction
          </p>
          <button className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
}
