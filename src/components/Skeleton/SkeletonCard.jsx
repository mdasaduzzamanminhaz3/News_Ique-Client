
const SkeletonCard = () => {
    return (
    <div className="bg-white border border-gray-100 rounded my-2 mx-3 p-2 shadow-sm animate-pulse">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 space-y-3 py-1">
          {/* Headline Skeleton */}
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
        {/* Image Skeleton */}
        <div className="rounded bg-gray-200 w-full sm:w-32 h-32"></div>
      </div>
      <div className="mt-4 space-y-2">
        {/* Body Text Skeleton */}
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        {/* Date Skeleton */}
        <div className="h-3 bg-gray-200 rounded w-1/4 mt-2"></div>
      </div>
    </div>
    );
};

export default SkeletonCard;