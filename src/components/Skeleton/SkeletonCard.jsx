const SkeletonCard = () => {
  return (
    <div className="relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] my-4 mx-2 p-6 shadow-2xl animate-pulse group">
      
      {/* Decorative Glow inside Skeleton */}
      <div className="absolute -top-10 -left-10 w-24 h-24 bg-blue-500/10 blur-2xl rounded-full"></div>

      <div className="flex flex-col md:flex-row gap-6 relative z-10">
        
        {/* Text Content Skeleton */}
        <div className="flex-1 space-y-4">
          {/* Category/Badge Skeleton */}
          <div className="h-3 bg-blue-500/20 rounded-full w-20 mb-2"></div>
          
          {/* Headline Skeleton */}
          <div className="space-y-2">
            <div className="h-6 bg-white/10 rounded-xl w-full"></div>
            <div className="h-6 bg-white/10 rounded-xl w-[85%]"></div>
          </div>

          {/* Body/Excerpt Skeleton */}
          <div className="pt-2 space-y-2">
            <div className="h-3 bg-white/5 rounded-lg w-full"></div>
            <div className="h-3 bg-white/5 rounded-lg w-[90%]"></div>
            <div className="h-3 bg-white/5 rounded-lg w-[70%]"></div>
          </div>
        </div>

        {/* Image/Thumbnail Skeleton */}
        <div className="relative w-full md:w-44 h-44 shrink-0">
          <div className="w-full h-full bg-white/10 rounded-3xl border border-white/5"></div>
          {/* Shimmer overlay for image area */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>
        </div>
      </div>

      {/* Footer (Date & Author) Skeleton */}
      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/10 rounded-full"></div> {/* Avatar */}
          <div className="h-3 bg-white/10 rounded-lg w-24"></div> {/* Name */}
        </div>
        <div className="h-3 bg-white/5 rounded-lg w-16"></div> {/* Date */}
      </div>

      {/* Shimmer Effect Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full animate-[shimmer_2.5s_infinite]"></div>
    </div>
  );
};

export default SkeletonCard;