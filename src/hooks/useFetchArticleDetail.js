import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import authApiClient from "../services/auth-api-client";

const useFetchArticleDetail = (id) => {
  const { user } = useAuth();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setArticle(null);  
      setError("");     

      try {
        let url = user ? `/api/v1/articles/${id}/` : `/api/v1/public_articles/${id}/`;

        const res = await authApiClient.get(url, {
          headers: user ? { Authorization: `JWT ${user.authTokens?.access}` } : {},
        });

        setArticle(res.data);
      } catch (err) {
        setArticle(null); 

        if (err.response?.status === 403) {
          setError("You do not have access to this article.");
        } else if (err.response?.status === 401) {
          setError("You are not authorized. Please login to view this article.");
        } else if (err.response?.status === 404) {
          setError("Article not found.");
        } else {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, user]);

  return { article, error, loading };
};

export default useFetchArticleDetail;
