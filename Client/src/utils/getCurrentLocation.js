//import { notify } from './notification';

export const getCurrentLocation = async () => {
  if (!navigator.geolocation) {
    console.error("Geolocation is not supported by this browser.");
    alert("Geolocation is not supported by this browser.", "error");
    throw new Error("Geolocation is not supported");
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
        resolve([longitude, latitude]); // lng, lat
      },
      (error) => {
        console.error(`Error Code: ${error.code} - ${error.message}`);
        alert(
          "Unable to retrieve your location. Please allow location access."
        );
        alert("Setting (20.59,78.96) as default location.");
        reject(new Error(`Geolocation error: ${error.message}`)); // Fixed: removed array
      }
    );
  });
};
