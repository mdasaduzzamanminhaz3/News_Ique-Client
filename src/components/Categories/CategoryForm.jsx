import { useState } from "react";
import { useForm } from "react-hook-form";
import authApiClient from "../../services/auth-api-client";
import { useNavigate } from "react-router";
import ErrorAlert from "../ErrorAlert";
import { Layers, AlignLeft, ShieldCheck, PlusCircle, Loader2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CategoryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg("");
    
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("is_premium", data.is_premium || false);

    try {
      const res = await authApiClient.post("/api/v1/categories/", formData);
      setSuccessMsg(res.data.message || "Category Created Successfully!");
      setTimeout(() => navigate("/dashboard/categories"), 2000);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Back Link */}
        <Link 
          to="/dashboard/categories" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors mb-6 font-medium group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Categories
        </Link>

        {/* Form Card */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Decorative Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full"></div>

          {/* Header */}
          <div className="relative z-10 mb-10 text-center md:text-left">
            <div className="inline-flex p-4 bg-blue-600/20 rounded-2xl mb-4">
              <PlusCircle className="text-blue-500" size={32} />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Create <span className="text-blue-500">Category</span>
            </h2>
            <p className="text-gray-400 text-sm mt-2 font-medium">Add a new classification for your news articles</p>
          </div>

          {/* Alerts */}
          <div className="mb-6 space-y-4 relative z-10">
            {successMsg && (
              <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-2xl animate-in fade-in slide-in-from-top-4">
                <ShieldCheck size={20} />
                <span className="text-sm font-bold">{successMsg}</span>
              </div>
            )}
            {errorMsg && <ErrorAlert error={errorMsg} />}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
            
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1 flex items-center gap-2">
                <Layers size={14} /> Category Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                className={`w-full px-6 py-4 bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all font-bold placeholder:text-gray-600`}
                placeholder="e.g. Technology"
              />
              {errors.name && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">This field is required</p>}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1 flex items-center gap-2">
                <AlignLeft size={14} /> Brief Description
              </label>
              <textarea
                {...register("description", { required: "Description is required" })}
                rows="4"
                className={`w-full px-6 py-4 bg-white/5 border ${errors.description ? 'border-red-500' : 'border-white/10'} rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all leading-relaxed placeholder:text-gray-600`}
                placeholder="What kind of news belongs here?"
              />
              {errors.description && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">This field is required</p>}
            </div>

            {/* Premium Toggle */}
            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl group hover:border-blue-500/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <ShieldCheck className="text-yellow-500" size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Premium Access</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Only for paid subscribers</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register("is_premium")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98] disabled:opacity-70 mt-4"
            >
              <div className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Processing...
                  </>
                ) : (
                  <>
                    Create Category
                    <PlusCircle size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                  </>
                )}
              </div>
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-[10px] mt-8 uppercase tracking-[0.3em] font-black opacity-40">
          NewsIque Taxonomy Engine v2.0
        </p>
      </div>
    </div>
  );
};

export default CategoryForm;