// src/hooks/useProducts.js

import axios from "axios";

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
      console.error("Error fetching products by category:", error);
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
      console.error("Error fetching user dashboard data:", error);
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
      console.error("Error fetching seller products:", error);
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
      alert("Product updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating product:", error);
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
      alert("Product added successfully");
      return true;
    } catch (error) {
      console.error("Error adding product:", error);
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
      console.error("Error fetching product by ID:", error);
      return null;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`${BASE_URL}/product/delete/${productId}`, {
        withCredentials: true,
      });
      alert("Product deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
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
      console.error("Error fetching main product dashboard data:", error);
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
      console.error("Error fetching seller dashboard products:", error);
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
      console.error("Error fetching product stock by ID:", error);
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
