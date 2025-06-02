import { useState } from "react";
import {
  Leaf,
  Cloud,
  Thermometer,
  Droplets,
  Mountain,
  Sprout,
} from "lucide-react";
import Spinner from "../../components/Spinner";
import predictCrops from "../../hooks/useAi";

const CropSenseAi = () => {
  const [prediction, setPrediction] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    soil: "",
    altitude: "",
    temperature: "",
    humidity: "",
    rainfall: "",
  });

  const cropPrediction = async () => {
    setIsLoading(true);
    try {
      const res = await predictCrops(formData);

      setPrediction(res.message);
    } catch (error) {
      setPrediction(
        "An error occurred while predicting crops. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const soilTypes = [
    { value: "sandy soil", label: "Sandy Soil" },
    { value: "clay soil", label: "Clay Soil" },
    { value: "silt soil", label: "Silt Soil" },
    { value: "peat soil", label: "Peat Soil" },
    { value: "chalk soil", label: "Chalk Soil" },
    { value: "loam soil", label: "Loam Soil" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Sprout className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            CropSense AI
          </h1>
          <p className="text-lg text-gray-600">
            Intelligent crop prediction based on environmental conditions
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
            <h2 className="text-2xl font-semibold text-white flex items-center">
              <Leaf className="w-6 h-6 mr-2" />
              Crop Predictor
            </h2>
            <p className="text-green-100 mt-1">
              Enter your environmental data to get AI-powered crop
              recommendations
            </p>
          </div>

          <div className="p-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                cropPrediction();
              }}
              className="space-y-6"
            >
              {/* Soil Type Selection */}
              <div className="space-y-2">
                <label className="text-sm  font-medium text-gray-700 flex items-center">
                  <Mountain className="w-4 h-4 mr-2 text-amber-600" />
                  Soil Type
                </label>
                <select
                  required
                  value={formData.soil}
                  onChange={(e) => {
                    setFormData({ ...formData, soil: e.target.value });
                  }}
                  className="w-full px-4 py-3 border text-black border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white"
                >
                  <option value="" disabled>
                    Select soil type
                  </option>
                  {soilTypes.map((soil) => (
                    <option key={soil.value} value={soil.value}>
                      {soil.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Altitude */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Mountain className="w-4 h-4 mr-2 text-gray-600" />
                  Altitude (km)
                </label>
                <input
                  type="number"
                  placeholder="Enter altitude (0-10 km)"
                  value={formData.altitude}
                  onChange={(e) => {
                    setFormData({ ...formData, altitude: e.target.value });
                  }}
                  className="w-full px-4 py-3 text-black border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white"
                  required
                  min="0"
                  max="10"
                  step="0.1"
                />
              </div>

              {/* Environmental Conditions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Thermometer className="w-4 h-4 mr-2 text-red-500" />
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    placeholder="-50 to 50°C"
                    value={formData.temperature}
                    onChange={(e) => {
                      setFormData({ ...formData, temperature: e.target.value });
                    }}
                    className="w-full text-black px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white"
                    required
                    min="-50"
                    max="50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Cloud className="w-4 h-4 mr-2 text-blue-500" />
                    Humidity (%)
                  </label>
                  <input
                    type="number"
                    placeholder="0 to 100%"
                    value={formData.humidity}
                    onChange={(e) => {
                      setFormData({ ...formData, humidity: e.target.value });
                    }}
                    className="w-full px-4 py-3 text-black border  border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white"
                    required
                    min="0"
                    max="100"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Droplets className="w-4 h-4 mr-2 text-blue-600" />
                    Rainfall (mm)
                  </label>
                  <input
                    type="number"
                    placeholder="0 to 1000mm"
                    value={formData.rainfall}
                    onChange={(e) => {
                      setFormData({ ...formData, rainfall: e.target.value });
                    }}
                    className="w-full px-4 py-3 text-black border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white"
                    required
                    min="0"
                    max="1000"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Spinner width="w-5" color="#ffffff" />
                      Analyzing Conditions...
                    </>
                  ) : (
                    <>
                      <Sprout className="w-5 h-5 mr-2" />
                      Predict Optimal Crops
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Prediction Results */}
            {(prediction || isLoading) && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Leaf className="w-5 h-5 mr-2 text-green-600" />
                  AI Prediction Results
                </h3>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Spinner width="w-8" color="#059669" />
                      <span className="ml-3 text-green-700 font-medium">
                        Analyzing your environmental data...
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <textarea
                        rows={10}
                        className="w-full p-4 border border-green-200 rounded-lg bg-white text-gray-800 resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="AI prediction will appear here..."
                        readOnly={true}
                        value={prediction}
                      />
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <p className="text-sm text-amber-800">
                          <strong>Disclaimer:</strong> This prediction is
                          generated by AI and may not be 100% accurate. Please
                          consult with agricultural experts for professional
                          advice.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p className="text-sm">Powered by Advanced AI Technology</p>
        </div>
      </div>
    </div>
  );
};

export default CropSenseAi;
