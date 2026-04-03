import { formatPublishedDate } from "../utils/formatDate";
import { Calendar, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router";

const HeroSection = ({ featured }) => {
  console.log(featured);
  if (!featured) {
    return (
      <div className="w-full h-64 flex items-center justify-center animate-pulse bg-gray-200 dark:bg-gray-800 rounded-3xl">
        <span className="text-gray-400">Curating top stories...</span>
      </div>
    );
  }

  return (
    <div className="relative group overflow-hidden rounded-[2.5rem] bg-gray-900 shadow-2xl transition-all duration-500 hover:shadow-blue-500/20">
      {/* Background Image with 3D Parallax-like Zoom */}
      <div className="relative h-[450px] md:h-[550px] overflow-hidden">
        <img
          src={featured?.image || "https://images.unsplash.com/photo-1504711432869-efd597cdd04d?auto=format&fit=crop&q=80&w=1000"}
          alt={featured?.headline}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-50"
        />
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
      </div>

      {/* Floating 3D Badge */}
      <div className="absolute top-6 left-6 z-20">
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/50 animate-bounce-slow">
          <Star size={14} fill="currentColor" />
          Featured Story
        </div>
      </div>

      {/* Content Overlay - Glassmorphism Card */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-20">
        <div className="max-w-3xl transform transition-all duration-500 group-hover:-translate-y-2">
          {/* Category/Tag */}
          <span className="inline-block px-3 py-1 mb-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-blue-400 text-xs font-bold uppercase tracking-widest">
            {featured?.category?.name || "Global News"}
          </span>

          {/* Headline */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tighter">
            {featured?.headline}
          </h1>

          {/* Excerpt */}
          <p className="text-gray-300 text-sm md:text-lg mb-6 line-clamp-2 md:line-clamp-3 font-serif italic opacity-90 group-hover:opacity-100 transition-opacity">
            `{featured?.body.substring(0, 180)}...`
          </p>

          {/* Meta Information & CTA */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
              <Calendar size={16} className="text-blue-500" />
              {formatPublishedDate(featured?.published_at)}
            </div>

            <Link 
              to={`/article/${featured?.id}`}
              className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-2xl font-bold text-sm transition-all hover:bg-blue-600 hover:text-white hover:scale-105 active:scale-95 shadow-[0_10px_20px_rgba(255,255,255,0.1)]"
            >
              Read Full Story
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Blur for Depth */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full group-hover:bg-blue-600/30 transition-colors"></div>
    </div>
  );
};

// Custom animation for the badge
const style = document.createElement('style');
style.textContent = `
  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  .animate-bounce-slow {
    animation: bounce-slow 3s ease-in-out infinite;
  }
`;
document.head.append(style);

export default HeroSection;