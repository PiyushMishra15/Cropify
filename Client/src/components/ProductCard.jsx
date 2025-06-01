import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Tag, Package } from "lucide-react";

export default function ProductCard({ data, addOverlay = false }) {
  const navigate = useNavigate();

  const goToDetailsPage = () => {
    navigate(`details/${data._id}`, { product: data });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={!addOverlay ? { scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
      onClick={() => {
        if (addOverlay) return;
        goToDetailsPage();
      }}
      className="w-full cursor-pointer h-full"
    >
      <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        {addOverlay && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] rounded-2xl z-20 flex flex-col justify-center items-center p-4">
            <Package className="w-8 h-8 text-white/80 mb-2" />
            <span className="text-white text-center font-medium">
              Not Within Delivery Radius
            </span>
          </div>
        )}

        <div className="relative z-10 flex flex-col h-full">
          <div className="relative">
            <img
              className="h-40 sm:h-48 w-full object-cover"
              src={data.image}
              alt={data.name}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div className="p-4 flex flex-col flex-grow">
            <div className="flex-grow">
              <h1 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                {data.name}
              </h1>

              <div className="flex items-center text-xs text-gray-500 mb-2">
                <Tag className="w-3.5 h-3.5 mr-1" />
                {data.brandName}
              </div>
            </div>

            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Price</span>
                <span className="text-base font-semibold text-rose-600">
                  ₹{data.pricePerUnit}/{data.measuringUnit}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Min. Order</span>
                <span className="font-medium text-gray-900">
                  {data.minimumOrderQuantity} {data.measuringUnit}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
