import React from 'react';

const BreakingNewsTicker = ({ headlines }) => {
  if (!headlines || headlines.length === 0) return null;

  return (
    <div className="relative max-w-screen-xl mx-auto my-4 px-4 overflow-hidden group">
      {/* 3D Glassmorphism Container */}
      <div className="relative flex items-center bg-gray-900/90 dark:bg-black/80 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl overflow-hidden h-12">
        
        {/* Label: Animated "Breaking News" with Slanted Shape */}
        <div className="relative z-10 flex items-center bg-gradient-to-r from-red-600 to-red-800 px-6 h-full shadow-[5px_0_15px_rgba(220,38,38,0.5)] transform -skew-x-12 -ml-2">
          <div className="flex items-center gap-2 transform skew-x-12 animate-pulse">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span className="text-white font-black uppercase italic tracking-tighter text-sm md:text-base whitespace-nowrap">
              Breaking News
            </span>
          </div>
        </div>

        {/* Ticker Content */}
        <div className="flex-1 overflow-hidden h-full flex items-center">
          <div className="animate-marquee whitespace-nowrap flex items-center group-hover:pause">
            {/* Double the headlines to make the loop seamless */}
            {[...headlines, ...headlines].map((headline, index) => (
              <div key={index} className="inline-flex items-center mx-8">
                <span className="text-blue-400 font-bold mr-3 text-lg">✦</span>
                <span className="text-gray-100 font-medium text-sm md:text-base font-serif hover:text-red-400 transition-colors cursor-pointer">
                  {headline}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Gradient Overlay (Right side fade) */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-900 dark:from-black to-transparent z-10 pointer-events-none"></div>
      </div>

      {/* Decorative 3D Shadow/Reflection below */}
      <div className="absolute -bottom-1 left-10 right-10 h-[2px] bg-red-600/30 blur-sm"></div>
    </div>
  );
};

export default BreakingNewsTicker;