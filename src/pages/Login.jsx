import { useForm } from "react-hook-form";
import useAuthContext from "../hooks/useAuthContext";
import ErrorAlert from "../components/ErrorAlert";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail, Lock, LogIn, Loader2, ArrowRight } from "lucide-react";

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
      if (loggedUser?.role === 'ADMIN' || loggedUser?.role === 'EDITOR') {
        navigate("/dashboard");
      } else {
        navigate('/');
      }
    } catch (err) {
      console.log("Login Failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#020617] overflow-hidden px-4">
      
      {/* Background 3D Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full animate-pulse delay-700"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Glassmorphism Card */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 hover:shadow-blue-500/10">
          
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/40 rotate-3 hover:rotate-0 transition-transform duration-300">
              <LogIn className="text-white w-8 h-8" />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tighter">
              Welcome <span className="text-blue-500">Back</span>
            </h2>
            <p className="text-gray-400 text-sm mt-2 font-medium">
              Access your personalized NewsIque dashboard
            </p>
          </div>

          {error && <div className="mb-6"><ErrorAlert error={error} /></div>}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  placeholder="name@example.com"
                  className={`w-full pl-12 pr-4 py-4 bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Password
                </label>
                <a href="#" className="text-xs text-blue-500 hover:text-blue-400 font-bold">Forgot?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  {...register("password", { required: "Password is required" })}
                  type="password"
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-4 py-4 bg-white/5 border ${errors.password ? 'border-red-500' : 'border-white/10'} rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600`}
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/30 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <div className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center mt-10">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-white font-bold hover:text-blue-500 transition-colors underline decoration-blue-500/30 underline-offset-4">
                Register here
              </Link>
            </p>
          </div>

        </div>

        {/* Decorative Badge */}
        <p className="text-center text-gray-600 text-[10px] mt-8 uppercase tracking-[0.3em] font-black opacity-50">
          NewsIque Secure Access System
        </p>
      </div>
    </div>
  );
};

export default Login;