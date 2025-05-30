import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import TableSkeleton from "../../components/TableSkeleton";
import EmptyStatetext from "../../components/EmptyStatetext";

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
    <>
      <h1 className="text-sm text-gray-500 mb-4 text-left">Your Products</h1>

      <div className="w-full flex flex-col gap-2 md:flex-row items-center justify-between px-4">
        <div className="mt-1 relative w-full md:w-96">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            placeholder="Search for products (Coming soon)"
          />
        </div>
        <Link to="add" className="w-full md:w-fit text-center">
          <div className="text-md py-2 px-4 text-white rounded cursor-pointer bg-sky-700">
            <i className="fa-regular fa-plus mr-2"></i>Add Product
          </div>
        </Link>
      </div>

      <div className="flex flex-col overflow-x-auto w-full">
        <div className="min-w-full py-2">
          {isDataFetching ? (
            <TableSkeleton />
          ) : data.length === 0 ? (
            <EmptyStatetext text="Your seller dashboard currently does not display any products. To start selling, kindly add your products by navigating to the 'Add Product' section." />
          ) : (
            <table className="text-center text-sm font-light w-full">
              <thead className="border-b font-medium bg-gray-100">
                <tr>
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Product Name</th>
                  <th className="px-6 py-4">Shelf Life</th>
                  <th className="px-6 py-4">Quantity Left</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Delivery Radius</th>
                  <th className="px-6 py-4">Minimum Order Quantity</th>
                  <th className="px-6 py-4">Measuring Unit</th>
                  <th className="px-6 py-4">Price Per Unit</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Operation</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100"
                  >
                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                    <td className="px-6 py-2">
                      <img src={item.image} alt="Product" loading="lazy" />
                    </td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.shelfLife}</td>
                    <td className="px-6 py-4">
                      {item.quantity} {item.measuringUnit}
                    </td>
                    <td
                      className="px-6 py-4 cursor-pointer font-medium text-sky-700 hover:underline"
                      onClick={() =>
                        navigate(
                          `/map/${item.location.coordinates[1]}/${item.location.coordinates[0]}`
                        )
                      }
                    >
                      {item.location.coordinates[1].toFixed(4)},{" "}
                      {item.location.coordinates[0].toFixed(4)}
                    </td>
                    <td className="px-6 py-4">{item.deliveryRadius} km</td>
                    <td className="px-6 py-4">
                      {item.minimumOrderQuantity} {item.measuringUnit}
                    </td>
                    <td className="px-6 py-4">{item.measuringUnit}</td>
                    <td className="px-6 py-4">
                      Rs. {item.pricePerUnit}/{item.measuringUnit}
                    </td>
                    <td className="px-6 py-4">{item.description}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-2">
                        <div
                          className="text-md py-2 px-4 text-white rounded cursor-pointer bg-sky-700"
                          onClick={() => navigate("edit", { product: item })}
                        >
                          <i className="fa-regular fa-pen-to-square mr-2"></i>
                          <span>Edit</span>
                        </div>
                        <div
                          className="text-md py-2 px-4 text-white rounded cursor-pointer bg-rose-700"
                          onClick={() => handleDelete(item._id, index)}
                        >
                          {indexOfProduct === index ? (
                            <Spinner width="w-5" color="#ffffff" />
                          ) : (
                            <span>
                              <i className="fa-regular fa-trash-can mr-1"></i>
                              Delete
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default SellerProducts;
