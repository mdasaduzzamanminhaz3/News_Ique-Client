import { Edit3, Save, X, Loader2 } from "lucide-react";

const ProfileButtons = ({ isEditing, setIsEditing, isSubmitting }) => {
  return (
    <div className="flex justify-center pt-8 border-t border-gray-200 mt-10">
      {isEditing ? (
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          
          {/* Save Changes Button - Glowing Blue */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto group relative overflow-hidden bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-black py-4 px-12 rounded-2xl transition-all shadow-lg shadow-blue-500/30 active:scale-[0.98] flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span className="uppercase tracking-widest text-xs">Processing...</span>
              </>
            ) : (
              <>
                <Save size={20} className="group-hover:scale-110 transition-transform" />
                <span className="uppercase tracking-widest text-xs">Update Profile</span>
              </>
            )}
            {/* Glossy Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>

          {/* Cancel Button - Clean Border Style */}
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-4 bg-white hover:bg-gray-50 text-gray-600 hover:text-red-500 rounded-2xl border-2 border-gray-200 hover:border-red-200 transition-all font-black text-xs uppercase tracking-widest active:scale-[0.98]"
          >
            <X size={18} />
            Discard
          </button>
        </div>
      ) : (
        /* Initial Edit Profile Button - Bold Dark Style */
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="group flex items-center justify-center gap-4 bg-slate-900 hover:bg-blue-600 text-white font-black py-4 px-14 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-blue-500/40 active:scale-[0.96]"
        >
          <div className="p-2 bg-white/10 group-hover:bg-white/20 rounded-lg transition-colors">
            <Edit3 size={18} className="text-blue-400 group-hover:text-white" />
          </div>
          <span className="uppercase tracking-[0.2em] text-xs">Modify Profile</span>
        </button>
      )}
    </div>
  );
};

export default ProfileButtons;