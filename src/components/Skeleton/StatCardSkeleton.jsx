const StatCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 shadow-2xl animate-pulse group">
      
      {/* Decorative Glow inside Skeleton */}
      <div className="absolute -top-6 -left-6 w-20 h-20 bg-blue-500/10 blur-2xl rounded-full"></div>

      <div className="flex items-center gap-6 relative z-10">
        {/* Icon Square Placeholder */}
        <div className="shrink-0">
          <div className="w-16 h-16 bg-white/10 rounded-2xl border border-white/5"></div>
        </div>

        {/* Text Content Placeholder */}
        <div className="flex-1 space-y-3">
          {/* Label/Title Placeholder */}
          <div className="h-3 bg-white/5 rounded-lg w-2/3"></div>
          
          {/* Main Stat Value Placeholder */}
          <div className="h-8 bg-white/10 rounded-xl w-1/2"></div>
          
          {/* Trend/Subtext Placeholder */}
          <div className="h-2 bg-white/5 rounded-lg w-1/3 mt-2"></div>
        </div>
      </div>

      {/* Shimmer Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
    </div>
  );
};

export default StatCardSkeleton;