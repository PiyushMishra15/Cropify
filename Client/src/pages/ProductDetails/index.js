import React from "react";
import ProductDetails from "./ProductDetails";
import ProductReviews from "./ProductReviews";
import FAQ from "./FAQ";
import SellerContact from "./SellerContact";

function ProductDashboard({ productData }) {
  return (
    <div className="space-y-16 md:space-y-24">
      <ProductDetails productData={productData} />
      {productData && (
        <>
          <ProductReviews productData={productData} />
          <SellerContact productData={productData} />
          <FAQ productData={productData} />
        </>
      )}
    </div>
  );
}

export default ProductDashboard;
