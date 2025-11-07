import { useForm } from "react-hook-form";
import useAuthContext from "../hooks/useAuthContext";
import ErrorAlert from "../components/ErrorAlert";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loginUser, error } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const loggedUser = await loginUser(data);
      console.log("Looged in user:",loggedUser);
      // if (!loggedUser) return;
      if (loggedUser?.role ==='ADMIN' || loggedUser?.role==='EDITOR'){
        navigate("/dashboard");
      }else {
        navigate('/')
      }
    } catch (error) {
      console.log("Login Failed", error);
      navigate('/login')
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl px-8 py-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          {error && <ErrorAlert error={error} />}
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            Welcome Back
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Sign in to your NewsIque account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email Address
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              id="email"
              type="email"
              placeholder="name@example.com"
              className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500${
                errors.email ? "input-error" : ""
              }`}
            />
            {errors.email && (
              <span className="label-text-alt text-error">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                {...register("password", { required: "Password is required" })}
                id="password"
                type="password"
                placeholder="••••••••"
                className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  errors.email ? "input-error" : ""
                }`}
              />
              {errors.password && (
                <span className="label-text-alt text-error">
                  {errors.password.message}
                </span>
              )}

            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-all"
          >
            {loading ? "Signing":'Sign in'}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Dont have an account?{" "}
          <Link  to='/register' className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
