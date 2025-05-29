import React from "react";
import useProgressiveImg from "../../hooks/useProgressiveImg";
import { motion } from "framer-motion";

function Hero() {
  const [src, isLoading] = useProgressiveImg(
    "/images/home-banner/homeCompressed.jpg",
    "/images/home-banner/home.jpg"
  );

  return (
    <section className="relative min-h-[80vh] lg:min-h-screen w-full overflow-hidden mb-14">
      {/* Background Image with Gradient Overlay */}
      <div
        className={`absolute inset-0 w-full h-full transition-all duration-1000 ${
          isLoading ? "scale-105 blur-xl" : "scale-100 blur-0"
        }`}
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(255, 255, 255, 0.95) 0%,
              rgba(255, 255, 255, 0.85) 30%,
              rgba(255, 255, 255, 0.45) 100%
            ),
            url(${src})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content Container */}
      <div className="relative h-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex h-[80vh] lg:h-screen items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="max-w-xl">
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Fresh <span className="text-green-600">Produce</span> from CROPIFY
            </motion.h1>

            <motion.p
              className="mt-6 text-lg sm:text-xl text-gray-700 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Connecting Farmers and Consumers - Bringing Fresh Produce to Your
              Doorstep!
            </motion.p>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <button className="px-8 py-3 bg-green-600 text-white rounded-full font-semibold shadow-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-300">
                Get Started
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

export default Hero;
