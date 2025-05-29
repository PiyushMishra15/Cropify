import React, { useEffect, useState } from "react";
import useReview from "../../hooks/useReview";
import Spinner from "../../components/Spinner";
import Rating from "../../components/Rating";
import { PiSmileySadLight } from "react-icons/pi";

const ProductReviewForm = ({ productId }) => {
  const { getReviews, isLoading } = useReview();

  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(5); // you can make this dynamic if needed
  const [totalReviews, setTotalReviews] = useState(0);

  const fetchReviews = async () => {
    const { data, total } = await getReviews({ productId, page, perPage });
    setReviews(data || []);
    setTotalReviews(total || 0);
  };

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId, page]);

  const totalPages = Math.ceil(totalReviews / perPage);

  return (
    <div className="my-6 space-y-4">
      <h3 className="text-xl font-semibold border-b pb-2">Customer Reviews</h3>

      {isLoading ? (
        <div className="flex justify-center my-6">
          <Spinner width="w-10" color="#14b8a6" />
        </div>
      ) : !reviews.length ? (
        <div className="flex flex-col justify-center items-center text-gray-500 text-base my-6">
          <PiSmileySadLight className="text-4xl mb-1" />
          <p>No reviews yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <>
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-4 rounded-md shadow-sm border"
            >
              <div className="flex items-center justify-between mb-2">
                <Rating rate={review.stars} readOnly size="text-xl" />
                <span className="text-sm text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h4 className="text-lg font-medium mb-1">{review.heading}</h4>
              <p className="text-sm text-gray-700">{review.description}</p>
            </div>
          ))}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-4">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1 border rounded text-sm hover:bg-gray-100 disabled:opacity-50"
              >
                Prev
              </button>
              <span className="px-2 text-sm text-gray-700">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                className="px-3 py-1 border rounded text-sm hover:bg-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductReviewForm;
