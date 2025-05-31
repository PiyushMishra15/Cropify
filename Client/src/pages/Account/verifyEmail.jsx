import { useEffect, useState } from "react";
import axios from "axios";
import { Leaf, Mail, CheckCircle, Clock } from "lucide-react";

import { useParams, useNavigate } from "react-router-dom";

const WaitForVerification = () => {
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // Ensure userId and type are provided

  const { id, type } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/auth/checkVerification/${type}/${id}`
        );
        if (res.data.verified) {
          setVerified(true);
          setIsLoading(false);
          clearInterval(interval);
          navigate("/sellerDashboard"); // Navigate to home after verification
        }
      } catch (err) {
        console.error("Error checking verification status");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [id, type, navigate]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Decorative elements */}
        <div className="relative">
          <div className="absolute -top-8 -left-8 w-16 h-16 bg-green-100 rounded-full opacity-60"></div>
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-amber-100 rounded-full opacity-40"></div>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-green-50 rounded-full opacity-50"></div>
        </div>

        {/* Main card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-100 p-8 text-center relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 left-4">
              <Leaf className="w-8 h-8 text-green-600 transform rotate-12" />
            </div>
            <div className="absolute top-8 right-8">
              <Leaf className="w-6 h-6 text-green-600 transform -rotate-45" />
            </div>
            <div className="absolute bottom-6 left-8">
              <Leaf className="w-10 h-10 text-green-600 transform rotate-45" />
            </div>
            <div className="absolute bottom-4 right-4">
              <Leaf className="w-7 h-7 text-green-600 transform -rotate-12" />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <div className="mb-6">
              {verified ? (
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
              ) : (
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg relative">
                  <Mail className="w-10 h-10 text-white" />
                  {isLoading && (
                    <div className="absolute inset-0 rounded-full border-4 border-white/30 border-t-white animate-spin"></div>
                  )}
                </div>
              )}
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {verified ? "Welcome to the Harvest!" : "Growing Your Access"}
            </h2>

            {/* Status message */}
            {verified ? (
              <div className="space-y-3">
                <p className="text-green-700 text-lg font-semibold flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Email verified successfully!
                </p>
                <p className="text-gray-600">
                  Your Crop Commerce account is ready! start harvesting the best
                  deals on seeds, tools, and farm supplies.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-amber-700 text-lg font-medium flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5" />
                  Nurturing your verification
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We've planted a verification seed in your inbox. Please check
                  your email and click the link to help it bloom.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Checking every 5 seconds...</span>
                </div>
              </div>
            )}

            {/* Decorative divider */}
            <div className="mt-8 pt-6 border-t border-green-100">
              <div className="flex items-center justify-center gap-2 text-green-600">
                <Leaf className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Organic • Natural • Peaceful
                </span>
                <Leaf className="w-4 h-4 transform scale-x-[-1]" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative text */}
        <p className="text-center text-gray-400 text-sm mt-6 font-light">
          Cultivating digital experiences with natural harmony
        </p>
      </div>
    </div>
  );
};

export default WaitForVerification;
