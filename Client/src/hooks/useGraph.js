import axios from "axios";
const BASE_URL = "http://localhost:3000/api/graph";
const fetchGraphData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    console.log("Graph data fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching graph data:", error);
    throw error;
  }
};

export default fetchGraphData;
