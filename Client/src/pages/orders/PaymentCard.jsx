import React from "react";
import useOrder from "../../hooks/useOrder";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";

const PaymentCard = ({
  totalAmount,
  limitForFreeDelivery,
  deliveryCharge,
  customerLatitude,
  customerLongitude,
}) => {
  const cartData = useSelector((state) => state.cart.items);

  const { addOrder, isLoading: isPaymentInitiated } = useOrder();
  const navigate = useNavigate();

  const orderNow = async () => {
    if (customerLatitude === null || customerLongitude === null) {
      toast.info("Please allow the location access!!", {
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
      return;
    }

    const orderData = [];
    for (const element of cartData) {
      orderData.push({
        productId: element._id,
        orderQty: element.qty,
        orderLocation: {
          coordinates: [customerLongitude, customerLatitude],
        },
        sellerId: element.sellerId,
      });
    }

    // console.log("Order data:", orderData);

    addOrder(orderData);

    toast.success("Order Placed Successfully!", {
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
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50  space-y-6">
      <h3 className="text-xl  font-semibold leading-5 text-gray-800">
        Shipping
      </h3>
      <div className="flex justify-between items-start w-full">
        <div className="flex justify-center items-center space-x-4">
          <div className="w-8 h-8">
            <img
              loading="lazy"
              className="w-full h-full"
              alt="logo"
              src="https://cdn.dribbble.com/userupload/11206278/file/original-a7b2f40210bbd699366cbff7a664e1b2.png?resize=752x"
            />
          </div>
          <div className="flex flex-col justify-start items-center">
            <p className="text-lg leading-6  font-semibold text-gray-800">
              Cropify
              <br />
              <span className="font-normal">Delivery within 24 Hours</span>
            </p>
          </div>
        </div>
        <p className="text-lg font-semibold leading-6  text-gray-800">
          Rs.
          {totalAmount +
            (totalAmount >= limitForFreeDelivery ? 0 : deliveryCharge)}
          .00
        </p>
      </div>
      <div className="w-full flex justify-center items-center">
        <button
          className="hover:bg-black    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white flex flex-row justify-center items-center"
          onClick={() => {
            if (cartData.length === 0) {
              "First add some items to cart", "info";
            } else {
              orderNow();
            }
          }}
        >
          {isPaymentInitiated && <Spinner width="w-6" color="#ffffff" />}
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;
