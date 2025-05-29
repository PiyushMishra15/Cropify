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
import CropSenseAI from "./pages/SellerDashboard/CropSenseAI";
import SellerProduct from "./pages/SellerProduct";
import verifyEmail from "./pages/Account/verifyEmail";
import SellerDashboard from "./pages/SellerDashboard";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route exact path="/verifyEmail" element={<verifyEmail />} />

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
            exact
            path="/sellerdashboard"
            element={
              <PrivateRoute>
                <SellerDashboard />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/overview"
            element={
              <PrivateRoute>
                <SellerOverview />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <SellerProducts />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <SellerOrderRequests />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/faqs"
            element={
              <PrivateRoute>
                <SellerFAQs />
              </PrivateRoute>
            }
          ></Route>

          <Route exact path="/map/:latitude/:longitude" element={<ShowMap />} />
          <Route
            path="/cropsenseAi"
            element={
              <PrivateRoute>
                <CropSenseAI />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/sellerdashboard/products/:operation"
            element={
              <PrivateRoute>
                <SellerProduct />
              </PrivateRoute>
            }
          />

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
        </Routes>
      </Router>
      <Footer />
    </>
  );
}
