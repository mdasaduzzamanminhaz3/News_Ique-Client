import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { User, ShieldCheck, CheckCircle2, Loader2, UserCircle, Settings } from "lucide-react";
import ProfileForm from "../components/Dashboard/Profile/ProfileForm";
import ProfileButtons from "../components/Dashboard/Profile/ProfileButtons";
import PasswordChangeForm from "../components/Dashboard/Profile/PasswordChangeForm";
import useAuthContext from "../hooks/useAuthContext";
import ErrorAlert from "../components/ErrorAlert";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateUserProfile, changePassword, error } = useAuthContext();
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  // Initializing form values
  useEffect(() => {
    if (user) {
      Object.keys(user).forEach((key) => setValue(key, user[key]));
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    setSuccessMsg("");
    try {
      // 1. Profile Update
      const profilePayload = {
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
      };
      await updateUserProfile(profilePayload);
      
      // 2. Password Change (Only if fields are filled)
      if (data.current_password && data.new_password) {
        await changePassword({
          current_password: data.current_password,
          new_password: data.new_password,
        });
      }

      setSuccessMsg("Identity parameters synchronized successfully.");
      setIsEditing(false); // Close edit mode after success
    } catch (err) {
      console.error("Profile Sync Error:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      
      {/* Page Header */}
      <div className="mb-10 text-center md:text-left animate-in fade-in slide-in-from-top-4 duration-700">
        <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic flex items-center justify-center md:justify-start gap-3">
          <UserCircle className="text-blue-500" size={36} />
          Account <span className="text-blue-500 underline decoration-blue-500/20">Terminal</span>
        </h2>
        <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">
          Encrypted Access // {user?.username || "Authorized User"}
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
        
        {/* Glow Decor */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -z-10"></div>

        <div className="p-8 md:p-12">
          
          {/* Notifications Area */}
          <div className="space-y-4 mb-8">
            {error && <ErrorAlert error={error} />}
            {successMsg && (
              <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 p-4 rounded-2xl animate-in fade-in slide-in-from-top-2">
                <CheckCircle2 className="text-green-400" size={20} />
                <span className="text-green-400 text-xs font-black uppercase tracking-widest">{successMsg}</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            
            {/* Profile Section Label */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] border-b border-white/5 pb-2">
                <User size={14} /> Basic Information
              </div>
              <ProfileForm
                register={register}
                errors={errors}
                isEditing={isEditing}
              />
            </div>

            {/* Security Section Label */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-[10px] font-black text-purple-500 uppercase tracking-[0.3em] border-b border-white/5 pb-2">
                <ShieldCheck size={14} /> Security & Credentials
              </div>
              <div className={isEditing ? "opacity-100" : "opacity-40 grayscale transition-all"}>
                <PasswordChangeForm
                  register={register}
                  errors={errors}
                  isEditing={isEditing}
                  watch={watch}
                />
              </div>
            </div>

            {/* Action Buttons Container */}
            <div className="pt-6 border-t border-white/5">
              <ProfileButtons
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                isSubmitting={isSubmitting}
              />
            </div>

          </form>
        </div>

        {/* System Metadata Overlay */}
        <div className="bg-white/[0.02] p-4 flex justify-between items-center px-8 border-t border-white/5">
           <div className="flex items-center gap-2 text-[8px] font-black text-gray-600 uppercase tracking-widest">
              <Settings size={10} /> System Status: Optimized
           </div>
           <div className="text-[8px] font-black text-gray-700 uppercase tracking-widest">
              NewsIque Core v3.0
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;