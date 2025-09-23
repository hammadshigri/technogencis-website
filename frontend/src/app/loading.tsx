export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900 dark:text-white">
            Loading...
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Please wait while we prepare everything for you
          </p>
        </div>

        {/* Skeleton content */}
        <div className="w-full max-w-md space-y-3 mt-8">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    </div>
  );
}
