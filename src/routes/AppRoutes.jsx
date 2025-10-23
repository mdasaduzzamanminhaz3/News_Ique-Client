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
        <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
      </Route>
      {/* privet routes */}

      <Route
        path="dashboard"
        element={
          <PrivetRoutes>
            <DashboardLayout />
          </PrivetRoutes>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile/>}/>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
