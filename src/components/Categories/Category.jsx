import StatCardSkeleton from "../Skeleton/StatCardSkeleton";
import EditForm from "./EditForm";
import { Layers, Edit3, Trash2, AlertCircle } from "lucide-react";

const Category = ({ categories, error, loading, onEdit, onDelete, onSave, onCancel, editingId }) => {

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {[...Array(6)].map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 m-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400">
        <AlertCircle size={20} />
        <span className="font-medium text-sm">Error loading categories: {error}</span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-blue-600/20 rounded-2xl">
          <Layers className="text-blue-500" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Content <span className="text-blue-500">Categories</span></h1>
          <p className="text-gray-400 text-sm">Manage and organize your news classifications</p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(categories) &&
          categories.map((cat) => (
            <div key={cat.id} className="h-full">
              {editingId === cat.id ? (
                <div className="bg-white/10 backdrop-blur-xl border border-blue-500/50 rounded-[2rem] p-6 shadow-2xl shadow-blue-500/10">
                   <EditForm category={cat} onSave={onSave} onCancel={onCancel} />
                </div>
              ) : (
                <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 transition-all duration-500 hover:bg-white/10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/5 overflow-hidden h-full flex flex-col justify-between">
                  
                  {/* Decorative Background Icon */}
                  <Layers className="absolute -right-4 -top-4 w-24 h-24 text-white/5 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />

                  <div className="relative z-10">
                    <h3 className="text-xl font-black text-white capitalize mb-2 tracking-tight group-hover:text-blue-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
                      {cat.description || "No description provided for this category."}
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center gap-3 pt-4 border-t border-white/5">
                    {/* Edit Button */}
                    <button 
                      onClick={() => onEdit(cat.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600/10 text-blue-400 font-bold text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95"
                    >
                      <Edit3 size={14} />
                      Edit
                    </button>

                    {/* Delete Button */}
                    <button 
                      onClick={() => onDelete(cat.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 text-red-400 font-bold text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95"
                    >
                      <Trash2 size={14} />
                      {loading ? "..." : "Delete"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Empty State */}
      {categories.length === 0 && (
        <div className="text-center py-20 bg-white/5 rounded-[2.5rem] border border-dashed border-white/10">
          <Layers className="mx-auto text-gray-600 mb-4" size={48} />
          <p className="text-gray-400 font-medium">No categories found. Start by creating one!</p>
        </div>
      )}
    </div>
  );
};

export default Category;