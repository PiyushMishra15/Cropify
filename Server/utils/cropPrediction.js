const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const cropPredictorServices = async ({
  soil,
  altitudeNum,
  temperatureNum,
  humidityNum,
  rainfallNum,
}) => {
  try {
    const prompt = `Given the following environmental and soil conditions:
- Soil type: ${soil}
- Altitude: ${altitudeNum} meters
- Temperature: ${temperatureNum} °C
- Humidity: ${humidityNum} %
- Rainfall: ${rainfallNum} mm/year
Please suggest the most suitable crop(s) for cultivation under these conditions, and provide reasons for your recommendation.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.send(text);
  } catch (err) {
    console.log(err);
    res.send("Unexpected Error!!!");
  }
};

module.exports = cropPredictorServices;
