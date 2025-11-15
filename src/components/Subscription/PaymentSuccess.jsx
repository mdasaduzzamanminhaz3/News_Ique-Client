import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-400 p-4 relative">
      {/* Card */}
      <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md w-full transform transition duration-700 hover:scale-105">
        {/* Success Icon */}
        <CheckCircle className="w-20 h-20 text-blue-500 mx-auto mb-4 animate-bounce" />
        
        {/* Heading */}
        <h1 className="text-3xl font-bold text-blue-700 mb-2 animate-pulse">
          Payment Successful!
        </h1>
        
        {/* Subtext */}
        <p className="text-gray-700 mb-6">
          Thank you for subscribing. Your payment has been processed successfully.
        </p>
        
        {/* Button */}
        <button
          onClick={() => window.location.href = "/"}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-600 transition transform hover:scale-105"
        >
          Go to Homepage
        </button>
      </div>

      {/* Animated Confetti Dots */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-bounce-slow" style={{top: '20%', left: '10%'}}></div>
        <div className="absolute w-2 h-2 bg-red-400 rounded-full animate-bounce-slow" style={{top: '50%', left: '70%'}}></div>
        <div className="absolute w-2 h-2 bg-blue-400 rounded-full animate-bounce-slow" style={{top: '80%', left: '30%'}}></div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
