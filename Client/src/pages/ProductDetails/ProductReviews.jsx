import React, { useEffect, useState } from "react";
import Rating from "../../components/Rating";
import Spinner from "../../componentsSpinner";
import ReviewsSkeleton from "../../components/ReviewsSkeleton";
import EmptyStateText from "../../components/EmptyStatetext";
import useReview from "../../hooks/reviews/useReview";
import ProductReviewForm from "./ProductReviewForm";

function ProductReviews({ productId }) {
  const { getReviews, isLoading } = useReview();

  const [reviewData, setReviewData] = useState([]);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isReviewFirstTimeLoading, setIsReviewFirstTimeLoading] =
    useState(true);

  useEffect(() => {
    const getReview = async () => {
      if (!productId) return;

      let data = await getReviews(productId, currentPage, 5);
      if (data.length === 0) {
        setReachedEnd(true);
      }
      setReviewData((prev) => [...prev, ...data]);
      setIsReviewFirstTimeLoading(false);
    };

    getReview();
  }, [productId, currentPage]);

  return (
    <div className="w-11/12 mx-auto flex flex-wrap">
      <div className="w-full mx-auto flex justify-center items-center">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-8">
          <div className="flex w-full justify-center items-start">
            <h1 className="text-2xl md:text-3xl font-medium text-gray-900 mb-1">
              Customer Reviews
            </h1>
          </div>

          {/* Pass productId down if needed */}
          <ProductReviewForm productId={productId} />

          {isReviewFirstTimeLoading ? (
            <ReviewsSkeleton />
          ) : reviewData.length === 0 ? (
            <EmptyStateText text="Be the first to share your thoughts! This product doesn't have any reviews yet. Your feedback can help others make informed decisions. Write a review now!" />
          ) : (
            reviewData.map((item, index) => (
              <div
                key={index}
                className="w-full flex justify-start items-start flex-col bg-gray-50 p-4 md:p-8"
              >
                <div className="flex flex-row justify-between w-full">
                  <div className="flex flex-row justify-between items-start">
                    <p className="text-xl md:text-2xl font-medium leading-normal text-teal-600">
                      {item.heading}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <Rating rate={item.stars} size="text-lg" />
                  </div>
                </div>
                <p className="mt-3 text-base leading-normal text-gray-600 w-full md:w-9/12 xl:w-5/6">
                  {item.description}
                </p>
              </div>
            ))
          )}

          {!reachedEnd && (
            <div className="w-full text-center flex justify-center">
              <button
                className="text-base py-2 px-8 flex flex-row justify-center items-center text-white font-medium rounded-full cursor-pointer bg-teal-500"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prevPage) => prevPage + 1);
                }}
              >
                {isLoading && <Spinner width="w-5" color="#ffffff" />}
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductReviews;
