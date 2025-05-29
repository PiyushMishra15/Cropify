import React from "react";
import useProgressiveImg from "../hooks/useProgressiveImg";
import { motion } from "framer-motion";

const CategoryCard = ({ title, image, compressedImg, onClick }) => {
  const [src, isLoading] = useProgressiveImg(compressedImg, image);

  return (
    <motion.div
      className="relative h-48 md:h-64 lg:h-72 overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative h-full w-full overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse">
            <div className="absolute inset-0 transform translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
        )}

        <img
          src={src}
          alt={title}
          className={`h-full w-full object-cover transition-all duration-700 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/60 transition-opacity duration-300" />

        <motion.div
          className="absolute bottom-0 left-0 w-full p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <h3 className="text-xl font-bold text-white drop-shadow-sm">
            {title}
          </h3>
        </motion.div>

        <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 hover:opacity-100" />
      </div>
    </motion.div>
  );
};

export default CategoryCard;
