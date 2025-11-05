import { useEffect, useState } from "react";
import { useParams } from "react-router";
import apiClient from "../../services/api-client";
import ErrorAlert from "../ErrorAlert";
import { formatPublishedDate } from "../utils/formatDate";
import ReviewSection from "../Review/ReviewSection";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`/api/v1/public_articles/${id}`)
      .then((res) => {
        setArticle(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="px-4">
{loading && !error && (
  <div className="col-span-full flex justify-center items-center py-6">
    <span className="loading loading-spinner text-primary loading-xl"></span>
  </div>
)}

      {!loading && error && (
        <p className="text-center text-red-500 mt-6">
          <ErrorAlert error={error} />
        </p>
      )}

      {!loading && article && (
        <div className="max-w-screen-md mx-auto w-full h-auto p-4 my-6 rounded shadow-sm bg-white">
          <div className="space-y-4">
            <h3 className="font-bold text-2xl md:text-3xl">{article.headline}</h3>
            <img
              src={article.image || "/src/assets/images/Image-not-found.png"}
              alt={article.headline}
              className="rounded w-full h-auto object-cover"
            />
          </div>
          <div className="mt-4">
            <p className="text-base md:text-lg leading-relaxed text-gray-800 whitespace-pre-line">
              {article.body}
            </p>
            <span className="text-gray-400 text-sm block mt-4">
              {formatPublishedDate(article.published_at)}
            </span>
          </div>
          <ReviewSection/>
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;