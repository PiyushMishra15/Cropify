import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import FAQSkeleton from "../../components/FAQSkeleton";
import EmptyStatetext from "../../components/EmptyStatetext";
import useFaq from "../../hooks/useFaq";

function FAQ({ productData }) {
  const [reviewData, setReviewData] = useState([]);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFAQsFetchingFirstTime, setIsFAQsFetchingFirstTime] = useState(true);

  const { getFAQsByProduct, isLoading } = useFaq();

  useEffect(() => {
    const getReview = async () => {
      if (!productData?._id) return;

      const data = await getFAQsByProduct(productData._id);
      if (data.length === 0) {
        setReachedEnd(true);
      } else {
        setReviewData((prev) => [...prev, ...data]);
      }
      setIsFAQsFetchingFirstTime(false);
    };

    getReview();
  }, [currentPage, productData]);

  return (
    <div className="w-11/12 mx-auto flex flex-wrap pb-12">
      <div className="container mx-auto">
        <section className="text-gray-900">
          <h1 className="text-2xl md:text-3xl font-medium text-gray-900 mb-1">
            Frequently Asked Questions
          </h1>

          {isFAQsFetchingFirstTime ? (
            <FAQSkeleton />
          ) : reviewData.length === 0 ? (
            <EmptyStatetext text="No FAQs yet! Have a question about this product? Be the first to ask! Your inquiry could help others too. Start the conversation now!" />
          ) : (
            <div className="grid lg:grid-cols-3 gap-4 md:gap-x-6 md:gap-y-12">
              {reviewData.map((data) => (
                <div key={data._id || data.question}>
                  <p className="font-bold mb-1 md:mb-4 text-pink-500">
                    {data.question}
                  </p>
                  <p className="text-gray-500">{data.answer}</p>
                </div>
              ))}
            </div>
          )}

          {!reachedEnd && reviewData.length > 0 && (
            <div className="w-full text-center my-6 flex justify-center">
              <button
                className="text-base py-2 px-8 flex flex-row justify-center items-center text-white font-medium rounded-full cursor-pointer bg-pink-500 disabled:opacity-60"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={isLoading}
              >
                {isLoading && <Spinner width="w-5" color="#ffffff" />}
                <span className="ml-2">Load More</span>
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default FAQ;
