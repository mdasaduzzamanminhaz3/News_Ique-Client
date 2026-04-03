import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import authApiClient from "../../services/auth-api-client";
import { 
  Image as ImageIcon, 
  Type, 
  AlignLeft, 
  Layers, 
  Send, 
  Loader2, 
  ArrowLeft,
  X,
  ShieldCheck
} from "lucide-react";
import { Link } from "react-router-dom";

const UpdateArticle = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const navigate = useNavigate();
  const [prevImage, setPrevImage] = useState([]);
  const [categories, setCategories] = useState([]);
  const [clearImage, setClearImage] = useState(false);

  // Default Image Fallback
  const defaultImage = "https://images.unsplash.com/photo-1585829365234-78d2b98ad752?q=80&w=800&auto=format&fit=crop";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      headline: "",
      body: "",
      category: "",
      is_published: false,
    },
  });

  useEffect(() => {
    setFetchLoading(true);
    // Fetch categories
    authApiClient.get("/api/v1/categories/").then((res) => {
      setCategories(res.data?.results || res.data);
    });

    // Fetch existing article
    authApiClient.get(`/api/v1/articles/${id}/`)
      .then((res) => {
        const article = res.data;
        reset({
          headline: article.headline,
          body: article.body,
          category: article.category?.id || article.category,
          is_published: !!article.published_at,
        });
        setPrevImage(article.image ? [article.image] : []);
      })
      .catch(err => console.error("Could not fetch article", err))
      .finally(() => setFetchLoading(false));
  }, [id, reset]);

  const handleEditArticle = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("headline", data.headline);
      formData.append("body", data.body);
      formData.append("category", data.category);
      formData.append("is_published", data.is_published);

      const hasNewImage = data.image && data.image.length > 0;
      if (hasNewImage) {
        formData.append("image", data.image[0]);
      } else if (clearImage) {
        formData.append("image", ""); 
      }

      await authApiClient.patch(`/api/v1/articles/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/dashboard/article-page");
    } catch (err) {
      console.error("Error updating article:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPrevImage([URL.createObjectURL(file)]);
      setClearImage(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] p-4 md:p-8 relative overflow-hidden">
      
      {/* Background 3D Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/5 blur-[140px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/5 blur-[140px] rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 pt-16">
        
        {/* Breadcrumb / Back button */}
        <Link 
          to="/dashboard/article-page" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors mb-8 font-medium group"
        >
          <div className="p-2 bg-white/5 rounded-full group-hover:-translate-x-1 transition-transform">
            <ArrowLeft size={18} />
          </div>
          Back to Articles
        </Link>

        {/* Form Card */}
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-8">
            <div className="p-4 bg-blue-600/20 rounded-2xl rotate-3">
              <Type className="text-blue-500" size={32} />
            </div>
            <div>
              <h2 className="text-4xl font-black text-white tracking-tight">Edit <span className="text-blue-500">Article</span></h2>
              <p className="text-gray-400 text-sm mt-1 font-medium">Update your content and visibility settings</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(handleEditArticle)} className="space-y-10">
            
            {/* Headline & Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Headline Section */}
              <div className="md:col-span-2 space-y-2 relative group">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1 flex items-center gap-2">
                  <Type size={14} className="text-blue-500" /> Headline
                </label>
                <input
                  {...register("headline", { required: "Headline is required" })}
                  placeholder="Enter a catchy headline..."
                  className={`w-full px-6 py-5 bg-white/5 border ${errors.headline ? 'border-red-500' : 'border-white/10'} rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all text-xl font-bold placeholder:text-gray-600 shadow-inner`}
                />
                {errors.headline && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.headline.message}</p>}
              </div>

              {/* Category Section */}
              <div className="space-y-2 relative group">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1 flex items-center gap-2">
                  <Layers size={14} className="text-blue-500" /> Category
                </label>
                <select
                  {...register("category", { required: "Category is required" })}
                  className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all appearance-none cursor-pointer text-sm"
                >
                  <option value="" className="bg-[#0f172a]">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-[#0f172a]">
                      {cat.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-6 top-[55px] text-gray-500 pointer-events-none">▼</div>
              </div>
            </div>

            {/* Content & Image Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Body Section */}
              <div className="lg:col-span-8 space-y-2 relative group">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1 flex items-center gap-2">
                  <AlignLeft size={14} className="text-blue-500" /> Content Body
                </label>
                <textarea
                  {...register("body", { required: "Content is required" })}
                  rows="15"
                  placeholder="Write your story here..."
                  className={`w-full px-6 py-5 bg-white/5 border ${errors.body ? 'border-red-500' : 'border-white/10'} rounded-3xl text-gray-100 outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all font-serif text-lg leading-[1.8] placeholder:text-gray-600 shadow-inner resize-none`}
                />
                {errors.body && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.body.message}</p>}
              </div>

              {/* Image Upload & Status Side */}
              <div className="lg:col-span-4 space-y-8">
                
                {/* Image Section */}
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1 flex items-center gap-2">
                    <ImageIcon size={14} className="text-blue-500" /> Feature Image
                  </label>
                  
                  {/* Image Preview / Fallback */}
                  <div className="relative group rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-video bg-gray-900 flex items-center justify-center">
                    <img 
                      src={prevImage[0] || defaultImage} 
                      onError={(e) => { e.target.src = defaultImage }}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      alt="Preview" 
                    />
                    {prevImage.length > 0 && prevImage[0] && (
                      <button 
                        type="button"
                        onClick={() => { setPrevImage([]); setClearImage(true); }}
                        className="absolute top-3 right-3 p-2 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity active:scale-95"
                      >
                        <X size={16} />
                      </button>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/60 backdrop-blur-md text-white text-[10px] text-center font-bold uppercase tracking-tighter">Current Preview</div>
                  </div>

                  {/* Upload Button */}
                  <div className="relative group overflow-hidden rounded-2xl border-2 border-dashed border-white/10 hover:border-blue-500/50 transition-all p-2 bg-white/5">
                    <input
                      type="file"
                      accept="image/*"
                      {...register("image", { onChange: handleImageChange })}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <div className="py-6 flex flex-col items-center justify-center text-gray-500 group-hover:text-blue-400 transition-colors">
                      <ImageIcon size={28} className="mb-2" />
                      <span className="text-xs font-bold uppercase tracking-wider">Upload New Image</span>
                    </div>
                  </div>
                </div>

                {/* Status Section */}
                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl shadow-inner relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-500/10 rounded-lg">
                                <ShieldCheck className="text-yellow-500" size={18} />
                            </div>
                            <p className="text-sm font-bold text-white">Visibility Status</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                            type="checkbox"
                            {...register("is_published")}
                            className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">Toggle to publish your article immediately. Unpublished articles save as drafts.</p>
                </div>

              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-10 border-t border-white/10">
              <button
                type="submit"
                disabled={loading}
                className="w-full relative group overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl transition-all shadow-2xl shadow-blue-600/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="relative z-10 flex items-center justify-center gap-3 uppercase tracking-widest text-sm">
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Updating Database...
                    </>
                  ) : (
                    <>
                      Save & Update Changes
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </div>
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-gray-600 text-[10px] mt-12 uppercase tracking-[0.3em] font-black opacity-40">
          NewsIque Taxonomy Engine v2.0 | SECURE ACCESS
        </p>
      </div>
    </div>
  );
};

export default UpdateArticle;