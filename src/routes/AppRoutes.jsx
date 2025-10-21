import { Route, Routes } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import ArticlePage from "../pages/ArticlePage";
import ArticleDetail from "../components/Article/ArticleDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import PrivetRoutes from "../components/PrivetRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/article-page" element={<ArticlePage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route
          path="dashboard"
          element={
            <PrivetRoutes>
              <Dashboard />
            </PrivetRoutes>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
