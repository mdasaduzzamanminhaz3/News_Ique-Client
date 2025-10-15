import { useState } from "react";
import apiClient from "../services/api-client";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  };
  const [authTokens, setAuthTokens] = useState(getToken());
  // Login user
  const loginUser = async (email, password) => {
    const res = await apiClient.post("/auth/jwt/create/", {
      email,
      password,
    });
    console.log(res.data);
  };

  return { user, loginUser };
};
export default useAuth;
