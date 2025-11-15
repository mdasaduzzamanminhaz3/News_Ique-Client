import { useState, useEffect } from "react";
import { CheckCircle, Zap } from "lucide-react";
import authApiClient from "../../services/auth-api-client";
import { Link } from "react-router-dom";
import { MdOutlineWorkspacePremium } from "react-icons/md";

const useFetchPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const response = await authApiClient.get("/api/v1/subscriptions_plans/");
        setPlans(response.data?.results);
      } catch (err) {
        setError("Subscription plans could not be loaded.");
        console.error("Error fetching subscription plans:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  return { plans, loading, error };
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
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching current user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return { user, loading };
};

const SubscriptionPlansPage = () => {
  const { plans, loading: plansLoading, error } = useFetchPlans();
  const { user, loading: userLoading } = useFetchCurrentUser();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async (planId) => {
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      const response = await authApiClient.post("/api/v1/payment/initiate", {
        plan_id: planId,
      });
      if (response.data && response.data.payment_url) {
        window.location.href = response.data.payment_url;
      } else {
        throw new Error("Payment URL not received.");
      }
    } catch (error) {
      console.error(
        "Payment initiation failed:",
        error.response ? error.response.data : error.message
      );
      alert("Payment could not be initiated. Please log in and try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCurrency = (cents) => {
    const amount = cents / 100;
    return new Intl.NumberFormat("En-BD", {
      style: "currency",
      currency: "BDT",
    }).format(amount);
  };

  if (plansLoading || userLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const isPremium = user?.subscription?.plan?.name === "Premium" && user?.subscription?.is_active;

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
        Our Premium Subscription Plan
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
        Subscribe for exclusive articles, ad-free browsing, and more.
      </p>

      {isPremium && (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg mb-6 text-center">
          <MdOutlineWorkspacePremium /> You are already a Premium subscriber! Enjoy your benefits.
        </div>
      )}

      {plans.length === 0 && (
        <div className="text-center text-gray-500">
          No subscription plans are currently available.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-2 ${
              plan.name.includes("Premium")
                ? "border-blue-500 transform scale-105"
                : "border-gray-200 dark:border-gray-700"
            }`}
          >
            <div className="flex items-center justify-center">
              <Zap className="w-8 h-8 text-blue-500 mr-2" />
              <h2 className="text-2xl font-bold">{plan?.name}</h2>
            </div>

            <p className="text-center text-2xl font-extrabold my-6 text-blue-600 dark:text-blue-400">
              {formatCurrency(plan?.price_cents)}
              <span className="text-xl font-normal text-gray-500">/month</span>
            </p>

            <div className="space-y-3 mb-8">
              {plan.features &&
                Object.entries(plan.features).map(([key, value]) => (
                  <p
                    key={key}
                    className="flex items-start text-gray-700 dark:text-gray-300"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>
                      {key
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                      : {String(value)}
                    </span>
                  </p>
                ))}
            </div>

            <button
              onClick={() => handleSubscribe(plan.id)}
              disabled={isProcessing || isPremium} // Premium হলে disable
              className={`w-full py-3 rounded-lg text-white font-semibold transition-colors duration-300 
                ${
                  isProcessing || isPremium
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {isPremium
                ? "Already Subscribed"
                : isProcessing
                ? "Processing..."
                : "Subscribe Now"}
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          For payment-related issues or inquiries{" "}
          <Link to="/contact" className="text-blue-500 hover:underline">
            get in touch
          </Link>
          ।
        </p>
      </div>
    </div>
  );
};

export default SubscriptionPlansPage;
