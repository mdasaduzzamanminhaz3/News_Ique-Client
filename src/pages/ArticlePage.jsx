import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Fixed import
import { Search, Edit3, Trash2, Calendar, ArrowRight, Newspaper, Loader2, AlertCircle } from "lucide-react";
import authApiClient from "../services/auth-api-client";
import { formatPublishedDate } from "../components/utils/formatDate";
import Pagination from "../components/Article/Pagination";
import SkeletonCard from "../components/Skeleton/SkeletonCard";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await authApiClient.get(`/api/v1/articles/?page=${page}&search=${search}`);
      // API response structure handle kora hoyeche
      const data = res.data?.results || res.data || [];
      setArticles(data);
      
      // Pagination count handle kora hoyeche
      const count = res.data?.count || 0;
      setTotalPages(Math.ceil(count / 10) || 1);
    } catch (err) {
      console.error("Error fetching articles:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  // Search Debounce: 500ms delay jate API te pressure kom pore
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchArticles();
    }, 500);
    return () => clearTimeout(handler);
  }, [page, search]);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      await authApiClient.delete(`/api/v1/articles/${id}/`);
      setArticles((prev) => prev.filter((article) => article.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete the article.");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 pt-24 pb-20 px-4 md:px-8">
      
      {/* Header & Search Bar Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="animate-in fade-in slide-in-from-left-4 duration-700">
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic flex items-center gap-3">
              <Newspaper className="text-blue-500" size={36} />
              Article <span className="text-blue-500 underline decoration-blue-500/20">Archive</span>
            </h1>
            <p className="text-gray-500 mt-2 font-bold uppercase tracking-[0.2em] text-[10px]">
              System Terminal // Content Management Control
            </p>
          </div>

          <div className="w-full md:w-96 relative group animate-in fade-in slide-in-from-right-4 duration-700">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // Search korle page 1 e niye jabe
              }}
              placeholder="Search content repository..."
              className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all font-medium placeholder:text-gray-600 shadow-2xl shadow-blue-900/10"
            />
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-[400px]">
          {loading ? (
            // Skeleton Loading States
            [...Array(6)].map((_, index) => <SkeletonCard key={index} />)
          ) : articles.length > 0 ? (
            articles.map((article, index) => (
              <div 
                key={article.id}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Media Container */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={article.image || "/src/assets/images/Image-not-found.png"}
                    alt={article.headline}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent opacity-60"></div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-black text-xl text-white leading-tight mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 italic uppercase">
                    {article.headline}
                  </h3>
                  
                  <p className="text-gray-400 text-sm font-medium mb-4 line-clamp-3 flex-1 leading-relaxed">
                    {/* HTML tags remove kora hoyeche extract content er jonno */}
                    {article.body?.replace(/<[^>]*>?/gm, '').substring(0, 120)}...
                  </p>

                  <div className="flex items-center gap-2 text-gray-600 text-[10px] font-black uppercase tracking-widest mb-6">
                    <Calendar size={14} className="text-blue-500" />
                    {formatPublishedDate(article.published_at)}
                  </div>

                  {/* Operational Controls */}
                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/dashboard/articles/edit/${article.id}`)}
                        className="p-2.5 bg-blue-500/10 hover:bg-blue-500 text-blue-500 hover:text-white rounded-xl transition-all border border-blue-500/20"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-2.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all border border-red-500/20"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <Link 
                      to={`/article/${article.id}`}
                      className="flex items-center gap-2 text-[10px] font-black text-blue-400 hover:text-white uppercase tracking-widest transition-colors group/link"
                    >
                      View Live
                      <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // No Results Found State
            <div className="col-span-full py-20 flex flex-col items-center justify-center bg-white/5 rounded-[3rem] border border-dashed border-white/10">
              <AlertCircle className="text-gray-700 mb-4" size={48} />
              <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">
                No signal found in the archive repository.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination Container */}
      <div className="mt-16 flex justify-center animate-in fade-in duration-1000">
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ArticlesPage;