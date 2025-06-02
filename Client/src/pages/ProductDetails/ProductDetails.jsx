import React, { useEffect, useState } from "react";
import { PiSmileySadLight } from "react-icons/pi";
import { IoBagRemoveOutline } from "react-icons/io5";
import { CiNoWaitingSign } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useProduct from "../../hooks/useProduct";
import useWebSocket from "../../hooks/useWebSocket";
import TextSkeleton from "../../components/TextSkeleton";
import BoxSkeleton from "../../components/BoxSkeleton";
import ShareButton from "../../components/ShareButton";
import Navbar from "../../components/NavBar";

import ProductReviews from "./ProductReviews";
import FAQ from "./FAQ";
import SellerContact from "./SellerContact";
import { toast, Bounce } from "react-toastify";
// Import your cart actions
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";

function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const { getProductUserDashboardData, getMainProductData, isLoading } =
    useProduct();

  const [productDashboardData, setProductDashboardData] = useState(null);
  const [isMainDataLoading, setIsMainDataLoading] = useState(true);

  // Get cart from redux store
  const cart = useSelector((state) => state.cart.items);

  // Listen for product quantity updates via websocket
  useWebSocket((updatedProductId, newQuantity) => {
    setProductDashboardData((prevData) => {
      if (!prevData) return prevData;
      if (prevData._id === updatedProductId) {
        return { ...prevData, quantity: newQuantity };
      }
      return prevData;
    });
  });

  // Check if product is in cart
  const isProductInCart = cart.some(
    (item) => item._id === productDashboardData?._id
  );

  const fetchProductDashboardData = async (id) => {
    const data = await getProductUserDashboardData(id);
    setProductDashboardData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const fetchAllData = async () => {
    setIsMainDataLoading(true);
    const mainProduct = await getMainProductData(productId);
    setProductDashboardData(mainProduct);
    await fetchProductDashboardData(productId);
    setIsMainDataLoading(false);
  };

  useEffect(() => {
    fetchAllData();
  }, [productId]);

  const addProductToCart = () => {
    if (!productDashboardData) return;

    const newItem = {
      _id: productDashboardData._id,
      sellerId: productDashboardData.sellerId,
      image: productDashboardData.image,
      name: productDashboardData.name,
      category: productDashboardData.category,
      deliveryRadius: productDashboardData.deliveryRadius,
      qty: productDashboardData.minimumOrderQuantity,
      brandName: productDashboardData.brandName,
      minQty: productDashboardData.minimumOrderQuantity,
      stocksLeft: productDashboardData.quantity,
      pricePerUnit: productDashboardData.pricePerUnit,
      unit: productDashboardData.measuringUnit,
      currentPrice:
        productDashboardData.pricePerUnit *
        productDashboardData.minimumOrderQuantity,
    };

    dispatch(addToCart(newItem));

    toast.success("Product added to cart successfully!", {
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
  };

  const removeProductFromCart = () => {
    if (!productDashboardData) return;
    dispatch(removeFromCart(productDashboardData._id));

    toast.error("Product removed from cart successfully!", {
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
  };

  return (
    <>
      <Navbar />
      <div className="lg:w-11/12 pt-16 mb-8 mx-auto flex flex-wrap">
        {isMainDataLoading ? (
          <BoxSkeleton height="lg:h-auto h-64" width="lg:w-1/2 w-full" />
        ) : (
          <div className="lg:w-1/2 w-full h-64 md:h-auto rounded relative">
            <img
              loading="lazy"
              className="object-cover object-center h-full w-full"
              src={productDashboardData?.image}
              alt={productDashboardData?.name}
            />
            <span className="absolute top-0 right-0 m-2">
              <ShareButton url={window.location.href} />
            </span>
          </div>
        )}

        <div className="lg:w-1/2 w-full px-4 space-y-1 lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 className="text-xs md:text-sm title-font text-gray-500 tracking-widest">
            {isMainDataLoading ? (
              <TextSkeleton noOfRows={1} width="w-[80px]" />
            ) : (
              productDashboardData?.brand
            )}
          </h2>

          {isMainDataLoading ? (
            <TextSkeleton noOfRows={1} width="w-[100px]" />
          ) : (
            <h1 className="text-2xl md:text-3xl font-medium text-gray-900 mb-1">
              {productDashboardData?.name}
            </h1>
          )}

          <p className="leading-relaxed text-sm md:text-base">
            {isLoading ? (
              <TextSkeleton noOfRows={12} />
            ) : (
              productDashboardData?.description
            )}
          </p>

          <div className="relative overflow-x-auto my-6">
            <table className="w-full text-base text-left text-gray-500">
              <tbody>
                <tr className="bg-white border-b">
                  <th className="px-2 md:px-6 py-2 md:py-4 font-medium text-gray-900 whitespace-nowrap">
                    Stocks Left
                  </th>
                  <td className="px-2 md:px-6 py-2 md:py-4">
                    {isLoading ? (
                      <TextSkeleton noOfRows={1} />
                    ) : (
                      `${productDashboardData?.quantity} ${productDashboardData?.measuringUnit}`
                    )}
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <th className="px-2 md:px-6 py-2 md:py-4 font-medium text-gray-900 whitespace-nowrap">
                    Shelf Life
                  </th>
                  <td className="px-2 md:px-6 py-2 md:py-4">
                    {isLoading ? (
                      <TextSkeleton noOfRows={1} />
                    ) : (
                      productDashboardData?.shelfLife
                    )}
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <th className="px-2 md:px-6 py-2 md:py-4 font-medium text-gray-900 whitespace-nowrap">
                    Deliverable Within
                  </th>
                  <td className="px-2 md:px-6 py-2 md:py-4">
                    {isLoading ? (
                      <TextSkeleton noOfRows={1} />
                    ) : (
                      `${productDashboardData?.deliveryRadius} km`
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-between flex-col md:flex-row">
            <div className="space-y-1">
              {isMainDataLoading ? (
                <TextSkeleton noOfRows={1} />
              ) : (
                <div className="text-green-600 font-medium text-sm md:text-base">
                  Minimum Order Quantity:{" "}
                  {productDashboardData?.minimumOrderQuantity}{" "}
                  {productDashboardData?.measuringUnit}
                </div>
              )}

              {isMainDataLoading ? (
                <TextSkeleton
                  noOfRows={1}
                  fontSizeHeight="h-[24px]"
                  fontSizeHeightMd="h-[36px]"
                />
              ) : (
                <div className="flex justify-between">
                  <h2 className="text-2xl md:text-4xl text-left mb-1 font-medium">
                    Rs. {productDashboardData?.pricePerUnit}/
                    {productDashboardData?.measuringUnit}
                  </h2>
                </div>
              )}
            </div>

            {productDashboardData?.minimumOrderQuantity <=
            productDashboardData?.quantity ? (
              <button
                className={`flex mb-2 md:mb-4 mt-4 md:mt-2 text-white ${
                  isProductInCart
                    ? "bg-amber-500 hover:bg-amber-600"
                    : "bg-[#e11d48] hover:bg-[#e5345a]"
                } border-0 py-4 px-12 focus:outline-none rounded`}
                onClick={(e) => {
                  e.preventDefault();
                  isProductInCart
                    ? removeProductFromCart()
                    : addProductToCart();
                }}
              >
                {isProductInCart ? (
                  <span className="flex items-center text-lg h-full w-full justify-center">
                    <IoBagRemoveOutline className="mr-2 text-2xl" />
                    Remove From Cart
                  </span>
                ) : (
                  <span className="flex items-center text-lg h-full w-full justify-center">
                    <i className="fa-solid fa-bag-shopping text-xl mr-2"></i>
                    Add To Cart
                  </span>
                )}
              </button>
            ) : (
              <button className="flex mb-4 mt-1 text-white bg-orange-600 border-0 py-4 px-12 focus:outline-none rounded">
                {isLoading ? (
                  <span className="flex items-center text-lg h-full w-full justify-center">
                    <CiNoWaitingSign className="text-3xl mr-2" />
                    Please Wait
                  </span>
                ) : (
                  <span className="flex items-center text-lg h-full w-full justify-center">
                    <PiSmileySadLight className="text-3xl mr-2" />
                    Out of Stock
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      {productDashboardData && (
        <>
          <ProductReviews productId={productDashboardData._id} />
          <SellerContact productData={productDashboardData} />
          <FAQ productData={productDashboardData} />
        </>
      )}
    </>
  );
}

export default ProductDetails;
