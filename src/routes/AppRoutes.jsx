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

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
      </Route>
      {/* privet routes */}

      <Route
        element={
          <PrivetRoutes>
            <DashboardLayout />
          </PrivetRoutes>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile/>}/>
        <Route path="articles" element={<ArticleList/>}/>
        <Route path="/article-page" element={<ArticlePage />} />
        <Route path="articles/add" element={<AddArticle/>}/>
        <Route path="articles/edit/:id" element={<UpdateArticle/>}/>
        <Route path="categories" element={<CategoryPage />}/>
        <Route path="categories/add" element={<CategoryForm />}/>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
