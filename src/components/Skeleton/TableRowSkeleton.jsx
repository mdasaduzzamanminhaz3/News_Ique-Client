const TableRowSkeleton = () => {
  return (
    <tr className="border-b border-white/5 animate-pulse group">
      {/* Author/User Column */}
      <td className="px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/10 rounded-full shrink-0"></div>
          <div className="h-3 bg-white/10 rounded-lg w-24"></div>
        </div>
      </td>

      {/* Rating/Stars Column */}
      <td className="px-8 py-6">
        <div className="flex gap-1.5">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="h-3.5 w-3.5 bg-white/5 rounded-md transform rotate-12"
            ></div>
          ))}
        </div>
      </td>

      {/* Article/Headline Column */}
      <td className="px-8 py-6">
        <div className="space-y-2">
          <div className="h-3 bg-blue-500/10 rounded-lg w-32"></div>
          <div className="h-2 bg-white/5 rounded-lg w-20"></div>
        </div>
      </td>

      {/* Comment/Content Column */}
      <td className="px-8 py-6">
        <div className="space-y-2 max-w-md">
          <div className="h-2.5 bg-white/5 rounded-lg w-full"></div>
          <div className="h-2.5 bg-white/5 rounded-lg w-[80%]"></div>
        </div>
      </td>

      {/* Date Column */}
      <td className="px-8 py-6">
        <div className="h-3 bg-white/10 rounded-lg w-16 ml-auto md:ml-0"></div>
      </td>
    </tr>
  );
};

export default TableRowSkeleton;