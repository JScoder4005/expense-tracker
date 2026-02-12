import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCreateExpense } from "../hooks/useExpenses";
import { useCategories } from "@/features/categories/hooks/useCategories";
import {
  createExpenseSchema,
  type CreateExpenseFormData,
} from "../schemas/expenseSchemas";
import { cn } from "@/lib/utils";

export function CreateExpenseDialog() {
  const [open, setOpen] = useState(false);
  const createExpenseMutation = useCreateExpense();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const form = useForm<CreateExpenseFormData>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      amount: 0,
      description: "",
      type: "expense",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const selectedType = form.watch("type");

  // Memoized filtered categories to prevent recalculation on every render
  const filteredCategories = useMemo(() => {
    if (!categories) return [];
    return categories.filter((cat) => cat.type === selectedType);
  }, [categories, selectedType]);

  // Memoized callbacks to prevent function recreation
  const handleSuccess = useCallback(() => {
    setOpen(false);
    form.reset();
  }, [form]);

  const onSubmit = useCallback((data: CreateExpenseFormData) => {
    createExpenseMutation.mutate(
      {
        ...data,
        categoryId: Number(data.categoryId),
      },
      {
        onSuccess: handleSuccess,
      }
    );
  }, [createExpenseMutation, handleSuccess]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
          <Plus className="mr-2 h-4 w-4" />
          Add {selectedType === "expense" ? "Expense" : "Income"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            Add {selectedType === "expense" ? "Expense" : "Income"}
          </DialogTitle>
          <DialogDescription>
            Track your {selectedType === "expense" ? "spending" : "earnings"} by
            adding a new transaction.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Type */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="expense">💸 Expense</SelectItem>
                      <SelectItem value="income">💰 Income</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium transition-colors duration-200 group-focus-within:text-foreground">
                        ₹
                      </span>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="pl-8 transition-all duration-200 focus:scale-[1.02]"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        aria-label="Transaction amount"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        selectedType === "expense"
                          ? "e.g., Grocery shopping"
                          : "e.g., Freelance project"
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoriesLoading ? (
                        <SelectItem value="loading" disabled>
                          Loading categories...
                        </SelectItem>
                      ) : filteredCategories && filteredCategories.length > 0 ? (
                        filteredCategories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.icon} {category.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          No categories available. Create one first!
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal transition-all duration-200 hover:bg-accent",
                            !field.value && "text-muted-foreground"
                          )}
                          aria-label="Select transaction date"
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50 transition-transform duration-200 group-hover:scale-110" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) =>
                          field.onChange(
                            date ? date.toISOString().split("T")[0] : ""
                          )
                        }
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={createExpenseMutation.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={createExpenseMutation.isPending}>
                {createExpenseMutation.isPending
                  ? "Adding..."
                  : `Add ${selectedType === "expense" ? "Expense" : "Income"}`}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
