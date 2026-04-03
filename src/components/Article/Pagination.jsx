import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  // Jodi page ekta thake tahole pagination dekhabar dorkar nai
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 py-10">
      
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-300 shadow-lg shadow-black/20"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-inner">
        {Array.from({ length: totalPages }, (_, i) => {
          const pageNumber = i + 1;
          const isActive = currentPage === pageNumber;

          return (
            <button
              key={i}
              onClick={() => handlePageChange(pageNumber)}
              className={`
                relative min-w-[40px] h-10 flex items-center justify-center text-sm font-bold rounded-xl transition-all duration-500 overflow-hidden
                ${isActive 
                  ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] scale-110 z-10" 
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
                }
                cursor-pointer
              `}
            >
              {/* Active Indicator Glow */}
              {isActive && (
                <span className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 to-transparent animate-pulse"></span>
              )}
              {pageNumber}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-300 shadow-lg shadow-black/20"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;