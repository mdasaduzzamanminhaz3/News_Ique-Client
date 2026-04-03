import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { 
  Type, 
  FileText, 
  Tag, 
  Image as ImageIcon, 
  Globe, 
  CloudUpload, 
  Loader2, 
  CheckCircle2,
  XCircle
} from "lucide-react";
import authApiClient from "../services/auth-api-client";
import apiClient from "../services/api-client";
import ErrorAlert from "../components/ErrorAlert";

const AddArticle = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      is_published: true
    }
  });

  const [prevImage, setPrevImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");

  // Fetching categories
  useEffect(() => {
    apiClient.get("/api/v1/categories/")
      .then((res) => setCategories(res?.data.results))
      .catch(() => setError("Failed to load categories."));
  }, []);

  // Handle image change & preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPrevImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const formData = new FormData();
      formData.append("headline", data.headline);
      formData.append("body", data.body);
      formData.append("category", data.category);
      formData.append("is_published", data.is_published ? "true" : "false");

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const response = await authApiClient.post("/api/v1/articles/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMsg("Article deployed to the grid successfully!");
      // Optional: Reset form here
    } catch (err) {
      setError(err.response?.data?.details || "Failed to broadcast article.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 md:px-0">
      
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic flex items-center gap-3">
          <CloudUpload className="text-blue-500" size={36} />
          Broadcast <span className="text-blue-500">New Content</span>
        </h2>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-2 ml-1">
          Authorized Terminal // NewsIque Content Management
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        {/* Glow Decor */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -z-10"></div>

        {/* Notifications */}
        <div className="space-y-4 mb-8">
          {successMsg && (
            <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 p-4 rounded-2xl animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="text-green-400" size={20} />
              <span className="text-green-400 text-xs font-black uppercase tracking-widest">{successMsg}</span>
            </div>
          )}
          {error && <ErrorAlert error={error} />}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Headline */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-1">
              <Type size={14} /> Headline
            </label>
            <input
              {...register("headline", { required: "Headline is required" })}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold placeholder:text-gray-600"
              placeholder="Enter article title..."
            />
            {errors.headline && <p className="text-red-500 text-[10px] font-bold uppercase ml-1 tracking-tighter">{errors.headline.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Category */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-1">
                <Tag size={14} /> Taxonomy / Category
              </label>
              <select
                {...register("category", { required: "Please select a category" })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold appearance-none cursor-pointer"
              >
                <option value="" className="bg-[#020617]">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-[#020617]">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-1">
                <Globe size={14} /> Visibility Status
              </label>
              <div 
                className={`flex items-center justify-between px-6 py-4 rounded-2xl border transition-all cursor-pointer ${watch("is_published") ? 'bg-blue-500/10 border-blue-500/30' : 'bg-white/5 border-white/10'}`}
                onClick={() => setValue("is_published", !watch("is_published"))}
              >
                <span className="text-sm font-bold text-gray-300">Live Broadcast</span>
                <input
                  type="checkbox"
                  {...register("is_published")}
                  className="checkbox checkbox-primary border-white/20"
                />
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-1">
              <FileText size={14} /> Narrative / Body
            </label>
            <textarea
              {...register("body", { required: "Content body is required" })}
              rows="8"
              className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium placeholder:text-gray-600 resize-none"
              placeholder="Start writing the impactful story..."
            ></textarea>
          </div>

          {/* Image Upload Area */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-1">
              <ImageIcon size={14} /> Cover Media
            </label>
            <div className="relative group cursor-pointer">
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                onChange={(e) => {
                  handleImageChange(e);
                  register('image').onChange(e);
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="w-full border-2 border-dashed border-white/10 group-hover:border-blue-500/50 rounded-3xl p-8 transition-all bg-white/[0.02] flex flex-col items-center justify-center gap-4">
                {prevImage ? (
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-white/10">
                    <img src={prevImage} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-xs font-black uppercase tracking-widest">Change Image</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <CloudUpload className="text-gray-600 group-hover:text-blue-500 transition-colors" size={40} />
                    <p className="text-xs font-bold text-gray-500 group-hover:text-gray-300">DRAG & DROP OR CLICK TO UPLOAD</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full mt-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <CloudUpload size={18} />
            )}
            {loading ? "INITIALIZING UPLOAD..." : "DEPLOY ARTICLE"}
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddArticle;