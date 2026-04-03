import { useState } from "react";
import { FiLock, FiEye, FiEyeOff, FiChevronDown, FiChevronUp, FiShield } from "react-icons/fi";

const PasswordChangeForm = ({ register, errors, watch, isEditing }) => {
  const [isPasswordSectionOpen, setIsPasswordSectionOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mt-8">
      {/* Toggle Button - Transparent to Solid on Open */}
      <button
        type="button"
        className={`flex items-center justify-between w-full p-5 rounded-2xl border-2 transition-all duration-300 ${
          isPasswordSectionOpen 
          ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20" 
          : "bg-white/5 border-white/10 text-gray-400 hover:border-blue-500/50 hover:text-blue-400"
        }`}
        onClick={() => setIsPasswordSectionOpen(!isPasswordSectionOpen)}
      >
        <div className="flex items-center gap-3">
          <FiShield size={20} />
          <span className="font-black text-xs uppercase tracking-[0.15em]">Security & Password</span>
        </div>
        {isPasswordSectionOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
      </button>

      {isPasswordSectionOpen && (
        <div className="mt-4 space-y-6 p-8 bg-white rounded-[2rem] border border-gray-200 shadow-xl animate-in slide-in-from-top-4 duration-300">
          
          <div className="flex items-center gap-2 border-b border-gray-100 pb-4 mb-2">
            <FiLock className="text-blue-600" size={16} />
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Update Credentials</h4>
          </div>

          {/* Current Password */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-blue-600 uppercase tracking-widest ml-1">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full px-6 py-4 bg-gray-50 border ${errors.current_password ? 'border-red-500' : 'border-gray-200'} rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm font-bold placeholder:text-gray-400 disabled:opacity-50`}
                disabled={!isEditing}
                placeholder="••••••••"
                {...register("current_password", {
                  required: "Current password is required",
                })}
              />
            </div>
            {errors.current_password && (
              <p className="text-red-500 text-[10px] font-bold mt-1 ml-1 uppercase">{errors.current_password.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* New Password */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-blue-600 uppercase tracking-widest ml-1">New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full px-6 py-4 bg-gray-50 border ${errors.new_password ? 'border-red-500' : 'border-gray-200'} rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm font-bold placeholder:text-gray-400 disabled:opacity-50`}
                disabled={!isEditing}
                placeholder="Min. 8 chars"
                {...register("new_password", {
                  required: "New password is required",
                  minLength: { value: 8, message: "Min 8 characters" },
                })}
              />
              {errors.new_password && (
                <p className="text-red-500 text-[10px] font-bold mt-1 ml-1 uppercase">{errors.new_password.message}</p>
              )}
            </div>

            {/* Confirm New Password */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-blue-600 uppercase tracking-widest ml-1">Confirm New</label>
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full px-6 py-4 bg-gray-50 border ${errors.confirm_new_password ? 'border-red-500' : 'border-gray-200'} rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm font-bold placeholder:text-gray-400 disabled:opacity-50`}
                disabled={!isEditing}
                placeholder="Re-type new"
                {...register("confirm_new_password", {
                  validate: (value) => value === watch("new_password") || "Not matching",
                })}
              />
              {errors.confirm_new_password && (
                <p className="text-red-500 text-[10px] font-bold mt-1 ml-1 uppercase">{errors.confirm_new_password.message}</p>
              )}
            </div>
          </div>

          {/* Show Password Switch */}
          {isEditing && (
            <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl mt-4 transition-all">
              <div className="flex items-center gap-3 text-slate-600">
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                <span className="text-[10px] font-black uppercase tracking-widest">Show Characters</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <div className="w-10 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordChangeForm;