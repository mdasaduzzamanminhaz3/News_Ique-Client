import { AlertCircle, X } from "lucide-react";

const ErrorAlert = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className="relative overflow-hidden bg-red-500/10 backdrop-blur-md border border-red-500/20 p-4 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
      
      {/* Dynamic Red Glow in Background */}
      <div className="absolute -left-4 -top-4 w-16 h-16 bg-red-600/20 blur-2xl rounded-full"></div>

      {/* Error Icon */}
      <div className="shrink-0 bg-red-500/20 p-2 rounded-xl border border-red-500/30">
        <AlertCircle className="text-red-500" size={20} />
      </div>

      {/* Error Message */}
      <div className="flex-1">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500/70 mb-0.5">
          System Error
        </h4>
        <p className="text-red-100 text-xs font-bold leading-tight">
          {error}
        </p>
      </div>

      {/* Optional Close Button */}
      {onClose && (
        <button 
          onClick={onClose}
          className="p-1.5 hover:bg-red-500/20 rounded-lg text-red-400/50 hover:text-red-400 transition-colors"
        >
          <X size={16} />
        </button>
      )}

      {/* Side Decorative Bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
    </div>
  );
};

export default ErrorAlert;