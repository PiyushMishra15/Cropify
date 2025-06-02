import React, { useEffect, useState } from "react";
import CartCard from "../../components/CartCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar.jsx";
import { toast, Bounce } from "react-toastify";

function Cart() {
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.cart.items);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let amount = 0;
    cartData.forEach((item) => {
      amount += item.currentPrice;
    });
    setTotalAmount(amount);
  }, [cartData]);

  const handleCheckout = () => {
    if (cartData.length === 0) {
      bottom -
        right("Your cart is empty. Please add products to proceed.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

      return;
    }
    navigate("/orders");
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen bg-white pt-16 flex justify-center py-10 px-4">
        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-white shadow-xl rounded-lg flex flex-col">
          <div className="flex-1 px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Shopping Cart
              </h2>
            </div>

            {cartData.length === 0 ? (
              <p className="text-gray-500 text-sm">Your cart is empty.</p>
            ) : (
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartData.map((item, index) => (
                  <CartCard item={item} key={index} />
                ))}
              </ul>
            )}
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>Rs. {totalAmount}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <button
                className="w-full flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 transition duration-300"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                or{" "}
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
