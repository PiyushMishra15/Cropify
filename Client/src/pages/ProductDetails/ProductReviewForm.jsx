import React, { useState, useEffect } from "react";
import useReviews from "../../hooks/useReview";
import Rating from "../../components/Rating";
import Spinner from "../../components/Spinner";
import { toast, Bounce } from "react-toastify";

const ProductReviewForm = ({ productId, setBool }) => {
  const { addReview, isLoading } = useReviews();

  const [rate, setRate] = useState(0);

  const [reviewForm, setReviewForm] = useState({
    heading: "",
    description: "",
    stars: rate,
  });

  useEffect(() => {
    setReviewForm((prevData) => ({ ...prevData, stars: rate }));
  }, [rate]);

  const handleReviewSubmit = async () => {
    const isSuccess = await addReview(productId, reviewForm);
    if (isSuccess) {
      setRate(0);
      setReviewForm((prevData) => ({
        ...prevData,
        heading: "",
        description: "",
      }));
      setBool((prev) => !prev); // Toggle to refresh reviews
      toast.success("Review Submitted Successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.info("You have already submitted a review for this product.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <form
      className="w-full gap-2 flex flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        handleReviewSubmit();
      }}
    >
      <div className="w-full flex flex-col-reverse md:flex-row gap-2">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full md:w-8/12 p-4"
          value={reviewForm.heading}
          onChange={(e) =>
            setReviewForm((prevData) => ({
              ...prevData,
              heading: e.target.value,
            }))
          }
          placeholder="Write review heading..."
        ></input>
        <div className="flex flex-row gap-2 w-full md:w-4/12">
          <div className="bg-gray-50 border border-gray-300 rounded-lg flex justify-center items-center w-9/12">
            <Rating rate={rate} setRate={setRate} size="text-2xl" />
          </div>
          <button
            className="w-3/12 text-base py-2 px-4 flex flex-row justify-center items-center text-white font-medium rounded cursor-pointer uppercase bg-teal-500"
            type="submit"
          >
            <span className="mr-1">
              {isLoading ? <Spinner width="w-6" color="#ffffff" /> : null}
            </span>
            Submit
          </button>
        </div>
      </div>
      <textarea
        rows="6"
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
        placeholder="Write your review description here..."
        value={reviewForm.description}
        onChange={(e) =>
          setReviewForm((prevData) => ({
            ...prevData,
            description: e.target.value,
          }))
        }
      ></textarea>
    </form>
  );
};

export default ProductReviewForm;
