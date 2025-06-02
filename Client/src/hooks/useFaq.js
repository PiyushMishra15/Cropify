import axios from "axios";
import { useState } from "react";

const BASE_URL = "http://localhost:3000/api/faqs";

const useFAQs = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Add a new FAQ to a product
  const addFAQ = async (productId, question) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${BASE_URL}/${productId}`,
        { question },
        {
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return {
          data: {
            message: "You have already submitted a question for this product.",
          },
        };
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Answer an FAQ (by seller)
  const answerFAQ = async (faqId, answer) => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${BASE_URL}/${faqId}/answer`,
        { answer },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Get FAQs by Product ID
  const getFAQsByProduct = async (productId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/show/${productId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Get FAQs posted to a seller
  const getFAQsBySeller = async (isAnswered) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${BASE_URL}/seller?isAnswered=${isAnswered}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addFAQ,
    answerFAQ,
    getFAQsByProduct,
    getFAQsBySeller,
    isLoading,
  };
};

export default useFAQs;
