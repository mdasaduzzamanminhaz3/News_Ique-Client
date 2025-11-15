import { Link, useParams } from "react-router";
import ErrorAlert from "../ErrorAlert";
import { formatPublishedDate } from "../utils/formatDate";
import ReviewSection from "../Review/ReviewSection";
import useFetchArticleDetail from "../../hooks/useFetchArticleDetail";
import { IoIosArrowBack } from "react-icons/io";

const ArticleDetail = () => {
  const { id } = useParams();
  const { article, error, loading } = useFetchArticleDetail(id);

  return (
    <div className="px-4 bg-gray-100">
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

      {!loading && !error && article && (
        <div className="max-w-screen-md mx-auto w-full h-auto p-4 my-6 rounded-md shadow-md bg-white">
          <div className="space-y-4">
            <div className="flex items-center font-bold text-xl text-blue-600">
            <Link className="text-center flex items-center" to='/'><IoIosArrowBack />back</Link>
            </div>
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
          <ReviewSection />
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;
