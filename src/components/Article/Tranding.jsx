const Trending = ({ trendingArticles }) => {
  return (
    <section className="bg-white py-6 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🔥 Trending Now</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trendingArticles.length > 0 ? (
          trendingArticles.map((article) => (
            <div
              key={article.id}
              className="bg-gray-50 rounded shadow hover:shadow-md transition duration-300 p-4"
            >
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                {article.headline}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                {article.body.substring(0, 100)}...
              </p>
              <span className="text-xs text-gray-400">
                {new Date(article.published_at).toLocaleDateString("en-GB")}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No trending articles available.</p>
        )}
      </div>
    </section>
  );
};

export default Trending;