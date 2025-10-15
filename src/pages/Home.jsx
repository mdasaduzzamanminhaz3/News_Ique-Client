


import HeroSection from "../components/Home/HeroSection";
import ArticleList from "../components/Article/ArticleList";
import BreakingNewsTicker from "../components/Article/BreakingNewsTicker";
import { useState } from "react";
import Pagination from "../components/Article/Pagination";
import useFetchArticles from "../hooks/useFetchArticles";
import { useOutletContext } from "react-router";

const Home = () => {
  const { selectedCategory,searchQuery } = useOutletContext();
  const [currentPage, setCurrentPage] = useState(1);
  const {articles,featured,error,totalPages} = useFetchArticles({currentPage,selectedCategory,searchQuery});
  const headlines = articles.map((article) => article.headline);


  return (
    <div className="bg-gray-50">
      <BreakingNewsTicker headlines={headlines} />
      <HeroSection featured={featured} />
      <ArticleList articles={articles} error={error} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={setCurrentPage}
      />
    </div>
  );
};

export default Home;
