//import { notify } from './notification';
import { toast, Bounce } from "react-toastify";
export const getCurrentLocation = async () => {
  if (!navigator.geolocation) {
    console.error("Geolocation is not supported by this browser.");

    toast.error("Geolocation is not supported by this browser.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
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
        toast.error(
          "Unable to retrieve your location. Please allow location access.",
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );
        reject(new Error(`Geolocation error: ${error.message}`)); // Fixed: removed array
      }
    );
  });
};
