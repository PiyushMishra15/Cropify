import React, { useEffect, useState } from "react";
import useReview from "../../hooks/useReview";
import ProductReviewForm from "./ProductReviewForm";
import { Star, ThumbsUp, MessageCircle } from "lucide-react";

const Rating = ({ rate, size }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`${size === "text-lg" ? "w-4 h-4" : "w-5 h-5"} ${
          star <= rate ? "fill-amber-400 text-amber-400" : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

const Spinner = ({ width, color }) => (
  <div
    className={`${width} h-5 animate-spin rounded-full border-2 border-white border-t-transparent`}
  />
);

const ReviewsSkeleton = () => (
  <div className="space-y-6 w-full">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    ))}
  </div>
);

const EmptyStateText = ({ text }) => (
  <div className="text-center py-16 px-6">
    <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center mb-6">
      <MessageCircle className="w-10 h-10 text-blue-500" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-3">No Reviews Yet</h3>
    <p className="text-gray-600 max-w-md mx-auto leading-relaxed">{text}</p>
  </div>
);

function ProductReviews({ productId }) {
  const { getReviews, isLoading } = useReview();

  const [reviewData, setReviewData] = useState([]);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isReviewFirstTimeLoading, setIsReviewFirstTimeLoading] =
    useState(true);
  const [bool, setBool] = useState(false);

  useEffect(() => {
    const getReview = async () => {
      if (!productId) return;

      const data = await getReviews(productId, currentPage, 5);
      if (data.length === 0) {
        setReachedEnd(true);
      }

      setReviewData((prev) => {
        const newData = [...prev, ...data];
        // Remove duplicates by _id
        const uniqueData = Array.from(
          new Map(newData.map((item) => [item._id, item])).values()
        );
        return uniqueData;
      });
      setIsReviewFirstTimeLoading(false);
    };

    getReview();
  }, [productId, currentPage, bool]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
            Customer Reviews
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
        </div>

        {/* Review Form */}
        {productId && (
          <ProductReviewForm productId={productId} setBool={setBool} />
        )}

        {/* Reviews Content */}
        <div className="space-y-6">
          {isReviewFirstTimeLoading ? (
            <ReviewsSkeleton />
          ) : reviewData.length === 0 ? (
            <EmptyStateText text="Be the first to share your thoughts! This product doesn't have any reviews yet. Your feedback can help others make informed decisions. Write a review now!" />
          ) : (
            <>
              {/* Reviews Header */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Reviews ({reviewData.length})
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Verified purchases</span>
                </div>
              </div>

              {/* Reviews List */}
              {reviewData.map((item, index) => (
                <div
                  key={item._id || index}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-gray-200"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                        {item.heading}
                      </h3>
                      <div className="flex items-center gap-3 mb-4">
                        <Rating rate={item.stars} size="text-lg" />
                        <span className="text-sm font-medium text-gray-600">
                          {item.stars} out of 5 stars
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed text-lg">
                    {item.description}
                  </p>

                  {/* Review Footer */}
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                    <span>Verified Purchase</span>
                    <span>Helpful • Report</span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Load More Button */}
        {!reachedEnd && reviewData.length > 0 && (
          <div className="text-center pt-8">
            <button
              className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-4 rounded-xl font-medium hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage((prevPage) => prevPage + 1);
              }}
              disabled={isLoading}
            >
              {isLoading && <Spinner width="w-5" color="#ffffff" />}
              <span>Load More Reviews</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductReviews;
