import { Save, X, MessageSquare, Star } from "lucide-react";
import StarRating from "./StarRating";

const EditReviewForm = ({
  editReview,
  setEditReview,
  onCancelEdit,
  onSave,
}) => {
  return (
    <div className="mt-6 space-y-6 bg-white rounded-[2rem] p-8 border border-gray-200 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
      
      {/* Header Indicator */}
      <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
          <Edit3 size={16} />
        </div>
        <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">
          Edit Your Experience
        </h4>
      </div>

      {/* Star Rating Section */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-[11px] font-black text-blue-600 uppercase tracking-[0.15em] ml-1">
          <Star size={14} fill="currentColor" /> Change Rating
        </label>
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 inline-block transition-all hover:border-blue-200">
          <StarRating
            rating={editReview.ratings}
            onChange={(value) => setEditReview({ ...editReview, ratings: value })}
          />
        </div>
      </div>

      {/* Comment Section */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-[11px] font-black text-blue-600 uppercase tracking-[0.15em] ml-1">
          <MessageSquare size={14} /> Update Comment
        </label>
        <textarea
          value={editReview.comment}
          onChange={(e) =>
            setEditReview({ ...editReview, comment: e.target.value })
          }
          placeholder="Share your updated thoughts..."
          className="w-full min-h-[120px] p-5 bg-gray-50 border border-gray-200 rounded-2xl text-slate-900 font-medium outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button 
          onClick={onSave} 
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all"
        >
          <Save size={16} />
          Save Changes
        </button>
        
        <button 
          onClick={onCancelEdit} 
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white hover:bg-gray-50 text-gray-500 border border-gray-200 rounded-xl font-black text-[10px] uppercase tracking-widest active:scale-[0.98] transition-all"
        >
          <X size={16} />
          Discard
        </button>
      </div>
    </div>
  );
};

export default EditReviewForm;