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
        `${BASE_URL}/product/category/${category}?page=${page}&perPage=${products_per_page}&lng=${lng}&lat=${lat}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };

  const getProductUserDashboardData = async (productId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/product/dashboard/${productId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user dashboard data:", error);
    }
  };

  const getSellerProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/product/sellerProduct`);
      return response.data;
    } catch (error) {
      console.error("Error fetching seller products:", error);
    }
  };

  const updateProduct = async (productId, formData) => {
    try {
      await axios.put(`${BASE_URL}/product/update/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const addProduct = async (formData) => {
    try {
      await axios.post(`${BASE_URL}/product/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  const getProductById = async (productId) => {
    try {
      const response = await axios.get(`${BASE_URL}/product/${productId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`${BASE_URL}/product/delete/${productId}`);
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const getMainProductData = async (productId) => {
    try {
      const response = await axios.get(`${BASE_URL}/product/main/${productId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching main product dashboard data:", error);
    }
  };

  const getSellerDashboardProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/product/sellerProduct`);
      return response.data;
    } catch (error) {
      console.error("Error fetching seller dashboard products:", error);
    }
  };
  const getProductStocksById = async (productId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/product/stock/${productId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching product stock by ID:", error);
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
