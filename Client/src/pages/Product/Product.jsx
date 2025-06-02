import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, Loader2 } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import ProductSkeleton from "../../components/ProductSkeleton";
import EmptyStatetext from "../../components/EmptyStatetext";
import useProduct from "../../hooks/useProduct";
import { getCurrentLocation } from "../../utils/getCurrentLocation";
import LeafletMap from "../../components/map/LeafletMap";
import { useDispatch } from "react-redux";
import { setLocation } from "../../redux/slices/locationSlice";
import Navbar from "../../components/NavBar.jsx";

function Product() {
  const { type } = useParams();
  const products_per_page = 50;
  const dispatch = useDispatch();

  const [deliverableProductData, setDeliverableProductData] = useState([]);
  const [nonDeliverableProductData, setNonDeliverableProductData] = useState(
    []
  );

  const [page, setPage] = useState(1);
  const [showMap, setShowMap] = useState(false);
  const [isReachingEnd, setIsReachingEnd] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const [userLocation, setUserLocation] = useState([78.96, 20.59]); // [lng, lat]
  const [selectedLatitude, setSelectedLatitude] = useState(userLocation[1]);
  const [selectedLongitude, setSelectedLongitude] = useState(userLocation[0]);

  const { getProductsByCategory, isLoading } = useProduct();

  useEffect(() => {
    const getLocInfo = async () => {
      try {
        const userCoordinates = await getCurrentLocation(); // [lng, lat]
        setUserLocation(userCoordinates);
        setSelectedLongitude(userCoordinates[0]);
        setSelectedLatitude(userCoordinates[1]);

        dispatch(
          setLocation({
            latitude: userCoordinates[1],
            longitude: userCoordinates[0],
          })
        );

        setDeliverableProductData([]);
        setNonDeliverableProductData([]);
        setIsReachingEnd(false);
        setPage(1);
      } catch (err) {
        console.warn("Using default location (78.96, 20.59)");
      } finally {
        setInitialized(true);
      }
    };

    getLocInfo();
  }, [dispatch]);

  const getProductData = async () => {
    if (!isReachingEnd && selectedLatitude && selectedLongitude) {
      const data = await getProductsByCategory(
        type,
        page,
        products_per_page,
        selectedLongitude,
        selectedLatitude
      );

      if (!data) return;

      setIsReachingEnd(!data.hasMore);
      setDeliverableProductData((prev) => [
        ...prev,
        ...data.deliverableProducts,
      ]);
      setNonDeliverableProductData((prev) => [
        ...prev,
        ...data.nonDeliverableProducts,
      ]);
    }
  };

  useEffect(() => {
    if (initialized) getProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, initialized]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900 capitalize">
                {type}
              </h1>
              <button
                onClick={() => setShowMap(true)}
                className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-full hover:bg-rose-100 transition-colors duration-200"
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">Change Location</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {deliverableProductData.map((data, index) => (
              <motion.div
                key={data._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.05, 0.5) }}
              >
                <ProductCard data={data} addOverlay={false} />
              </motion.div>
            ))}

            {nonDeliverableProductData.map((data, index) => (
              <motion.div
                key={data._id || `non-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.05, 0.5) }}
              >
                <ProductCard data={data} addOverlay={true} />
              </motion.div>
            ))}

            {isLoading && <ProductSkeleton noOfBoxes={products_per_page} />}
          </motion.div>

          {!isLoading && isReachingEnd && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <EmptyStatetext
                marginY="my-12"
                text="You've reached the end! Check back later or explore other categories."
              />
            </motion.div>
          )}

          {!isReachingEnd && !isLoading && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="flex items-center gap-2 px-6 py-2 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-colors duration-200"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Load More"
                )}
              </button>
            </div>
          )}
        </div>

        {/* Map Modal */}
        <AnimatePresence>
          {showMap && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="relative w-full max-w-4xl h-[80vh] bg-white rounded-lg shadow-xl overflow-hidden"
              >
                <div className="absolute top-4 right-4 z-[999] flex gap-4">
                  <div className="px-3 py-1.5 bg-white/90 rounded-md text-sm font-medium">
                    {selectedLatitude.toFixed(2)},{" "}
                    {selectedLongitude.toFixed(2)}
                  </div>
                  <button
                    onClick={() => setShowMap(false)}
                    className="p-2 bg-white/90 rounded-md hover:bg-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 z-[999] flex gap-4">
                  <button
                    onClick={() => {
                      setShowMap(false);
                      setUserLocation([selectedLongitude, selectedLatitude]);
                      setPage(1);
                      setDeliverableProductData([]);
                      setNonDeliverableProductData([]);
                      setIsReachingEnd(false);
                    }}
                    className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors duration-200"
                  >
                    Confirm Location
                  </button>
                </div>

                <LeafletMap
                  showSearchBox={true}
                  latitude={selectedLatitude}
                  longitude={selectedLongitude}
                  width="w-full"
                  height="h-full"
                  setLatitude={setSelectedLatitude}
                  setLongitude={setSelectedLongitude}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Product;
