import type { Category } from "../types/category.types";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteCategory } from "../hooks/useCategories";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const deleteCategoryMutation = useDeleteCategory();

  const handleDelete = () => {
    deleteCategoryMutation.mutate(category.id);
  };

  return (
    <div
      className="group relative overflow-hidden rounded-xl border p-6 transition-all hover:shadow-lg"
      style={{
        borderColor: category.color || "#6366f1",
        backgroundColor: `${category.color || "#6366f1"}05`,
      }}
    >
      {/* Delete Button */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the "{category.name}" category? This action cannot be
              undone. Categories with associated expenses cannot be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Category Content */}
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className="flex h-16 w-16 items-center justify-center rounded-xl text-4xl transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${category.color || "#6366f1"}20` }}
        >
          {category.icon || "📁"}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg truncate">{category.name}</h3>
          <p className="text-sm text-muted-foreground capitalize mt-1">
            {category.type}
          </p>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${category.color || "#6366f1"} 0%, transparent 100%)`,
        }}
      />
    </div>
  );
}
