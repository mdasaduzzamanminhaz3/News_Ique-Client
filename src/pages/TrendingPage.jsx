import Trending from '../components/Article/Tranding';
import useFetchArticles from '../hooks/useFetchArticles';

const TrendingPage = () => {
  const { trendingArticles, error,loading } = useFetchArticles({
    currentPage: 1,
    selectedCategory: null,
    searchQuery: "",
  });


  return (
 <div className="min-h-screen bg-gray-50 p-4">
      {loading ? (
        <p className="text-center text-gray-800 animate-pulse">Loading trending articles...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error loading articles: {error}</p>
      ) : (
        <Trending trendingArticles={trendingArticles} />
      )}
    </div>

  );
};

export default TrendingPage;


