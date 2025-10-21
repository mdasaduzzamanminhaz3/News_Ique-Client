import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import ErrorAlert from "../components/ErrorAlert";
import { useState } from "react";

const Register = () => {
    const {registerUser,error} = useAuthContext();
    const [successMsg,setSuccessMsg] = useState("");
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    // const navigate = useNavigate();
    const {register,handleSubmit,formState:{errors},watch} = useForm();
    const onSubmit = async (data) => {
      delete data.confirm_password;
      setLoading(true);
        try {
           const response = await registerUser(data);
           if(response.success){
            setSuccessMsg(response.message);
            setTimeout(() => navigate("/login"),3000);
           }

        } catch (error) {
            console.log("Registration Faield",error);
        } finally{
          setLoading(false);
        }
    };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl px-8 py-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          {error && <ErrorAlert error={error} />}
          {successMsg && (
            <div role="alert" className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{successMsg}</span>
            </div>
          )}
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            Create an Account
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Join NewsIque and stay informed every day.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* First Name */}
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              First Name
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              placeholder="Enter your  First Name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              {...register("first_name", {
                required: "First Name is required",
              })}
            />
            {errors.first_name && (
              <span className="label-text-alt text-error">
                {errors.first_name.message}
              </span>
            )}
          </div>
          {/* last name */}
          <div>
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Last Name
            </label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Enter your Last Name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              {...register("last_name", { required: "Last Name is required" })}
            />
            {errors.last_name && (
              <span className="label-text-alt text-error">
                {errors.last_name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="label-text-alt text-error">
                {errors.email.message}
              </span>
            )}
          </div>
          {/* phone number */}
          <div>
            <label
              htmlFor="phone_number"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Phone Number
            </label>
            <input
              id="phone_number"
              name="phone_number"
              type="text"
              placeholder="Enter your Number"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              {...register("phone_number")}
            />
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
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="label-text-alt text-error">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                {...register("confirm_password", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Password do not match",
                })}
              />
              {errors.confirm_password && (
                <span className="label-text-alt text-error">
                  {errors.confirm_password.message}
                </span>
              )}
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="cursor-pointer w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-all"
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
