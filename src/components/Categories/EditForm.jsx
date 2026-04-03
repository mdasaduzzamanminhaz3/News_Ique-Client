import { useState } from 'react';
import { Save, X, Layers, AlignLeft, ShieldCheck } from "lucide-react";

const EditForm = ({ category, onSave, onCancel }) => {
    const [name, setName] = useState(category.name);
    const [description, setDescription] = useState(category.description);
    const [isPremium, setIsPremium] = useState(category.is_premium || false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ 
            ...category, 
            name: name, 
            description: description,
            is_premium: isPremium
        });
    };

    return (
        <div className="relative overflow-hidden bg-white/10 backdrop-blur-2xl border border-blue-500/50 shadow-2xl shadow-blue-500/20 rounded-[2rem] p-5 animate-in zoom-in-95 duration-300">
            
            {/* Header Mini */}
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                <div className="p-1.5 bg-blue-500/20 rounded-lg">
                    <Layers className="text-blue-400" size={16} />
                </div>
                <span className="text-xs font-black text-white uppercase tracking-widest">Edit Mode</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-tighter text-gray-400 ml-1">Category Name</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm font-bold focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                            required
                        />
                    </div>
                </div>

                {/* Description Input */}
                <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-tighter text-gray-400 ml-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-xs leading-relaxed focus:ring-2 focus:ring-blue-500/50 outline-none transition-all resize-none"
                        rows="2"
                        required
                    ></textarea>
                </div>

                {/* Premium Toggle (Modern Style) */}
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className={isPremium ? "text-yellow-500" : "text-gray-500"} size={14} />
                        <span className="text-[10px] font-bold text-gray-300 uppercase">Premium</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isPremium}
                            onChange={(e) => setIsPremium(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-8 h-4 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                    <button
                        type="submit"
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                    >
                        <Save size={14} />
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-3 flex items-center justify-center bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl border border-white/10 transition-all active:scale-95"
                    >
                        <X size={16} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditForm;