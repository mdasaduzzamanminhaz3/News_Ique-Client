import { Link, useParams } from "react-router";
import ErrorAlert from "../ErrorAlert";
import { formatPublishedDate } from "../utils/formatDate";
import ReviewSection from "../Review/ReviewSection";
import useFetchArticleDetail from "../../hooks/useFetchArticleDetail";
import { IoIosArrowBack } from "react-icons/io";

const ArticleDetail = () => {
  const { id } = useParams();
  const { article, error, loading } = useFetchArticleDetail(id);

  const DetailSkeleton = () => (
    <div className="max-w-screen-md mx-auto w-full h-auto p-4 my-6 rounded-md shadow-md bg-white animate-pulse">
      {/* Back button skeleton */}
      <div className="h-6 bg-gray-200 rounded w-20 mb-4"></div>
      
      {/* Headline skeleton */}
      <div className="space-y-3 mb-6">
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      </div>

      {/* Image skeleton */}
      <div className="w-full h-64 md:h-96 bg-gray-300 rounded-md mb-6"></div>

      {/* Body text skeleton */}
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>

      {/* Date skeleton */}
      <div className="h-3 bg-gray-200 rounded w-32 mt-8"></div>
    </div>
  );

  return (
    <div className="px-4 bg-gray-100 min-h-screen">
      {loading && !error && <DetailSkeleton />}

      {!loading && error && (
        <div className="flex justify-center pt-10">
          <ErrorAlert error={error} />
        </div>
      )}

      {!loading && !error && article && (
        <div className="max-w-screen-md mx-auto w-full h-auto p-4 my-6 rounded-md shadow-md bg-white">
          <div className="space-y-4">
            <div className="flex items-center font-bold text-xl text-blue-600">
              <Link className="text-center flex items-center hover:underline" to='/'>
                <IoIosArrowBack /> back
              </Link>
            </div>
            <h3 className="font-bold text-2xl md:text-3xl text-gray-900 leading-tight">
              {article.headline}
            </h3>
            <img
              src={article.image || "/src/assets/images/Image-not-found.png"}
              alt={article.headline}
              className="rounded-md w-full h-auto object-cover shadow-sm"
            />
          </div>
          
          <div className="mt-6">
            <p className="text-base md:text-lg leading-relaxed text-gray-800 whitespace-pre-line">
              {article.body}
            </p>
            <span className="text-gray-400 text-sm block mt-6 border-t pt-4">
              Published on: {formatPublishedDate(article.published_at)}
            </span>
          </div>

          <div className="mt-10">
            <ReviewSection />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;