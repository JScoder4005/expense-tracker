export const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="relative">
      <div className="h-16 w-16 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
      <div className="absolute top-0 h-16 w-16 rounded-full border-4 border-t-purple-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
    </div>
  </div>
);

export const LoadingSkeleton = () => (
  <div className="space-y-4 p-6 animate-pulse">
    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
    </div>
  </div>
);
