import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useFetchArticles = ({ currentPage, selectedCategory,searchQuery }) => {
  const [articles, setArticles] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let url = "";

        if (selectedCategory && selectedCategory !== 1) {
          url = `/api/v1/articles/?page=${currentPage}&category_id=${selectedCategory}`;
        } else {
          url = `/api/v1/public_articles/homepage/?page=${currentPage}`;
        }

        // console.log("Fetching:", url);
        if (searchQuery && searchQuery.trim() !== "") {
          url = `/api/v1/articles/?search=${searchQuery}&page=${currentPage}`;
        }
        const res = await apiClient.get(url);

        setFeatured(res.data.results?.featured || null);
        setArticles(res.data.results?.articles || res.data?.results);
        // console.log(res.data.count);
        setTotalPages(Math.ceil(res.data.count / pageSize));
      } catch (error) {
        console.error("API Error:", error.message);
        setError(error.message);
      }
    };

    fetchArticles();
  }, [currentPage, selectedCategory,searchQuery]);

  return {
    articles,
    featured,
    error,
    totalPages,
  };
};

export default useFetchArticles;
