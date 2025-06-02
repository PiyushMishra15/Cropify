import React from "react";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

const BASE_URL = "http://localhost:3000/api";

const useReviews = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const getReviews = async (productId, page = 1, review_per_page = 5) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${BASE_URL}/review/${productId}?page=${page}&limit=${review_per_page}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addReview = async (productId, reviewData) => {
    if (reviewData.heading === "" || reviewData.description === "") {
      toast.info("Please fill the review form correctly!", {
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
      return false;
    }

    if (reviewData.stars === 0) {
      toast.info("Please select the stars of the product", {
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

      return false;
    }

    try {
      setIsLoading(true);
      await axios.post(`${BASE_URL}/review/${productId}`, reviewData, {
        withCredentials: true, // if using cookie-based auth
      });
      return true;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { getReviews, addReview, isLoading };
};

export default useReviews;
