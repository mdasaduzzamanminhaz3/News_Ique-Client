import HeroSection from "../components/Home/HeroSection";
import ArticleList from "../components/Article/ArticleList";
import BreakingNewsTicker from "../components/Article/BreakingNewsTicker";
import { useState, useEffect } from "react";
import Pagination from "../components/Article/Pagination";
import useFetchArticles from "../hooks/useFetchArticles";
import { useOutletContext, Link } from "react-router";
import { TrendingUp, Zap, Clock } from "lucide-react";
import { formatPublishedDate } from "../components/utils/formatDate";

const Home = () => {
  const { selectedCategory, searchQuery } = useOutletContext();
  const [currentPage, setCurrentPage] = useState(1);
  
  // Custom hook theke data fetch kora
  const { articles = [], featured, error, totalPages } = useFetchArticles({
    currentPage,
    selectedCategory,
    searchQuery,
  });

  // Headlines array toiri kora (articles array empty holeo error dibe na)
  const headlines = articles?.length > 0 ? articles.map((article) => article.headline) : [];
  
  // Sidebar er jonno latest 4ti news
  const sidebarNews = articles?.length > 0 ? articles.slice(0, 4) : [];

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    // Body Background - Deep Dark Slate/Midnight
    <main className="min-h-screen bg-[#020617] text-gray-100 transition-colors duration-500 pb-20 overflow-hidden">
      
      {/* 3D Animated Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[140px] rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-6">
        {/* Navbar-er jonno gap */}
        <div className="h-24 md:h-28"></div>

        {/* 1. Breaking News Ticker */}
        {headlines.length > 0 && (
          <div className="mb-8 transform hover:scale-[1.005] transition-transform duration-500">
            <BreakingNewsTicker headlines={headlines} />
          </div>
        )}

        {/* 2. Top Stories Section (Hero + Side Highlights) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Hero Card */}
          <div className="lg:col-span-8">
             <HeroSection featured={featured} />
          </div>
          
          {/* Top Highlights Side Panel */}
          <div className="lg:col-span-4 flex flex-col gap-4">
             <div className="bg-white/5 dark:bg-gray-800/40 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl h-full">
                <div className="flex items-center gap-2 mb-6 text-blue-400 font-bold uppercase tracking-widest text-sm">
                   <TrendingUp size={18} className="animate-bounce" /> Top Highlights
                </div>
                <div className="space-y-6">
                   {articles.length > 0 ? (
                     articles.slice(1, 4).map((news, idx) => (
                       <Link key={news.id} to={`/article/${news.id}`} className="group flex gap-4 items-start">
                          <span className="text-3xl font-black text-gray-700 group-hover:text-blue-500 transition-colors duration-300">
                            0{idx + 1}
                          </span>
                          <div>
                             <h4 className="font-bold text-gray-200 group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                               {news.headline}
                             </h4>
                             <p className="text-[10px] text-blue-400 uppercase font-bold mt-1 tracking-wider">
                               {news.category?.name || "General"}
                             </p>
                          </div>
                       </Link>
                     ))
                   ) : (
                     <p className="text-gray-500 text-sm italic">Loading highlights...</p>
                   )}
                </div>
             </div>
          </div>
        </div>

        {/* 3. Main Feed Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Side: Article Feed */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-2 h-8 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.6)]"></div>
              <h2 className="text-3xl font-black text-white tracking-tight">
                {searchQuery ? `Searching for "${searchQuery}"` : selectedCategory ? `${selectedCategory} Feed` : "Explore News"}
              </h2>
            </div>
            
            <ArticleList articles={articles} error={error} />

            {/* Pagination Container */}
            <div className="mt-16 flex justify-center">
               <div className="bg-gray-800/50 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-lg">
                  <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={setCurrentPage} />
               </div>
            </div>
          </div>

          {/* Right Side: Sticky 3D Sidebar */}
<aside className="lg:col-span-4">
  <div className="sticky top-28 space-y-8">
    
    {/* Latest News Widget */}
    <div className="bg-gradient-to-br from-gray-900 to-blue-900/40 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group border border-white/5">
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
      
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Zap size={20} className="text-yellow-400 fill-yellow-400 animate-pulse"/> Latest Stories
      </h3>
      
      <div className="space-y-6">
        {sidebarNews.length > 0 ? (
          sidebarNews.map((item) => (
            <Link key={item.id} to={`/article/${item.id}`} className="block border-b border-white/5 pb-4 last:border-0 group/item">
              
              {/* Dynamic Time Section */}
              <p className="text-[10px] text-blue-300 font-bold mb-1 flex items-center gap-1 uppercase tracking-wider">
                <Clock size={12}/> 
                {/* Ekhane dynamic time function-ti bosiyechi */}
                {item.published_at ? formatPublishedDate(item.published_at) : "Just Now"}
              </p>

              <h5 className="font-semibold group-hover/item:text-blue-300 transition-all duration-300 line-clamp-2 leading-tight">
                {item.headline}
              </h5>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-sm italic">Fetching the latest updates...</p>
        )}
      </div>
      
      <button 
        onClick={() => window.location.reload()} // Refresh functionality
        className="w-full mt-8 py-3 bg-white/5 hover:bg-blue-600 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 border border-white/10 hover:shadow-lg hover:shadow-blue-600/30"
      >
        Refresh Feed
      </button>
    </div>

    {/* Newsletter Widget (Unchanged) */}
    <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-blue-600/20 relative overflow-hidden group">
      <div className="relative z-10">
        <h3 className="text-2xl font-black mb-2 tracking-tighter">Stay Updated.</h3>
        <p className="text-blue-100 text-xs mb-6 opacity-80">Join 50k+ readers and get the best news directly to your inbox.</p>
        <div className="space-y-3">
          <input 
            type="email" 
            placeholder="your@email.com" 
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 placeholder:text-blue-200 outline-none focus:bg-white/20 transition-all text-sm" 
          />
          <button className="w-full py-4 bg-white text-blue-600 font-extrabold rounded-xl shadow-xl hover:bg-gray-100 transition-all transform active:scale-95">
            SUBSCRIBE NOW
          </button>
        </div>
      </div>
      <div className="absolute -bottom-6 -right-6 opacity-10 transform rotate-12 group-hover:scale-110 transition-transform duration-500">
        <TrendingUp size={150} />
      </div>
    </div>

  </div>
</aside>
        </div>
      </div>
    </main>
  );
};

export default Home;