import { useCategories } from "../hooks/useCategories";
import { CategoryCard } from "./CategoryCard";
import { Skeleton } from "@/components/ui/skeleton";

interface CategoryListProps {
  type?: "expense" | "income";
}

export function CategoryList({ type }: CategoryListProps) {
  const { data: categories, isLoading, isError } = useCategories(type);

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Failed to load categories. Please try again.</p>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <span className="text-3xl">📁</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">No categories yet</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Create your first category to start organizing your{" "}
          {type === "income" ? "income" : "expenses"}.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
