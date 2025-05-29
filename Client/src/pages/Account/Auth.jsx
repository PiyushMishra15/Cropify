import React, { useState } from "react";
import LoginForm from "./Login";
import SignupForm from "./Signup";
import { Sprout } from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Illustration/Banner */}
      <div className="md:w-1/2 bg-green-800 flex flex-col justify-center items-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 text-center max-w-md">
          <div className="flex justify-center mb-4">
            <Sprout size={64} className="text-green-100" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-green-100 mb-4">
            Cropify
          </h1>
          <p className="text-xl md:text-2xl font-medium text-green-100 mb-6">
            Empowering Farmers with Technology
          </p>
          <p className="text-green-100 mb-8">
            Connect with buyers, track crop prices, and grow your agricultural
            business with our innovative platform.
          </p>
          <div className="hidden md:block">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-green-700 p-2 rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-100"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-green-100">
                  Market access for your crops
                </span>
              </div>
              <div className="flex items-center">
                <div className="bg-green-700 p-2 rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-100"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-green-100">Real-time price tracking</span>
              </div>
              <div className="flex items-center">
                <div className="bg-green-700 p-2 rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-100"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-green-100">Expert farming advice</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-900 to-transparent"></div>
      </div>

      {/* Right side - Form */}
      <div className="md:w-1/2 bg-white flex flex-col justify-center p-8">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {isLogin ? "Welcome Back" : "Join Cropify"}
            </h2>
            <p className="text-gray-600">
              {isLogin
                ? "Sign in to access your account"
                : "Create an account to get started"}
            </p>
          </div>

          {/* Toggle between login and signup */}
          <div className="bg-gray-100 rounded-lg p-1 flex mb-8">
            <button
              className={`flex-1 py-2 rounded-md text-center transition-all duration-300 ${
                isLogin
                  ? "bg-green-700 text-white font-medium shadow-md"
                  : "text-gray-700"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 rounded-md text-center transition-all duration-300 ${
                !isLogin
                  ? "bg-green-700 text-white font-medium shadow-md"
                  : "text-gray-700"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          {isLogin ? <LoginForm /> : <SignupForm />}

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                className="text-green-700 font-medium hover:underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign up" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
