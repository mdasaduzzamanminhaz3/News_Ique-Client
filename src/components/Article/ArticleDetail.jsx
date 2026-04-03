import { Link, useParams } from "react-router";
import ErrorAlert from "../ErrorAlert";
import { formatPublishedDate } from "../utils/formatDate";
import ReviewSection from "../Review/ReviewSection";
import useFetchArticleDetail from "../../hooks/useFetchArticleDetail";
import { IoIosArrowBack } from "react-icons/io";
import { Clock, Calendar, Share2 } from "lucide-react";

const ArticleDetail = () => {
  const { id } = useParams();
  const { article, error, loading } = useFetchArticleDetail(id);

  // High-quality placeholder image
  const defaultImage = "https://images.unsplash.com/photo-1585829365234-78d2b98ad752?q=80&w=1200&auto=format&fit=crop";

  const DetailSkeleton = () => (
    <div className="max-w-screen-md mx-auto w-full p-6 my-10 rounded-[2.5rem] bg-white/5 border border-white/10 animate-pulse">
      <div className="h-6 bg-gray-700 rounded-full w-24 mb-8"></div>
      <div className="space-y-4 mb-10">
        <div className="h-10 bg-gray-700 rounded-2xl w-full"></div>
        <div className="h-10 bg-gray-700 rounded-2xl w-2/3"></div>
      </div>
      <div className="w-full h-64 md:h-96 bg-gray-800 rounded-3xl mb-10"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  );

  return (
    <div className="relative px-4 bg-[#020617] min-h-screen pb-20">
      
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/5 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/5 blur-[140px] rounded-full"></div>
      </div>

      <div className="relative z-10 pt-28">
        {loading && !error && <DetailSkeleton />}

        {!loading && error && (
          <div className="flex justify-center pt-10">
            <ErrorAlert error={error} />
          </div>
        )}

        {!loading && !error && article && (
          <article className="max-w-screen-md mx-auto w-full bg-white/5 backdrop-blur-3xl border border-white/10 p-6 md:p-10 my-6 rounded-[2.5rem] shadow-2xl">
            
            {/* Header / Meta */}
            <div className="flex items-center justify-between mb-8">
              <Link 
                className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors group" 
                to='/'
              >
                <div className="p-2 bg-blue-500/10 rounded-full group-hover:-translate-x-1 transition-transform">
                  <IoIosArrowBack size={20} />
                </div>
                Back to Feed
              </Link>
              <button className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 transition-all">
                <Share2 size={18} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Headline */}
              <h1 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tight">
                {article.headline}
              </h1>

              {/* Author/Date Meta */}
              <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm font-medium border-b border-white/10 pb-8">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-blue-500" />
                  {formatPublishedDate(article.published_at)}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-blue-500" />
                  5 min read
                </div>
              </div>

              {/* Main Image */}
              <div className="relative group overflow-hidden rounded-[2rem] shadow-2xl">
                <img
                  src={article.image || defaultImage}
                  alt={article.headline}
                  onError={(e) => { e.target.src = defaultImage }}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem]"></div>
              </div>
            </div>
            
            {/* Body Content */}
            <div className="mt-10">
              <p className="text-lg md:text-xl leading-[1.8] text-gray-300 font-serif whitespace-pre-line selection:bg-blue-500/30">
                {article.body}
              </p>
              
              {/* Tags / Footer Meta */}
              <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-3">
                 <span className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider">
                   {article.category?.name || "General News"}
                 </span>
                 <span className="px-4 py-2 bg-white/5 text-gray-400 rounded-full text-xs font-bold uppercase tracking-wider">
                   Verified Source
                 </span>
              </div>
            </div>

            {/* Review Section Container */}
            <div className="mt-16 bg-gray-900/50 rounded-[2rem] p-6 md:p-8 border border-white/5 shadow-inner">
              <ReviewSection />
            </div>

          </article>
        )}
      </div>
    </div>
  );
};

export default ArticleDetail;