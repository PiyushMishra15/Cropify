import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import TableSkeleton from "../../components/TableSkeleton";
import EmptyStatetext from "../../components/EmptyStatetext";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Package,
  Filter,
} from "lucide-react";

import useProduct from "../../hooks/useProduct";

function SellerProducts() {
  const navigate = useNavigate();
  const { getSellerProducts, deleteProduct } = useProduct();

  const [isDeleting, setIsDeleting] = useState(false);
  const [data, setData] = useState([]);
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [isDataFetching, setIsDataFetching] = useState(true);
  const [indexOfProduct, setIndexOfProduct] = useState(-1);

  const handleDelete = async (productId, index) => {
    if (!isDeleting) {
      setIndexOfProduct(index);
      setIsDeleting(true);
      await deleteProduct(productId);
      setIsDataUpdated(true);
      setIndexOfProduct(-1);
      setIsDeleting(false);
    }
  };

  const getProducts = async () => {
    const productData = await getSellerProducts();
    setData(productData);
    setIsDataFetching(false);
  };

  useEffect(() => {
    setIsDataUpdated(false);
    getProducts();
  }, [isDataUpdated]);

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <Package className="w-6 h-6 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">Your Products</h1>
          </div>
          <p className="text-gray-600">
            Manage your product inventory and listings
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                placeholder="Search for products (Coming soon)"
                disabled
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 w-full lg:w-auto">
              <button className="flex items-center px-4 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>

              <button
                onClick={() => navigate("add")}
                className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {isDataFetching ? (
            <TableSkeleton />
          ) : data.length === 0 ? (
            <EmptyStatetext text="Your seller dashboard currently does not display any products. To start selling, kindly add your products by navigating to the 'Add Product' section." />
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden xl:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Shelf Life
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Delivery
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt="Product"
                              className="w-12 h-12 rounded-lg object-cover mr-4"
                              loading="lazy"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {item.name}
                              </div>
                              <div className="text-sm text-gray-500 truncate max-w-xs">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1  text-black text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.shelfLife}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.quantity} {item.measuringUnit}
                          </div>
                          <div className="text-xs text-gray-500">
                            Min: {item.minimumOrderQuantity}{" "}
                            {item.measuringUnit}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                            onClick={() =>
                              navigate(
                                `/map/${item.location.coordinates[1]}/${item.location.coordinates[0]}`
                              )
                            }
                          >
                            <MapPin className="w-4 h-4 mr-1" />
                            View Location
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.deliveryRadius} km radius
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            Rs. {item.pricePerUnit}/{item.measuringUnit}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                              onClick={() =>
                                navigate("edit", {
                                  state: { product: item },
                                })
                              }
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </button>
                            <button
                              className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200 disabled:opacity-50"
                              onClick={() => handleDelete(item._id, index)}
                              disabled={isDeleting && indexOfProduct === index}
                            >
                              {indexOfProduct === index && isDeleting ? (
                                <Spinner width="w-4" color="#dc2626" />
                              ) : (
                                <>
                                  <Trash2 className="w-4 h-4 mr-1" />
                                  Delete
                                </>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="xl:hidden">
                <div className="p-4 space-y-4">
                  {data.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt="Product"
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          loading="lazy"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-medium text-gray-900 truncate">
                              {item.name}
                            </h3>
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              {item.category}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                            <div>
                              <span className="font-medium">Stock:</span>{" "}
                              {item.quantity} {item.measuringUnit}
                            </div>
                            <div>
                              <span className="font-medium">Shelf Life:</span>{" "}
                              {item.shelfLife}
                            </div>
                            <div>
                              <span className="font-medium">Price:</span> Rs.{" "}
                              {item.pricePerUnit}/{item.measuringUnit}
                            </div>
                            <div>
                              <span className="font-medium">Delivery:</span>{" "}
                              {item.deliveryRadius} km
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <button
                              className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                              onClick={() =>
                                navigate("edit", {
                                  state: { product: item },
                                })
                              }
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </button>
                            <button
                              className="flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
                              onClick={() => handleDelete(item._id, index)}
                              disabled={isDeleting && indexOfProduct === index}
                            >
                              {indexOfProduct === index && isDeleting ? (
                                <Spinner width="w-4" color="#dc2626" />
                              ) : (
                                <>
                                  <Trash2 className="w-4 h-4 mr-1" />
                                  Delete
                                </>
                              )}
                            </button>
                            <button
                              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                              onClick={() =>
                                navigate(
                                  `/map/${item.location.coordinates[1]}/${item.location.coordinates[0]}`
                                )
                              }
                            >
                              <MapPin className="w-4 h-4 mr-1" />
                              Location
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Stats Footer */}
        {!isDataFetching && data.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>
                Showing {data.length} product{data.length !== 1 ? "s" : ""}
              </span>
              <span>
                Total inventory value: Rs.{" "}
                {data
                  .reduce(
                    (sum, item) => sum + item.quantity * item.pricePerUnit,
                    0
                  )
                  .toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerProducts;
