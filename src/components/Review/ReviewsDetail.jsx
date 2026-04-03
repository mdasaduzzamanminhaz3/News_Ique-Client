import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Search, Calendar, User, MessageSquare, Newspaper, ArrowUpDown, LayoutGrid } from "lucide-react";
import apiClient from "../../services/api-client";
import { formatPublishedDate } from "../utils/formatDate";
import TableRowSkeleton from "../Skeleton/TableRowSkeleton";

const ReviewsDetail = () => {
  const [search, setSearch] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get("/api/v1/reviews/");
        setReviews(res.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter((r) => {
    const fullName = `${r.user?.first_name} ${r.user?.last_name}`.toLowerCase();
    const searchTerm = search.toLowerCase();
    return (
      r.comment.toLowerCase().includes(searchTerm) ||
      r.article_headline.toLowerCase().includes(searchTerm) ||
      fullName.includes(searchTerm)
    );
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="p-8 bg-[#020617] min-h-screen text-slate-300 pt-24 md:pt-28">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <LayoutGrid className="text-blue-500" size={32} />
              REVIEWS <span className="text-blue-500 text-lg font-bold bg-blue-500/10 px-3 py-1 rounded-full">Admin</span>
            </h1>
            <p className="text-gray-500 mt-2 font-medium uppercase tracking-widest text-[10px]">
              Manage and monitor user feedback across all articles
            </p>
          </div>

          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="group flex items-center gap-3 bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-500 text-white px-6 py-3.5 rounded-2xl transition-all shadow-xl active:scale-95"
          >
            <ArrowUpDown size={18} className="group-hover:rotate-180 transition-transform duration-500" />
            <span className="uppercase tracking-widest text-xs font-black">
              {sortOrder === "asc" ? "Oldest First" : "Latest First"}
            </span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-8 relative max-w-2xl">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search by author, headline or comment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all font-medium placeholder:text-gray-600"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 space-y-4">
                {[...Array(6)].map((_, index) => (
                  <TableRowSkeleton key={index} />
                ))}
              </div>
            ) : sortedReviews.length === 0 ? (
              <div className="p-20 text-center flex flex-col items-center gap-4">
                <MessageSquare size={48} className="text-gray-700" />
                <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No reviews found in the system</p>
              </div>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="px-8 py-6 text-left text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]"><div className="flex items-center gap-2"><User size={14}/> Author</div></th>
                    <th className="px-8 py-6 text-left text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Rating</th>
                    <th className="px-8 py-6 text-left text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]"><div className="flex items-center gap-2"><Newspaper size={14}/> Article</div></th>
                    <th className="px-8 py-6 text-left text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Comment</th>
                    <th className="px-8 py-6 text-left text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]"><div className="flex items-center gap-2"><Calendar size={14}/> Date</div></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {sortedReviews.map((review, index) => (
                    <tr key={index} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-5 text-sm font-bold text-white whitespace-nowrap">
                        {review.user?.first_name} {review.user?.last_name}
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} size={12} className={i < review.ratings ? "text-yellow-500 shadow-yellow-500/50" : "text-gray-700"} />
                          ))}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm font-medium text-blue-400/80 italic max-w-xs truncate">
                        {review.article_headline}
                      </td>
                      <td className="px-8 py-5 text-sm text-gray-400 max-w-md">
                        <p className="line-clamp-2 leading-relaxed">{review.comment}</p>
                      </td>
                      <td className="px-8 py-5 text-[11px] font-black text-gray-500 whitespace-nowrap">
                        {formatPublishedDate(review.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.5em]">
          © 2026 NewsIque Intelligent Systems
        </p>
      </div>
    </div>
  );
};

export default ReviewsDetail;