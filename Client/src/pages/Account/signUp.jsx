import React, { useState } from "react";
import { Eye, EyeOff, Mail, Tag, Lock, User, Phone } from "lucide-react";
import FormInput from "../../components/FormInput";
import useEmailAuth from "../../hooks/sendEmailAuth";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    brand: "",

    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("user");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    brand: "",
    userType: "",
  });

  const handleChange1 = () => {
    const { name, value } = e.target;
    setType(value);
  };
  const handleChange = () => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      contact: "",
      password: "",
      confirmPassword: "",
      brand: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    if (!formData.userType) {
      newErrors.userType = "Please select a user type";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      useEmailAuth()
        .handleSignup(type, formData)
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Signup failed:", error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormInput
        label="Full Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="John Doe"
        icon={<User size={18} className="text-gray-500" />}
        error={errors.name}
      />
      <FormInput
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="name@example.com"
        icon={<Mail size={18} className="text-gray-500" />}
        error={errors.email}
      />
      <FormInput
        label="Contact Number"
        type="number"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        placeholder="91XXXXXXXX"
        icon={<Phone size={18} className="text-gray-500" />}
        error={errors.contact}
      />
      if(type === "seller")
      {
        <FormInput
          label="Brand Name"
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder=" Cropify "
          icon={<Tag size={18} className="text-gray-500" />}
          error={errors.brand}
        />
      }
      <FormInput
        label="Password"
        type={showPassword ? "text" : "password"}
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Create a password"
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
      <FormInput
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm your password"
        icon={<Lock size={18} className="text-gray-500" />}
        error={errors.confirmPassword}
        endAdornment={
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        }
      />
      <div className="space-y-1">
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
                name="seller"
                type="radio"
                value="seller"
                checked={type == "seller"}
                onChange={handleChange}
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
                name="user"
                type="radio"
                value="user"
                checked={type === "user"}
                onChange={handleChange1}
                className="h-4 w-4 mt-1 text-green-700 focus:ring-green-600 border-gray-300"
              />
              <label
                htmlFor="trader"
                className="ml-2  text-sm text-gray-700 flex items-center"
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
      <div className="mt-1">
        <div className="text-xs text-gray-500">
          By creating an account, you agree to our{" "}
          <a href="#" className="text-green-700 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-green-700 hover:underline">
            Privacy Policy
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
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white\"
            xmlns="http://www.w3.org/2000/svg\"
            fill="none\"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25\"
              cx="12\"
              cy="12\"
              r="10\"
              stroke="currentColor\"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : null}
        {isLoading ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
};

export default SignupForm;
