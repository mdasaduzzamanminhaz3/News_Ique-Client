
const StatCardSkeleton = () => {
    return (
        
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse">
      <div className="flex items-center space-x-4">
        {/* Icon placeholder */}
        <div className="p-3 bg-gray-200 rounded-lg w-12 h-12"></div>
        <div className="flex-1 space-y-2">
          {/* Title placeholder */}
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          {/* Value placeholder */}
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    </div>
    
    );
};

export default StatCardSkeleton;