import React from "react";
import OrderCartCard from "../../components/OrderCartCard";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import CustomerLocationSelector from "./CustomerLocationSelector";
import OrderSummary from "./OrderSummary";
import PaymentCard from "./PaymentCard";
import Navbar from "../../components/NavBar.jsx";

function Order() {
  function getCurrentDateTime() {
    const now = new Date();

    // Format date as YYYY-MM-DD HH:mm:ss
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months start at 0
    const day = String(now.getDate()).padStart(2, "0");

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const deliveryCharge = 500;
  const limitForFreeDelivery = 1500;

  const cartData = useSelector((state) => state.cart.items);

  const [totalAmount, setTotalAmount] = useState(0);

  const [customerLatitude, setCustomerLatitude] = useState(null);
  const [customerLongitude, setCustomerLongitude] = useState(null);

  const { latitude, longitude } = useSelector((state) => state.userLocation);
  console.log("Latitude:", latitude, "Longitude:", longitude);

  useEffect(() => {
    let amount = 0;
    cartData.map((item) => {
      amount = amount + item.currentPrice;
    });
    setTotalAmount(amount);
  }, [cartData]);

  useEffect(() => {
    setCustomerLatitude(latitude);
    setCustomerLongitude(longitude);
  }, [latitude, longitude]);

  return (
    <>
      <Navbar />
      <div className="py-14 pt-16 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex justify-start item-start space-y-1 md:space-y-2 flex-col">
          <h1 className="text-2xl md:text-3xl font-semibold leading-6 text-gray-800">
            Your Order{" "}
          </h1>
          <p className="text-sm md:text-base  font-medium leading-6 text-gray-600">
            {getCurrentDateTime()}
          </p>
        </div>
        <div className="mt-6 md:mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start  bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p className="text-lg md:text-xl  font-semibold leading-6 xl:leading-5 text-gray-800">
                Your Cart
              </p>

              {cartData.map((item, index) => (
                <OrderCartCard item={item} key={index} />
              ))}
            </div>
            <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <OrderSummary
                totalAmount={totalAmount}
                deliveryCharge={deliveryCharge}
                limitForFreeDelivery={limitForFreeDelivery}
              />
              <PaymentCard
                totalAmount={totalAmount}
                deliveryCharge={deliveryCharge}
                limitForFreeDelivery={limitForFreeDelivery}
                customerLatitude={customerLatitude}
                customerLongitude={customerLongitude}
              />
            </div>
          </div>
          {customerLatitude && (
            <CustomerLocationSelector
              customerLatitude={customerLatitude}
              customerLongitude={customerLongitude}
              setCustomerLatitude={setCustomerLatitude}
              setCustomerLongitude={setCustomerLongitude}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Order;
