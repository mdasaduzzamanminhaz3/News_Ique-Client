import { FiStar, FiUsers } from "react-icons/fi";
import StatCard from "../components/Dashboard/StatCard";
import {
  MdArticle,
  MdCategory,
  MdPublishedWithChanges,
  MdReviews,
  MdUnpublished,
} from "react-icons/md";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import authApiClient from "../services/auth-api-client";
import useFetchCategories from "../hooks/useFetctCategories";

export default function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [publishedArticles, setPublishedArticles] = useState([]);
  const [totalArticle, setTotalArticle] = useState(0);
  const [users, setUsers] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const { categories } = useFetchCategories();
  const [totalReview, setTotalReview] = useState(0);
  const fetchArticles = async () => {
    setLoading(true);
    try {
      let allArticles = [];
      let nextUrl = "/api/v1/articles/";

      while (nextUrl) {
        const res = await apiClient.get(nextUrl);
        allArticles = [...allArticles, ...res.data.results];
        nextUrl = res.data.next;
      }
      setArticles(allArticles);
      setTotalArticle(allArticles.length);
      const published = allArticles.filter((article) => !!article.published_at);
      setPublishedArticles(published);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      let allUsers = [];
      let nextUrl = "/auth/users/";

      while (nextUrl) {
        const res = await authApiClient.get(nextUrl);
        allUsers = [...allUsers, ...res.data.results];
        nextUrl = res.data.next;
        setUsers(allUsers);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await authApiClient.get("/api/v1/reviews/");
      const reviews = res.data.results;
      const totalr = res.data.results;
      setTotalReview(totalr.length);
      const rated = reviews.filter((r) => typeof r.ratings === "number");
      const avg =
        rated.length > 0
          ? rated.reduce((sum, r) => sum + r.ratings, 0) / rated.length
          : 0;

      setAvgRating(avg);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchUsers();
    fetchReviews();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="text-center  px-4 py-2 text-gray-500 dark:text-gray-300 text-sm">
          <span className="loading loading-spinner text-primary loading-xl"></span>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 ">
          <StatCard
            icon={MdArticle}
            title="Total Articles"
            value={totalArticle}
          />
          <StatCard
            icon={MdPublishedWithChanges}
            title="Total Published"
            value={publishedArticles.length}
          />
          <StatCard
            icon={MdUnpublished}
            title="Unpublished"
            value={totalArticle - publishedArticles.length}
          />
          <StatCard
            icon={MdCategory}
            title="Total Category"
            value={categories.length}
          />
          <StatCard icon={FiUsers} title="Total Users" value={users.length} />
          <StatCard
            icon={FiStar}
            title="Average Rating"
            value={avgRating.toFixed(1)}
          />
          <StatCard icon={MdReviews} title="Total Review" value={totalReview} />
        </div>
      )}
    </div>
  );
}
