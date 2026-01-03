
const PlanCardSkeleton = () => {
    return (
<div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-2 border-gray-100 dark:border-gray-700 animate-pulse">
      <div className="flex items-center justify-center mb-6">
        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full mr-2"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
      </div>
      
      <div className="flex flex-col items-center mb-8">
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
      </div>

      <div className="space-y-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center">
            <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full mr-2 flex-shrink-0"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          </div>
        ))}
      </div>

      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
    </div>
    );
};

export default PlanCardSkeleton;