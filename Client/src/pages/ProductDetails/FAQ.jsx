import React, { useEffect, useState } from "react";
import useFAQs from "../../hooks/useFaq";
import { HelpCircle, MessageSquare, ChevronRight } from "lucide-react";

const Spinner = ({ width, color }) => (
  <div
    className={`${width} h-5 animate-spin rounded-full border-2 border-white border-t-transparent`}
  />
);

const FAQSkeleton = () => (
  <div className="grid lg:grid-cols-3 gap-6 mt-8">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div
        key={i}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse"
      >
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    ))}
  </div>
);

const EmptyStatetext = ({ text }) => (
  <div className="text-center py-16 px-6">
    <div className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-50 to-pink-100 rounded-full flex items-center justify-center mb-6">
      <HelpCircle className="w-10 h-10 text-purple-500" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-3">
      No FAQs Available
    </h3>
    <p className="text-gray-600 max-w-md mx-auto leading-relaxed">{text}</p>
  </div>
);

function FAQ({ productData = { _id: "123" } }) {
  const [reviewData, setReviewData] = useState([]);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFAQsFetchingFirstTime, setIsFAQsFetchingFirstTime] = useState(true);

  const { getFAQsByProduct, isLoading } = useFAQs();

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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="container mx-auto">
        <section className="text-gray-900">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-3 rounded-full mb-6">
              <HelpCircle className="w-6 h-6 text-purple-600" />
              <span className="text-purple-700 font-medium">FAQ Section</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Frequently Asked Questions
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          {isFAQsFetchingFirstTime ? (
            <FAQSkeleton />
          ) : reviewData.length === 0 ? (
            <EmptyStatetext text="No FAQs yet! Have a question about this product? Be the first to ask! Your inquiry could help others too. Start the conversation now!" />
          ) : (
            <>
              {/* FAQ Count */}
              <div className="flex items-center justify-center mb-8">
                <div className="bg-white rounded-full px-6 py-2 shadow-sm border border-gray-200">
                  <span className="text-gray-600 font-medium">
                    {reviewData.length} Questions Answered
                  </span>
                </div>
              </div>

              {/* FAQ Grid */}
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                {reviewData.map((data, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-purple-200 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        Q
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-4 text-gray-900 leading-tight group-hover:text-purple-600 transition-colors duration-200">
                          {data.question}
                        </h3>
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            A
                          </div>
                          <p className="text-gray-600 leading-relaxed">
                            {data.answer}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Hover indicator */}
                    <div className="mt-6 flex items-center text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="text-sm font-medium">Read more</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Load More Button */}
        </section>
      </div>
    </div>
  );
}

export default FAQ;
