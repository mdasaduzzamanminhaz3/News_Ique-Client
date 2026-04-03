import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle, AlertCircle, Loader2, ShieldCheck } from "lucide-react";
import apiClient from "../../services/api-client";

const ActivateAccount = () => {
  const { uid, token } = useParams();
  const [status, setStatus] = useState("loading"); // 'loading', 'success', 'error'
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .post("/auth/users/activation/", { uid, token })
      .then(() => {
        setStatus("success");
        setMessage("Account activated successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch((err) => {
        setStatus("error");
        setMessage("Something went wrong. The link might be expired or invalid.");
        console.error(err);
      });
  }, [uid, token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#020617] relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl text-center">
          
          {/* Logo / Header Icon */}
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-blue-600/20 rounded-3xl rotate-3 group-hover:rotate-0 transition-transform">
              <ShieldCheck className="h-10 w-10 text-blue-500" />
            </div>
          </div>

          <h2 className="text-3xl font-black text-white tracking-tight mb-4 uppercase">
            Account <span className="text-blue-500">Activation</span>
          </h2>

          {/* Dynamic Content based on Status */}
          <div className="mt-8">
            {status === "loading" && (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
                <p className="text-gray-400 font-medium animate-pulse uppercase tracking-widest text-[10px]">
                  Verifying your account...
                </p>
              </div>
            )}

            {status === "success" && (
              <div className="animate-in zoom-in-95 duration-500">
                <div className="flex flex-col items-center gap-4 bg-green-500/10 border border-green-500/20 p-6 rounded-3xl">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                  <p className="text-green-400 text-sm font-bold tracking-tight">
                    {message}
                  </p>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="animate-in shake duration-500">
                <div className="flex flex-col items-center gap-4 bg-red-500/10 border border-red-500/20 p-6 rounded-3xl">
                  <AlertCircle className="h-12 w-12 text-red-500" />
                  <p className="text-red-400 text-sm font-bold tracking-tight">
                    {message}
                  </p>
                  <button 
                    onClick={() => navigate('/login')}
                    className="mt-2 text-xs font-black text-white bg-red-600/20 hover:bg-red-600 px-6 py-2 rounded-xl transition-all uppercase tracking-widest"
                  >
                    Back to Login
                  </button>
                </div>
              </div>
            )}
          </div>

          <p className="mt-12 text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em]">
            © 2026 NewsIque Security
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivateAccount;