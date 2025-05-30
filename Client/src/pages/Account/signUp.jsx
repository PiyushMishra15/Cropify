import React, { useState } from "react";
import { Eye, EyeOff, Mail, Tag, Lock, User, Phone } from "lucide-react";
import FormInput from "../../components/FormInput";
import useEmailAuth from "../../hooks/sendEmailAuth";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    brandName: "",
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
    brandName: "",
    userType: "",
  });

  const { handleSignup } = useEmailAuth(); // Use hook properly

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUserTypeChange = (e) => {
    setType(e.target.value);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      contact: "",
      password: "",
      confirmPassword: "",
      brandName: "",
      userType: "",
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

    if (!formData.contact) {
      newErrors.contact = "Contact number is required";
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

    if (!type) {
      newErrors.userType = "Please select a user type";
      valid = false;
    }

    if (type === "seller" && !formData.brandName.trim()) {
      newErrors.brandName = "Brand name is required for sellers";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      handleSignup(type, formData)
        .then(() => {
          setIsLoading(false);
          // success feedback here
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
      {type === "seller" && (
        <FormInput
          label="Brand Name"
          type="text"
          name="brandName"
          value={formData.brandName}
          onChange={handleChange}
          placeholder="Cropify"
          icon={<Tag size={18} className="text-gray-500" />}
          error={errors.brand}
        />
      )}
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
        <div className="flex mt-1">
          <label className="flex items-center space-x-2 mr-6">
            <input
              type="radio"
              name="userType"
              value="seller"
              checked={type === "seller"}
              onChange={handleUserTypeChange}
              className="h-4 w-4 text-green-700"
            />
            <span className="text-sm text-gray-700">
              Farmer
              <span className="ml-2 bg-green-100 text-green-800 text-xs py-0.5 px-2 rounded-full">
                Sell crops
              </span>
            </span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="userType"
              value="user"
              checked={type === "user"}
              onChange={handleUserTypeChange}
              className="h-4 w-4 text-green-700"
            />
            <span className="text-sm text-gray-700">
              Trader
              <span className="ml-2 bg-amber-100 text-amber-800 text-xs py-0.5 px-2 rounded-full">
                Buy crops
              </span>
            </span>
          </label>
        </div>
        {errors.userType && (
          <p className="text-red-500 text-xs">{errors.userType}</p>
        )}
      </div>

      <div className="text-xs text-gray-500">
        By creating an account, you agree to our{" "}
        <a href="#" className="text-green-700 hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-green-700 hover:underline">
          Privacy Policy
        </a>
        .
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition duration-150 ${
          isLoading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isLoading && (
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
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {isLoading ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
};

export default SignupForm;
