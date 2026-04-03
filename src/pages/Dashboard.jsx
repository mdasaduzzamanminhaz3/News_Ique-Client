import { useEffect, useState } from "react";
import { FiStar, FiUsers, FiTrendingUp } from "react-icons/fi";
import {
  MdArticle,
  MdCategory,
  MdPublishedWithChanges,
  MdReviews,
  MdUnpublished,
} from "react-icons/md";
import StatCard from "../components/Dashboard/StatCard";
import StatCardSkeleton from "../components/Skeleton/StatCardSkeleton";
import apiClient from "../services/api-client";
import authApiClient from "../services/auth-api-client";
import useFetchCategories from "../hooks/useFetctCategories";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const { categories } = useFetchCategories();
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishedCount: 0,
    totalUsers: 0,
    avgRating: 0,
    totalReviews: 0,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      // Shob API call eksathe run hobe performance baranor jonno
      const [articlesRes, usersRes, reviewsRes] = await Promise.allSettled([
        fetchAllPages("/api/v1/articles/", apiClient),
        fetchAllPages("/auth/users/", authApiClient),
        authApiClient.get("/api/v1/reviews/"),
      ]);

      // Processing Articles
      let allArticles = articlesRes.status === "fulfilled" ? articlesRes.value : [];
      const published = allArticles.filter((a) => !!a.published_at).length;

      // Processing Users
      let allUsers = usersRes.status === "fulfilled" ? usersRes.value : [];

      // Processing Reviews
      let reviewsData = reviewsRes.status === "fulfilled" ? reviewsRes.value.data.results : [];
      const ratedReviews = reviewsData.filter((r) => typeof r.ratings === "number");
      const avg = ratedReviews.length > 0 
        ? ratedReviews.reduce((sum, r) => sum + r.ratings, 0) / ratedReviews.length 
        : 0;

      setStats({
        totalArticles: allArticles.length,
        publishedCount: published,
        totalUsers: allUsers.length,
        avgRating: avg,
        totalReviews: reviewsData.length,
      });
    } catch (error) {
      console.error("Dashboard Sync Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to handle pagination auto-fetching
  async function fetchAllPages(url, client) {
    let results = [];
    let nextUrl = url;
    while (nextUrl) {
      const res = await client.get(nextUrl);
      results = [...results, ...res.data.results];
      nextUrl = res.data.next;
    }
    return results;
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
          <FiTrendingUp className="text-blue-500" />
          System <span className="text-blue-500">Overview</span>
        </h1>
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">
          NewsIque Intelligence Terminal // Real-time Data
        </p>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(7)].map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={MdArticle}
            title="Total Articles"
            value={stats.totalArticles}
            color="blue"
          />
          <StatCard
            icon={MdPublishedWithChanges}
            title="Live Broadcasts"
            value={stats.publishedCount}
            color="green"
          />
          <StatCard
            icon={MdUnpublished}
            title="Drafts"
            value={stats.totalArticles - stats.publishedCount}
            color="yellow"
          />
          <StatCard
            icon={MdCategory}
            title="Categories"
            value={categories.length}
            color="purple"
          />
          <StatCard 
            icon={FiUsers} 
            title="Active Users" 
            value={stats.totalUsers} 
            color="cyan"
          />
          <StatCard
            icon={FiStar}
            title="Avg Rating"
            value={stats.avgRating.toFixed(1)}
            color="orange"
          />
          <StatCard 
            icon={MdReviews} 
            title="User Feedback" 
            value={stats.totalReviews} 
            color="pink"
          />
        </div>
      )}
    </div>
  );
}