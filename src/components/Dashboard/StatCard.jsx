const StatCard = ({ icon: Icon, title, value, color = "blue" }) => {
  // Dynamic color mapping for different stats
  const colorMap = {
    blue: "text-blue-500 bg-blue-500/20 shadow-blue-500/20",
    purple: "text-purple-500 bg-purple-500/20 shadow-purple-500/20",
    green: "text-green-500 bg-green-500/20 shadow-green-500/20",
    orange: "text-orange-500 bg-orange-500/20 shadow-orange-500/20",
  };

  const selectedColor = colorMap[color] || colorMap.blue;

  return (
    <div className="group relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 transition-all duration-500 hover:bg-white/10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
      
      {/* Background Decorative Glow */}
      <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity ${selectedColor.split(' ')[2]}`}></div>

      <div className="relative z-10 flex flex-col gap-4">
        {/* Icon & Title Row */}
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-2xl transition-transform duration-500 group-hover:rotate-12 ${selectedColor.split(' ').slice(1, 2).join(' ')}`}>
            <Icon className={`h-6 w-6 ${selectedColor.split(' ')[0]}`} />
          </div>
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.15em] transition-colors group-hover:text-white">
            {title}
          </h3>
        </div>

        {/* Value Row */}
        <div className="flex items-end justify-between mt-2">
          <p className="text-4xl font-black text-white tracking-tighter group-hover:scale-105 transition-transform origin-left duration-500">
            {value}
          </p>
          
          {/* Sparkline Effect (Optional Decorative Element) */}
          <div className="h-8 w-16 opacity-30 group-hover:opacity-100 transition-opacity flex items-end gap-1">
             <div className="w-1 h-[40%] bg-blue-500 rounded-full animate-pulse"></div>
             <div className="w-1 h-[70%] bg-blue-400 rounded-full animate-pulse delay-75"></div>
             <div className="w-1 h-[50%] bg-blue-300 rounded-full animate-pulse delay-150"></div>
             <div className="w-1 h-[90%] bg-blue-600 rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;