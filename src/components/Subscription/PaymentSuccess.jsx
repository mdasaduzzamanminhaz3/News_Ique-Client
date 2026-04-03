import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#020617] overflow-hidden px-6">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full animate-pulse-slow"></div>

      {/* Main Success Card */}
      <div className="relative z-10 w-full max-w-lg bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 md:p-16 shadow-2xl text-center transform transition duration-500 hover:scale-[1.02]">
        
        {/* Success Icon with Glow */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-green-500/30 blur-3xl rounded-full animate-ping"></div>
          <div className="relative bg-green-500/20 p-6 rounded-full border border-green-500/30">
            <CheckCircle className="w-16 h-16 text-green-400 animate-bounce" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
            Payment <span className="text-blue-500">Confirmed!</span>
          </h1>
          
          <div className="flex items-center justify-center gap-2 text-blue-400/80 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
            <Sparkles size={14} />
            Subscription Active
            <Sparkles size={14} />
          </div>

          <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-sm mx-auto">
            Welcome to the elite circle of NewsIque. Your transaction was processed successfully and your premium access is now live.
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-12">
          <button
            onClick={() => navigate("/")}
            className="group relative w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-600/20 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            Go to Dashboard
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>

        {/* Transaction ID Placeholder */}
        <p className="mt-8 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
          Transaction ID: #NI-{Math.floor(Math.random() * 1000000)}
        </p>
      </div>

      {/* Premium Particles (Optional) */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-white rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping delay-700"></div>
      </div>
    </div>
  );
};

export default PaymentSuccess;