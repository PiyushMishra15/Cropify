// src/hooks/useProducts.js

import axios from "axios";
import { toast, Bounce } from "react-toastify";

const BASE_URL = "http://localhost:3000/api"; // Replace with your backend URL

const useProducts = () => {
  const getProductsByCategory = async (
    category,
    page,
    products_per_page,
    lng,
    lat
  ) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/product/category/${category}?page=${page}&perPage=${products_per_page}&lng=${lng}&lat=${lat}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return null;
    }
  };

  const getProductUserDashboardData = async (productId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/product/dashboard/${productId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return null;
    }
  };

  const getSellerProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/product/sellerProduct`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return null;
    }
  };

  const updateProduct = async (productId, formData) => {
    try {
      await axios.put(`${BASE_URL}/product/update/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.success("Product Updated Successully", {
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
      return true;
    } catch (error) {
      return false;
    }
  };

  const addProduct = async (formData) => {
    try {
      await axios.post(`${BASE_URL}/product/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.success("Product added Successully", {
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
      return true;
    } catch (error) {
      return false;
    }
  };

  const getProductById = async (productId) => {
    try {
      const response = await axios.get(`${BASE_URL}/product/${productId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return null;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`${BASE_URL}/product/delete/${productId}`, {
        withCredentials: true,
      });

      toast.success("Product deleted Successully", {
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
      return true;
    } catch (error) {
      return false;
    }
  };

  const getMainProductData = async (productId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/product/main/${productId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return null;
    }
  };

  const getSellerDashboardProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/product/sellerProduct`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return null;
    }
  };

  const getProductStocksById = async (productId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/product/stock/${productId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return null;
    }
  };

  return {
    getProductsByCategory,
    getProductUserDashboardData,
    getSellerProducts,
    updateProduct,
    getProductById,
    addProduct,
    deleteProduct,
    getMainProductData,
    getSellerDashboardProducts,
    getProductStocksById,
  };
};

export default useProducts;
