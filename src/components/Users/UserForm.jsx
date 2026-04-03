import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User, Mail, ShieldCheck, Activity, Save, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import authApiClient from "../../services/auth-api-client";
import ErrorAlert from "../ErrorAlert";

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await authApiClient.get(`/api/v1/users_list/${id}/`);
      setUser(res.data);
    } catch (err) {
      setError("Failed to fetch user data. Please try again.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    try {
      await authApiClient.put(`/api/v1/users_list/${id}/`, user);
      setMessage("User profile updated successfully!");
      setTimeout(() => navigate("/dashboard/users"), 1800);
    } catch (err) {
      setError("Update failed. Please check your inputs.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user && !error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-blue-500" size={40} />
        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Synchronizing User Data...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto pt-24 md:pt-32">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 group text-xs font-black uppercase tracking-widest"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Directory
      </button>

      <div className="relative overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
        
        {/* Decorative Header Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full -z-10"></div>

        <div className="mb-10">
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic flex items-center gap-3">
            <User className="text-blue-500" size={28} />
            Edit <span className="text-blue-500">Profile</span>
          </h2>
          <p className="text-gray-500 mt-2 text-[10px] font-bold uppercase tracking-[0.2em]">Manage permissions and personal details</p>
        </div>

        {error && <div className="mb-6"><ErrorAlert error={error} /></div>}
        
        {message && (
          <div className="mb-6 flex items-center gap-3 bg-green-500/10 border border-green-500/20 p-4 rounded-2xl animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="text-green-400" size={18} />
            <span className="text-green-400 text-xs font-black uppercase tracking-wider">{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest ml-1">First Name</label>
              <div className="relative group">
                <input
                  type="text"
                  name="first_name"
                  value={user.first_name || ""}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium placeholder:text-gray-600"
                  placeholder="John"
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest ml-1">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={user.last_name || ""}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium placeholder:text-gray-600"
                placeholder="Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest ml-1">
              <Mail size={12} /> Email Address
            </label>
            <input
              type="email"
              name="email"
              value={user.email || ""}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium placeholder:text-gray-600"
              placeholder="email@newsique.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Role Select */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest ml-1">
                <ShieldCheck size={12} /> Access Role
              </label>
              <select
                name="role"
                value={user.role || ""}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold appearance-none cursor-pointer"
              >
                <option value="ADMIN" className="bg-[#020617]">Admin</option>
                <option value="EDITOR" className="bg-[#020617]">Editor</option>
                <option value="SUBSCRIBER" className="bg-[#020617]">Subscriber</option>
              </select>
            </div>

            {/* Status Select */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest ml-1">
                <Activity size={12} /> Account Status
              </label>
              <select
                name="is_active"
                value={user.is_active ? "true" : "false"}
                onChange={(e) =>
                  setUser({ ...user, is_active: e.target.value === "true" })
                }
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold appearance-none cursor-pointer"
              >
                <option value="true" className="bg-[#020617]">Active</option>
                <option value="false" className="bg-[#020617]">Inactive</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSaving}
            className="group relative w-full mt-8 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            {isSaving ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Processing...
              </>
            ) : (
              <>
                <Save size={18} />
                Deploy Changes
              </>
            )}
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;