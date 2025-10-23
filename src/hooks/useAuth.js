import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  };
  const [authTokens, setAuthTokens] = useState(getToken());
  useEffect(() => {
    if (authTokens) fetchUserProfile();
  }, [authTokens]);
  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const response = await apiClient.get("/auth/users/me/", {
        headers: { Authorization: `JWT ${authTokens?.access}` },
      });
      setUser(response.data);
    } catch (error) {
      console.log("Error fetching user", error);
    }
  };
  //Update user Profile

  const updateUserProfile = async (data) => {
    setError("")
    try {
      apiClient.put("/auth/users/me/",data,{headers:{
        Authorization:`JWT ${authTokens?.access}`
      }})
    } catch (error) {
      console.log(error);
    }
  }

  // Login user
  const loginUser = async (userData) => {
    setError("");
    try {
      const response = await apiClient.post("/auth/jwt/create/", userData);
      setAuthTokens(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));

      // after login set user
      await fetchUserProfile();
    } catch (error) {
      setError(error.response.data?.detail);
    }
  };

  //register user
  const registerUser = async (userData) => {
    setError("");
    try {
      await apiClient.post("/auth/users/", userData);

      return {
        success: true,
        message: "Registration successful.Check your email to activate your account.",
      };
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = Object.values(error.response.data)
          .flat()
          .join("\n");
        setError(errorMessage);
        return { success: false, message: errorMessage };
      }
      setError("Registration failed. Please try again!");
      return {
        success: false,
        message: "Registration failed. Please try again!",
      };
    }
  };
  //Logout user

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  return { user, loginUser, registerUser, logoutUser,updateUserProfile, error };
};
export default useAuth;
