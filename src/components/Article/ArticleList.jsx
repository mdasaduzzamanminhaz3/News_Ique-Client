import { useEffect, useState } from "react";
import { formatPublishedDate } from "../utils/formatDate";
import ErrorAlert from "../ErrorAlert";
import { Link } from "react-router";
import SkeletonCard from "../Skeleton/SkeletonCard";
import { Clock, ArrowUpRight, Newspaper } from "lucide-react"; // Newspaper icon nibo placeholder er jonno

const ArticleList = ({ articles, error }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  // Default Image URL (Tumi ekhane onno kono premium image link o dite paro)
  const defaultImage = "https://images.unsplash.com/photo-1585829365234-78d2b98ad752?q=80&w=800&auto=format&fit=crop";

  useEffect(() => {
    setLoading(true);
    if (articles.length > 0) {
      const timeout = setTimeout(() => {
        setShow(true);
        setLoading(false);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setLoading(false);
    }
  }, [articles]);

  // Image load error hole ei function-ti run hobe
  const handleImgError = (e) => {
    e.target.src = defaultImage;
  };

  return (
    <div className="bg-transparent min-h-screen py-8">
      {error && <ErrorAlert error={error} />}

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full px-2">
        {loading && !error && (
          <>
            {[...Array(6)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </>
        )}

        {!loading &&
          !error &&
          articles.length > 0 &&
          articles.map((article, index) => (
            <Link 
              key={article.id} 
              to={`/article/${article.id}`}
              className="group"
            >
              <div
                className={`relative h-full bg-white dark:bg-gray-800/40 backdrop-blur-md rounded-[2.5rem] p-5 border border-gray-100 dark:border-gray-700 shadow-xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/10
              ${
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Image Section */}
                <div className="relative overflow-hidden rounded-2xl h-48 mb-5 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  
                  {/* Real Image with Fallback Logic */}
                  <img
                    src={article?.image || defaultImage}
                    alt={article?.headline || "News Image"}
                    onError={handleImgError} // Image load fail hole auto-change hobe
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-bold flex items-center gap-2">
                      Read More <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col h-[calc(100%-212px)]">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white leading-tight mb-3 group-hover:text-blue-500 transition-colors line-clamp-2">
                    {article?.headline}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 font-serif flex-grow leading-relaxed opacity-80">
                    {article.body.substring(0, 110)}...
                  </p>

                  <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-[10px] uppercase tracking-widest font-bold">
                      <Clock size={12} className="text-blue-500" />
                      {formatPublishedDate(article.published_at)}
                    </div>
                    <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/40 transition-all">
                        <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>

                <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </Link>
          ))}

        {!loading && !error && articles.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center space-y-6">
              <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-full shadow-inner animate-pulse">
                 <Newspaper size={48} className="text-gray-300 dark:text-gray-600" />
              </div>
              <p className="text-xl font-bold text-gray-400 tracking-tight">Nothing found in this section.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleList;