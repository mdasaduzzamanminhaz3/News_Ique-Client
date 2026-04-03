import { User, Mail, Phone, AtSign } from "lucide-react";

const ProfileForm = ({ register, errors, isEditing }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
      
      {/* First Name */}
      <div className="space-y-3 group">
        <label className="text-xs font-bold text-blue-500 uppercase tracking-widest ml-1 flex items-center gap-2">
          <User size={14} /> First Name
        </label>
        <div className="relative">
          <input
            type="text"
            disabled={!isEditing}
            className={`w-full px-6 py-4 bg-white border ${errors.first_name ? 'border-red-500' : 'border-gray-300'} rounded-2xl text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-semibold placeholder:text-gray-400 disabled:bg-gray-100 disabled:text-gray-500 shadow-sm`}
            placeholder="Enter first name"
            {...register("first_name", { required: "First name is required" })}
          />
          {errors.first_name && (
            <p className="text-red-500 text-[11px] font-bold mt-2 ml-1 uppercase">
              {errors.first_name.message}
            </p>
          )}
        </div>
      </div>

      {/* Last Name */}
      <div className="space-y-3 group">
        <label className="text-xs font-bold text-blue-500 uppercase tracking-widest ml-1 flex items-center gap-2">
          <AtSign size={14} /> Last Name
        </label>
        <div className="relative">
          <input
            type="text"
            disabled={!isEditing}
            className="w-full px-6 py-4 bg-white border border-gray-300 rounded-2xl text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-semibold placeholder:text-gray-400 disabled:bg-gray-100 disabled:text-gray-500 shadow-sm"
            placeholder="Enter last name"
            {...register("last_name")}
          />
        </div>
      </div>

      {/* Email Address - Read Only */}
      <div className="space-y-3 group md:col-span-2">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
          <Mail size={14} /> Email Address (Read Only)
        </label>
        <div className="relative">
          <input
            type="email"
            disabled
            className="w-full px-6 py-4 bg-gray-200 border border-gray-300 rounded-2xl text-gray-600 outline-none font-medium italic cursor-not-allowed shadow-inner"
            {...register("email")}
          />
        </div>
      </div>

      {/* Phone Number */}
      <div className="space-y-3 group md:col-span-2">
        <label className="text-xs font-bold text-blue-500 uppercase tracking-widest ml-1 flex items-center gap-2">
          <Phone size={14} /> Phone Number
        </label>
        <div className="relative">
          <input
            type="text"
            disabled={!isEditing}
            className="w-full px-6 py-4 bg-white border border-gray-300 rounded-2xl text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-semibold placeholder:text-gray-400 disabled:bg-gray-100 disabled:text-gray-500 shadow-sm"
            placeholder="+880 1XXX-XXXXXX"
            {...register("phone_number")}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;