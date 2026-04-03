import { useForm } from "react-hook-form";
import { Send, Star, MessageSquare, Loader2 } from "lucide-react";
import StarRating from "./StarRating";

const ReviewForm = ({ onSubmit }) => {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const ratingValue = watch("ratings", 0);

  return (
    <form 
      className="bg-white border border-gray-200 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-blue-500/5 relative overflow-hidden" 
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Decorative Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
          <MessageSquare size={20} />
        </div>
        <div>
          <h3 className="text-lg font-black text-slate-800 tracking-tight uppercase">Write a Review</h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Share your thoughts with the community</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Star Rating Section */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-[11px] font-black text-blue-600 uppercase tracking-[0.2em] ml-1">
            <Star size={14} fill="currentColor" /> Select Rating
          </label>
          <div className="p-5 bg-gray-50 border border-gray-100 rounded-3xl inline-block transition-all hover:border-blue-200 hover:bg-white">
            <StarRating
              onChange={(value) => setValue("ratings", value, { shouldValidate: true })}
              rating={ratingValue}
            />
          </div>
          {errors.ratings && (
            <p className="text-red-500 text-[10px] font-bold mt-2 ml-1 uppercase tracking-tighter italic">
               ⚠ Please provide a rating
            </p>
          )}
          <input type="hidden" {...register("ratings", { required: true, min: 1 })} />
        </div>

        {/* Comment Section */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-[11px] font-black text-blue-600 uppercase tracking-[0.2em] ml-1">
            <MessageSquare size={14} /> Detailed Experience
          </label>
          <div className="relative">
            <textarea
              {...register("comment", { required: true })}
              className={`w-full min-h-[150px] p-6 bg-gray-50 border ${errors.comment ? 'border-red-500' : 'border-gray-200'} rounded-3xl text-slate-900 font-medium outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400`}
              placeholder="What did you like or dislike? Your feedback helps others..."
            />
          </div>
          {errors.comment && (
            <p className="text-red-500 text-[10px] font-bold mt-1 ml-1 uppercase tracking-tighter italic">
              ⚠ Your comment cannot be empty
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full md:w-auto overflow-hidden bg-slate-900 hover:bg-blue-600 disabled:bg-gray-300 text-white font-black py-4 px-12 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-blue-500/30 active:scale-[0.98] flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span className="uppercase tracking-widest text-xs">Publishing...</span>
              </>
            ) : (
              <>
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                <span className="uppercase tracking-widest text-xs">Post Review</span>
              </>
            )}
            {/* Glossy Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReviewForm;