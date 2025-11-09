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
import ActivateAccount from "../components/Registration/ActivateAccount";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/Profile";
import ArticleList from "../components/Article/ArticleList";
import AddArticle from "../pages/AddArticle";
import UpdateArticle from "../components/Article/UpdateArticle";
import CategoryPage from "../pages/CategoryPage";
import CategoryForm from "../components/Categories/CategoryForm";
import Reviews from "../pages/Reviews";
import TrendingPage from "../pages/TrendingPage";
import UserPage from "../pages/UserPage";
import UserForm from "../components/Users/UserForm";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="trending" element={<TrendingPage />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
        <Route
          path="profile"
          element={
            <PrivetRoutes>
              <Profile />
            </PrivetRoutes>
          }
        />
      </Route>

      {/* Dashboard Routes */}
      <Route
        path="dashboard"
        element={
          <PrivetRoutes>
            <DashboardLayout />
          </PrivetRoutes>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="articles" element={<ArticleList />} />
        <Route path="article-page" element={<ArticlePage />} />
        <Route path="articles/add" element={<AddArticle />} />
        <Route path="articles/edit/:id" element={<UpdateArticle />} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="categories/add" element={<CategoryForm />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="users" element={<UserPage />} />
        <Route path="users/edit/:id"  element={<UserForm/>}/>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
