import useAuthContext from "../hooks/useAuthContext";
import { Navigate } from "react-router";

const PrivetRoutes = ({ children,allowRoles }) => {
  const { user } = useAuthContext();
  if (user === null) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;

  if (allowRoles && !allowRoles.includes(user.role)) return <Navigate to="/" />;

  return children;
};

export default PrivetRoutes;
