import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import authApiClient from "../services/auth-api-client";

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

  const handleAPIError = (
    error,
    defaultMessage = "Something went wrong! Try again"
  ) => {
    if (error.response && error.response.data) {
      const errorMessage = Object.values(error.response.data).flat().join("\n");
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
    setError(defaultMessage);
    return {
      success: false,
      message: defaultMessage,
    };
  };

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const response = await apiClient.get("/auth/users/me/", {
        headers: { Authorization: `JWT ${authTokens?.access}` },
      });
      setUser(response.data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching user", error);
    }
  };
  //Update user Profile

  const updateUserProfile = async (data) => {
    setError("");
    try {
     await apiClient.patch("/auth/users/me/", data, {
        headers: {
          Authorization: `JWT ${authTokens?.access}`,
        },
      });
    } catch (error) {
      return handleAPIError(error)
    }
  };

  //Change password
  const changePassword = async (data) => {
    setError("");
    try {
      await authApiClient.post("/auth/users/set_password/",data);
    } catch (error) {
      return handleAPIError(error);
    }
  };
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
        message:
          "Registration successful.Check your email to activate your account.",
      };
    } catch (error) {
      return handleAPIError(error, "Registration Failed!");
    }
  };
  //Logout user

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  return {
    user,
    loginUser,
    registerUser,
    logoutUser,
    updateUserProfile,
    changePassword,
    error,
  };
};
export default useAuth;
