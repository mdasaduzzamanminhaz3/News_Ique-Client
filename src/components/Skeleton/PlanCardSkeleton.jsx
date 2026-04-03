const PlanCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 shadow-2xl animate-pulse">
      
      {/* Plan Icon & Title Skeleton */}
      <div className="flex items-center justify-center mb-8">
        <div className="w-10 h-10 bg-white/10 rounded-2xl mr-3"></div>
        <div className="h-6 bg-white/10 rounded-xl w-32"></div>
      </div>
      
      {/* Price Skeleton */}
      <div className="flex flex-col items-center mb-10">
        <div className="h-12 bg-white/20 rounded-2xl w-40 mb-3"></div>
        <div className="h-4 bg-white/10 rounded-lg w-20"></div>
      </div>

      {/* Features List Skeleton */}
      <div className="space-y-6 mb-10">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center px-2">
            <div className="w-5 h-5 bg-blue-500/20 rounded-lg mr-4 flex-shrink-0"></div>
            <div className="h-3.5 bg-white/5 rounded-lg w-full"></div>
          </div>
        ))}
      </div>

      {/* Action Button Skeleton */}
      <div className="h-14 bg-white/10 rounded-2xl w-full relative overflow-hidden">
        {/* Subtle Shine Effect Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
      </div>

      {/* Decorative Blur Inside Skeleton */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full"></div>
    </div>
  );
};

export default PlanCardSkeleton;