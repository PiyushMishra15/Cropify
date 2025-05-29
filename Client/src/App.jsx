import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/";
import AuthPage from "./pages/Account/Auth";
import Product from "./pages/Product/Product";
import PrivateRoute from "./pages/Account/PrivateRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />

        <Route
          path="/category/:type"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
