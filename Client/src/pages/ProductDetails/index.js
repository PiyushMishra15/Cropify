import React from "react";
import ProductDetails from "./ProductDetails";
import ProductReviews from "./ProductReviews";
import FAQ from "./FAQ";
import SellerContact from "./SellerContact";

function ProductDashboard() {
  return (
    <>
      <div className="space-y-16  bg-amber-50 md:space-y-24">
        <ProductDetails />
      </div>
    </>
  );
}

export default ProductDashboard;
