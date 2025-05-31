import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import FaqSellerSkeleton from "../../components/FaqSellerSkeleton";
import EmptyStatetext from "../../components/EmptyStatetext";
import useFaq from "../../hooks/useFaq";

function SellerFAQs() {
  const { getFAQsBySeller, answerFAQ } = useFaq();

  const [openFAQ, setOpenFAQ] = useState(null);
  const [answer, setAnswer] = useState("");

  const [answeredFAQ, setAnsweredFAQ] = useState([]);
  const [unansweredFAQ, setUnansweredFAQ] = useState([]);

  const [loading, setLoading] = useState(false);
  const [isDataFetching, setIsDataFetching] = useState(true);

  // Submit the answer to an FAQ
  const submitAnswer = async (faqId) => {
    if (!answer.trim()) return; // Prevent empty submission
    setLoading(true);

    const isSuccess = await answerFAQ(faqId, answer);
    if (isSuccess) {
      // Move FAQ from unanswered to answered
      const updatedFAQ = unansweredFAQ.find((faq) => faq._id === faqId);
      updatedFAQ.answer = answer;

      setAnsweredFAQ((prev) => [...prev, updatedFAQ]);
      setUnansweredFAQ((prev) => prev.filter((faq) => faq._id !== faqId));

      setOpenFAQ(null);
      setAnswer("");
    }
    setLoading(false);
  };

  const fetchFAQs = async () => {
    setIsDataFetching(true);
    const answered = await getFAQsBySeller(true);
    const unanswered = await getFAQsBySeller(false);
    setAnsweredFAQ(answered);
    setUnansweredFAQ(unanswered);
    setIsDataFetching(false);
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  return (
    <>
      <h2 className="text-4xl md:text-5xl font-semibold text-gray-700 text-center md:text-left ml-96 mb-8 mt-6">
        FAQs
      </h2>

      {isDataFetching ? (
        <FaqSellerSkeleton />
      ) : unansweredFAQ.length === 0 && answeredFAQ.length === 0 ? (
        <EmptyStatetext text="Looks like your FAQ section is empty. No questions yet! But don't worry, once users start asking about your products, you'll find them here." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-0">
          {/* Unanswered FAQs */}
          {unansweredFAQ.map((faq) => {
            const isOpen = openFAQ === faq._id;
            return (
              <div
                key={faq._id}
                className="bg-white rounded-lg shadow-md p-5 flex gap-4 hover:shadow-lg transition-shadow"
              >
                <button
                  aria-label="Toggle FAQ"
                  onClick={() => setOpenFAQ(isOpen ? null : faq._id)}
                  className={`flex items-center justify-center w-10 h-10 rounded-md transition-transform ${
                    isOpen
                      ? "rotate-180 text-red-700 bg-red-200"
                      : "text-red-500 bg-red-100"
                  }`}
                >
                  <MdOutlineKeyboardArrowDown size={24} />
                </button>

                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between font-semibold text-gray-800 mb-2">
                    <span>{faq.question}</span>
                    <Link
                      to={`/category/product/details/${faq.productId}`}
                      target="_blank"
                      className="text-xs px-3 py-1 rounded-full border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
                    >
                      See Product
                    </Link>
                  </div>

                  {isOpen && (
                    <>
                      <textarea
                        placeholder="Write your answer here..."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="resize-none h-28 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700"
                      />

                      <button
                        onClick={() => submitAnswer(faq._id)}
                        disabled={loading || !answer.trim()}
                        className={`mt-3 py-2 rounded-md text-white font-semibold flex justify-center items-center gap-2 ${
                          loading || !answer.trim()
                            ? "bg-red-300 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        } transition`}
                      >
                        {loading && <Spinner width="w-5" color="#fff" />}
                        Submit Answer
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}

          {/* Answered FAQs */}
          {answeredFAQ.map((faq) => {
            const isOpen = openFAQ === faq._id;
            return (
              <div
                key={faq._id}
                className="bg-white rounded-lg shadow-md p-5 flex gap-4 hover:shadow-lg transition-shadow"
              >
                <button
                  aria-label="Toggle FAQ"
                  onClick={() => setOpenFAQ(isOpen ? null : faq._id)}
                  className={`flex items-center justify-center w-10 h-10 rounded-md transition-transform ${
                    isOpen
                      ? "rotate-180 text-green-700 bg-green-200"
                      : "text-green-500 bg-green-100"
                  }`}
                >
                  <MdOutlineKeyboardArrowDown size={24} />
                </button>

                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between font-semibold text-gray-800 mb-2">
                    <span>{faq.question}</span>
                    <Link
                      to={`/category/product/details/${faq.productId}`}
                      target="_blank"
                      className="text-xs px-3 py-1 rounded-full border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition"
                    >
                      See Product
                    </Link>
                  </div>

                  {isOpen && (
                    <p className="text-gray-700 whitespace-pre-wrap border border-gray-200 rounded-md p-4 bg-green-50">
                      {faq.answer}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default SellerFAQs;
