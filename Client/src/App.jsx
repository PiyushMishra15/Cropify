import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/";
import AuthPage from "./pages/Account/Auth";
import Product from "./pages/Product/Product";
import PrivateRoute from "./pages/Account/privateRoute";
import ShowMap from "./pages/map/showMap";
import SellerOverview from "./pages/SellerDashboard/SellerOverview";
import SellerProducts from "./pages/SellerDashboard/SellerProducts";
import SellerOrderRequests from "./pages/SellerDashboard/SellerOrderRequests";
import SellerFAQs from "./pages/SellerDashboard/SellerFAQs";
import CropSenseAi from "./pages/SellerDashboard/CropSenseAI";
import SellerProduct from "./pages/SellerProduct";
import WaitForVerification from "./pages/Account/verifyEmail";
import SellerDashboard from "./pages/SellerDashboard";
import ProductDashboard from "./pages/ProductDetails/ProductDetails";
import Footer from "./components/Footer";
import ResetPassword from "./pages/Account/ResetPassword";
import Order from "./pages/orders";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cart from "./pages/cart";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/login" element={<AuthPage />} />

          <Route
            exact
            path="/verifyEmail/:type/:id"
            element={<WaitForVerification />}
          />
          <Route
            path="/resetPassword/:type/:token"
            element={<ResetPassword />}
          />
          <Route
            path="/category/:type"
            element={
              <PrivateRoute>
                <Product />
              </PrivateRoute>
            }
          />
          <Route
            path="/map"
            element={
              <PrivateRoute>
                <ShowMap />
              </PrivateRoute>
            }
          ></Route>

          <Route
            path="/sellerdashboard"
            element={
              <PrivateRoute>
                <SellerDashboard />
              </PrivateRoute>
            }
          >
            <Route
              path=""
              element={
                <PrivateRoute>
                  <SellerOverview />
                </PrivateRoute>
              }
            ></Route>

            <Route
              path="products"
              element={
                <PrivateRoute>
                  <SellerProducts />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="order"
              element={
                <PrivateRoute>
                  <SellerOrderRequests />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="faqs"
              element={
                <PrivateRoute>
                  <SellerFAQs />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="cropsenseAi"
              element={
                <PrivateRoute>
                  <CropSenseAi />
                </PrivateRoute>
              }
            ></Route>

            <Route
              path="products/:operation"
              element={
                <PrivateRoute>
                  <SellerProduct />
                </PrivateRoute>
              }
            />
          </Route>

          <Route exact path="/map/:latitude/:longitude" element={<ShowMap />} />

          <Route
            exact
            path="/category/:type/details/:productId"
            element={
              <PrivateRoute>
                <ProductDashboard />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/orders"
            element={
              <PrivateRoute>
                <Order />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Footer />
    </>
  );
}
