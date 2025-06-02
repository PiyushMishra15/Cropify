import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import FormInput from "../../components/FormInput";
import useEmailAuth from "../../hooks/sendEmailAuth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [type, setType] = useState("user");
  const { handleSignin, forgotPassword } = useEmailAuth(); // Use hook properly

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const forgot = (e) => {
    e.preventDefault();
    forgotPassword(type, email);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      handleSignin({ email, password }, type)
        .then((response) => {
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <h2 className="text-lg font-semibold text-red-500 mb-2">
        Use a placeholder email Pass for demo check !!
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          icon={<Mail size={18} className="text-gray-500" />}
          error={errors.email}
        />

        <FormInput
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          icon={<Lock size={18} className="text-gray-500" />}
          error={errors.password}
          endAdornment={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-green-700 focus:ring-green-600 border-gray-300 rounded"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a
              onClick={forgot}
              className="font-medium text-green-700 hover:text-green-600"
            >
              Forgot password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition duration-150 ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      <div className="space-y-1 mt-4">
        <label
          htmlFor="userType"
          className="block text-sm font-medium text-gray-700"
        >
          I am a
        </label>
        <div className="flex mt-1 rounded-md shadow-sm">
          <div className="flex flex-1">
            <div className="flex-1 flex">
              <input
                id="farmer"
                name="userType"
                type="radio"
                value="seller"
                checked={type === "seller"}
                onChange={handleTypeChange}
                className="h-4 w-4 mt-1 text-green-700 focus:ring-green-600 border-gray-300"
              />
              <label
                htmlFor="farmer"
                className="ml-2 text-sm text-gray-700 flex items-center"
              >
                Farmer
                <div className="ml-2 bg-green-100 text-green-800 text-xs py-0.5 px-2 rounded-full">
                  Sell crops
                </div>
              </label>
            </div>

            <div className="flex-1 flex ml-6">
              <input
                id="trader"
                name="userType"
                type="radio"
                value="user"
                checked={type === "user"}
                onChange={handleTypeChange}
                className="h-4 w-4 mt-1 text-green-700 focus:ring-green-600 border-gray-300"
              />
              <label
                htmlFor="trader"
                className="ml-2 text-sm text-gray-700 flex items-center"
              >
                Trader
                <div className="ml-2 bg-amber-100 text-amber-800 text-xs py-0.5 px-2 rounded-full">
                  Buy crops
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
