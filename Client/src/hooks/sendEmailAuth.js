import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

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

      toast.success(response.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      localStorage.setItem("token", response.data.token);
      let id = response.data.userId;
      navigate(`/verifyEmail/${type}/${id}`); // Redirect to verification page
    } catch (error) {
      console.error("Signup error:", error);

      toast.error(error?.response?.data?.message || "Signup failed", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
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
      toast.success("Singnin successful", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      if (type === "seller") {
        navigate("/sellerDashboard");
      } // }
      else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signin failed", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
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

      toast.success(
        "Reset password email sent successfully, Please check your inbox and come back after updating password.",
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
      navigate("/login"); // Redirect to reset password page
    } catch (error) {
      toast.error("Failed to send reset email", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
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

      toast.success("Password reset successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return response;
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  // LOGOUT
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${baseURL}/auth/logout`);
      toast.success("Logged out successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      navigate("/login");
    } catch (error) {
      toast.error("Logout failed", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
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
