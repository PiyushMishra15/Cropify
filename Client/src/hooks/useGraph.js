import axios from "axios";

const BASE_URL = "http://localhost:3000/api/graph";

export const fetchGraphData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`, {});

    return response.data; // Expected to contain graph data
  } catch (error) {
    console.error("Error fetching graph data:", error);
    throw error;
  }
};
