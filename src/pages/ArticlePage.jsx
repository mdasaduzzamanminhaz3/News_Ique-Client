import { useEffect, useState } from "react";
import authApiClient from "../services/auth-api-client"; // বা apiClient
import { Link, useNavigate } from "react-router";
import { formatPublishedDate } from "../components/utils/formatDate";
import Pagination from "../components/Article/Pagination";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        await authApiClient
          .get(`/api/v1/articles/?page=${page}`)
          .then((res) => {
            setArticles(res.data?.results || res.data);
            setTotalPages(Math.ceil(res.data.count / 10));
            // console.log(res.data.results);
          });
        setShow(true);
      } catch (err) {
        console.log("Error fetching articles:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [page]);
  
const handlePageChange = (newPage) => {
  setPage(newPage);
};

  const handleDelete = async (id) => {
    try {
      await authApiClient.delete(`/api/v1/articles/${id}`);
      setArticles((prev) => prev.filter((article) => article.id !== id));
      alert("Article deleted successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="grid gap-2 py-2 grid-cols-1 lg:grid-cols-3 md:grid-cols-2 h-full w-full">
        {loading && (
          <div className="text-center py-10 text-gray-500 font-semibold animate-pulse">
            Loading articles...
          </div>
        )}

        {!loading &&
          articles.length > 0 &&
          articles.map((article, index) => (
            <Link key={article.id} to={`/article/${article.id}`}>
              <div
                key={index}
                className={`shadow-sm bg-white rounded my-2 mx-3 p-2 transform transition-all duration-700 ease-out
              ${
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex flex-col sm:flex-row gap-2">
                  <h3 className="font-bold text-2xl flex-1">
                    {article?.headline}
                  </h3>
                  <img
                    src={
                      article.image || "/src/assets/images/Image-not-found.png"
                    }
                    alt="image not found"
                    className="rounded mt-2 w-full sm:w-32 sm:h-32 object-cover"
                  />
                </div>
                <div className="mt-2">
                  <span className="block">
                    {article.body.substring(0, 100)}...
                  </span>
                  <span className="text-gray-400 text-sm">
                    {" "}
                    Date: {formatPublishedDate(article.published_at)}
                  </span>
                </div>

                <div className="flex justify-between ">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/articles/edit/${article.id}`);
                    }}
                    className="btn bg-blue-50 text-blue-700 hover:bg-blue-300"
                  >
                    Update
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(article.id);
                    }}
                    className="btn text-red-700 bg-red-50 hover:bg-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Link>
          ))}

        {!loading && articles.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No Articles Available
          </p>
        )}
      </div>


<Pagination
  totalPages={totalPages}
  currentPage={page}
  handlePageChange={handlePageChange}
/>
    </div>
  );
};

export default ArticlesPage;
