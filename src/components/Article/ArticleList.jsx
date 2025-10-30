import { useEffect, useState } from "react";
import { formatPublishedDate } from "../utils/formatDate";
import ErrorAlert from "../ErrorAlert";
import { Link } from "react-router";

const ArticleList = ({ articles, error }) => {
  // for animation
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    // console.log(articles);
    if (articles.length > 0) {
      const timeout = setTimeout(() => {
        setShow(true);

        setLoading(false);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [articles]);

  return (
    <div className="bg-gray-50">
      {error && <ErrorAlert error={error} />}

      <div className="grid gap-2 py-2 grid-cols-1 lg:grid-cols-3 md:grid-cols-2 h-full w-full">
        {loading && !error && (
          <div className="text-center py-10 text-gray-500 font-semibold animate-pulse">
            Loading articles...
          </div>
        )}

        {!loading &&
          !error &&
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
                    src={article?.image|| "/src/assets/images/Image-not-found.png"}
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
              </div>
            </Link>
          ))}

        {!loading && !error && articles.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No Articles Available
          </p>
        )}
      </div>
    </div>
  );
};

export default ArticleList;
