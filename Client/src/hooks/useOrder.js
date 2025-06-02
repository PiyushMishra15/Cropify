import { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

const useOrders = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Place a new order (by user)
  const addOrder = async (orderData) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/order/add`, orderData, {
        withCredentials: true, // for cookie-based auth
        // headers: { Authorization: `Bearer ${token}` }, // for token-based auth
      });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Get orders by seller
  const getSellerOrders = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/order/sellerOrders`, {
        withCredentials: true,
        // headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addOrder,
    getSellerOrders,
    isLoading,
  };
};

export default useOrders;
