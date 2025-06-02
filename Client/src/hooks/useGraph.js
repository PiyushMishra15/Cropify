import axios from "axios";
const BASE_URL = "http://localhost:3000/api/graph";
const fetchGraphData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default fetchGraphData;
