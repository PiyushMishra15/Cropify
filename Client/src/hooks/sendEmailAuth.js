import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useEmailAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const baseURL = "http://localhost:3000/api"; // Change if needed
  axios.defaults.withCredentials = true;

  // SIGN UP
  const handleSignup = async (type, formData) => {
    setIsLoading(true);
    try {
      if (type === "seller") {
        formData.brandName = formData.brandName;
        localStorage.setItem("brandName", formData.brandName);
      }
      console.log("Form Data:", formData); // Debugging line

      const response = await axios.post(
        `${baseURL}/auth/signup/${type}`,
        formData
      );
      alert(response.data.message);
      localStorage.setItem("token", response.data.token);
      let id = response.data.userId;
      navigate(`/verifyEmail/${type}/${id}`); // Redirect to verification page
    } catch (error) {
      console.error("Signup error:", error);
      alert(error?.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  // SIGN IN
  const handleSignin = async (credentials, type) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${baseURL}/auth/signin/${type}`,
        credentials
      );
      if (type === "seller") {
        localStorage.setItem("brandName", response.data.brandName);
      }
      localStorage.setItem("token", response.data.token);
      alert("Signed in successfully!");
      if (type === "seller") {
        navigate("/sellerDashboard");
      } // }
      else {
        navigate("/");
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Signin failed");
    } finally {
      setIsLoading(false);
    }
  };

  // FORGOT PASSWORD
  const forgotPassword = async (type, email) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${baseURL}/auth/forgotPassword/${type}`,
        { email }
      );
      alert(
        "Reset password email sent successfully, Please check your inbox and come back after updating password."
      );
      navigate("/login"); // Redirect to reset password page
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to send reset email");
      navigate("/login"); // Redirect to login page
    } finally {
      setIsLoading(false);
      // Redirect to reset password page
    }
  };
  //<Route path="/resetPassword/:type/:token" element={<ResetPassword />} />

  // RESET PASSWORD
  const resetPassword = async (type, token, newPassword) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${baseURL}/auth/resetPassword/${type}`,
        {
          token,
          newPassword,
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  // LOGOUT
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${baseURL}/auth/logout`);
      alert("Logged out successfully");
      navigate("/login");
    } catch (error) {
      alert("Logout failed");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleSignup,
    handleSignin,
    forgotPassword,
    resetPassword,
    handleLogout,
  };
};

export default useEmailAuth;
