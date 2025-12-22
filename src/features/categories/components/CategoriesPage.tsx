import { useState } from "react";
import { CreateCategoryDialog } from "./CreateCategoryDialog";
import { CategoryList } from "./CategoryList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CategoriesPage() {
  const [activeTab, setActiveTab] = useState<"expense" | "income">("expense");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">
            Organize your expenses and income with custom categories
          </p>
        </div>
        <CreateCategoryDialog />
      </div>

      {/* Tabs for Expense/Income */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "expense" | "income")}
      >
        <TabsList>
          <TabsTrigger value="expense">Expenses</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
        </TabsList>

        <TabsContent value="expense" className="mt-6">
          <CategoryList type="expense" />
        </TabsContent>

        <TabsContent value="income" className="mt-6">
          <CategoryList type="income" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

