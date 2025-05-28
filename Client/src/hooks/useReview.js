import React from "react";
import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api";

const useReviews = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const getReviews = async (productId, page = 1, review_per_page = 2) => {
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
      alert("Please fill the review form correctly!", "info");
      return false;
    }

    if (reviewData.stars === 0) {
      alert("Please select the stars of the product", "info");
      return false;
    }

    try {
      setIsLoading(true);
      await axios.post(`${BASE_URL}/review/${productId}`, reviewData, {
        withCredentials: true, // if using cookie-based auth
      });
      return true;
    } catch (error) {
      console.error("Error adding review:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { getReviews, addReview, isLoading };
};

export default useReviews;
