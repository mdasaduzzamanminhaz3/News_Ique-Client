import { useState, useEffect } from "react";
import { CheckCircle, Zap, ShieldCheck, Crown, Loader2 } from "lucide-react";
import authApiClient from "../../services/auth-api-client";
import { Link } from "react-router-dom";
import PlanCardSkeleton from "../Skeleton/PlanCardSkeleton";

// Custom Hooks remain functionally same but refined
const useFetchPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const response = await authApiClient.get("/api/v1/subscriptions_plans/");
        setPlans(response.data?.results || []);
      } catch (err) {
        console.error("Error fetching plans:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);
  return { plans, loading };
};

const useFetchCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await authApiClient.get("auth/users/me/");
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  return { user, loading };
};

const SubscriptionPlansPage = () => {
  const { plans, loading: plansLoading } = useFetchPlans();
  const { user, loading: userLoading } = useFetchCurrentUser();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async (planId) => {
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      const response = await authApiClient.post("/api/v1/payment/initiate", {
        plan_id: planId,
      });
      if (response.data?.payment_url) {
        window.location.href = response.data.payment_url;
      }
    } catch (error) {
      alert("Payment initiation failed. Please log in again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCurrency = (cents) => {
    return new Intl.NumberFormat("En-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(cents / 100);
  };

  if (plansLoading || userLoading) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => <PlanCardSkeleton key={i} />)}
      </div>
    );
  }

  const isPremium = user?.subscription?.plan?.name === "Premium" && user?.subscription?.is_active;

  return (
    <div className="relative min-h-screen bg-[#020617] text-white pt-28 pb-20 overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-0"></div>

      <div className="max-w-screen-xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6 animate-bounce-slow">
            <ShieldCheck className="text-blue-400" size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Secure Checkout</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 uppercase italic">
            Upgrade to <span className="text-blue-500">Premium</span>
          </h1>
          <p className="text-gray-500 font-medium max-w-xl mx-auto uppercase tracking-widest text-[11px]">
            Experience NewsIque without limits. Ad-free browsing, exclusive research, and expert insights.
          </p>
        </div>

        {/* Existing Membership Alert */}
        {isPremium && (
          <div className="max-w-2xl mx-auto mb-12 bg-green-500/10 border border-green-500/20 p-6 rounded-3xl flex items-center justify-center gap-4 animate-pulse">
            <Crown className="text-green-400" size={24} />
            <p className="text-green-400 font-black text-xs uppercase tracking-widest text-center">
              You are already a Premium member. Enjoy your elite benefits!
            </p>
          </div>
        )}

        {/* Plans Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {plans.map((plan) => {
            const isFeatured = plan.name.toLowerCase().includes("premium");
            return (
              <div
                key={plan.id}
                className={`group relative w-full max-w-sm bg-white/5 backdrop-blur-2xl p-10 rounded-[2.5rem] border transition-all duration-500 hover:-translate-y-2 ${
                  isFeatured ? "border-blue-500 shadow-2xl shadow-blue-500/20" : "border-white/10"
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-[9px] font-black uppercase tracking-widest px-6 py-2 rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center justify-center mb-8">
                  <div className={`p-4 rounded-2xl ${isFeatured ? "bg-blue-600 text-white" : "bg-white/5 text-blue-400"}`}>
                    <Zap size={28} fill={isFeatured ? "white" : "none"} />
                  </div>
                </div>

                <h2 className="text-2xl font-black text-center uppercase tracking-tight mb-2 italic">{plan.name}</h2>
                <div className="flex flex-col items-center mb-10">
                  <span className="text-4xl font-black text-white">{formatCurrency(plan.price_cents)}</span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">Per Month</span>
                </div>

                {/* Features List */}
                <div className="space-y-5 mb-12">
                  {plan.features && Object.entries(plan.features).map(([key, value]) => (
                    <div key={key} className="flex items-start gap-4">
                      <div className="mt-1 p-0.5 bg-green-500/20 rounded-md">
                        <CheckCircle size={14} className="text-green-500" />
                      </div>
                      <span className="text-sm font-medium text-gray-400 leading-tight">
                        <strong className="text-gray-300 capitalize">{key.replace(/_/g, " ")}:</strong> {String(value)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subscribe Button */}
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isProcessing || isPremium}
                  className={`relative w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all overflow-hidden shadow-xl active:scale-95 ${
                    isPremium 
                      ? "bg-white/5 text-gray-500 cursor-not-allowed border border-white/10" 
                      : isFeatured 
                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/30" 
                        : "bg-white text-black hover:bg-gray-200"
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isProcessing ? <Loader2 size={16} className="animate-spin" /> : null}
                    {isPremium ? "Active Member" : isProcessing ? "Processing..." : "Unlock Now"}
                  </span>
                  
                  {/* Button Shimmer */}
                  {!isPremium && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer Link */}
        <div className="text-center mt-20">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em]">
            Need help? <Link to="/contact" className="text-blue-500 hover:text-blue-400 transition-colors">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlansPage;