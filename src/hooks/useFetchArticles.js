import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import authApiClient from "../services/auth-api-client"; 
import useAuth from "./useAuth";

const useFetchArticles = ({ currentPage, selectedCategory, searchQuery }) => {
  const [articles, setArticles] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const pageSize = 10;

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        let url = "";
        let client = apiClient; 

        if (selectedCategory && selectedCategory !== 1) {
          url = `/api/v1/articles/?page=${currentPage}&category_id=${selectedCategory}`;
          client = authApiClient; 
        } else {
          if (
            user?.subscription?.is_active &&
            user?.subscription?.plan?.name === "Premium"
          ) {
            url = `/api/v1/articles/?page=${currentPage}`;
            client = authApiClient; 
          } else {
            url = `/api/v1/public_articles/homepage/?page=${currentPage}`;
          }
        }

        if (searchQuery && searchQuery.trim() !== "") {
          url = `/api/v1/articles/?search=${searchQuery}&page=${currentPage}`;
          client = authApiClient; 
        }

        const res = await client.get(url);

        setFeatured(res.data.results?.featured || null);
        setArticles(res.data.results?.articles || res.data?.results);
        setTotalPages(Math.ceil(res.data.count / pageSize));
      } catch (err) {
        console.error("API Error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage, selectedCategory, searchQuery, user]);

  const trendingArticles = articles.filter((article) => {
    if (!article.published_at) return false;
    const pubDate = new Date(article.published_at);
    const today = new Date();
    const diffInDays = (today - pubDate) / (1000 * 60 * 60 * 24);
    return diffInDays <= 15;
  });

  return {
    articles,
    featured,
    error,
    totalPages,
    loading,
    trendingArticles,
  };
};

export default useFetchArticles;
