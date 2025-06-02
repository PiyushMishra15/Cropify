import axios from "axios";

const BASE_URL = "http://localhost:3000/api/ai"; // Adjust base URL as per your environment

const predictCrops = async (queryParams) => {
  try {
    const response = await axios.get(`${BASE_URL}/predict`, {
      params: {
        soil: queryParams.soil,
        altitude: queryParams.altitude,
        temperature: queryParams.temperature,
        humidity: queryParams.humidity,
        rainfall: queryParams.rainfall,
      },
    });

    return response.data; // Contains prediction results
  } catch (error) {
    throw error;
  }
};

export default predictCrops;
