import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import apiClient from "../../services/api-client";
import { formatPublishedDate } from "../utils/formatDate";

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
        // console.log(res.data.results);
        setReviews(res.data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter(
    (r) =>
      r.comment.toLowerCase().includes(search.toLowerCase()) ||
      r.article_headline.toLowerCase().includes(search.toLowerCase()) ||
      `${r.user.first_name} ${r.user.last_name}`
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reviews</h1>
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Sort by Date: {sortOrder === "asc" ? "Oldest First" : "Latest First"}
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        {loading ? (
          <div className="text-center  px-4 py-2 text-gray-500 dark:text-gray-300 text-sm">
            <span className="loading loading-spinner text-primary loading-xl"></span>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No reviews yet.</div>
        ) : (
          <table className="w-full table-auto">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Author</th>
                <th className="px-4 py-2 text-left">Rating</th>
                <th className="px-4 py-2 text-left">Content</th>
                <th className="px-4 py-2 text-left">Comment</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {sortedReviews.map((review, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">
                    {review.user.first_name} {review.user.last_name}
                  </td>
                  <td className="px-4 py-2 flex gap-1">
                    {[...Array(review.ratings)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500 h-4 w-4" />
                    ))}
                  </td>
                  <td className="px-4 py-2">{review.article_headline}</td>
                  <td className="px-4 py-2">{review.comment}</td>
                  <td className="px-4 py-2">
                    {formatPublishedDate(review.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 text-xs text-gray-500 text-center">
        © 2025 NewsIque Admin
      </div>
    </div>
  );
};

export default ReviewsDetail;
