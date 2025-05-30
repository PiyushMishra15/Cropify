const fetchGraphData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching graph data:", error);
    throw error;
  }
};

export default fetchGraphData;
