import { useEffect } from "react";
import io from "socket.io-client";

const useStockUpdateSocket = (onStockUpdate) => {
  useEffect(() => {
    const socket = io("http://localhost:3000", {
      transports: ["websocket"],
    });

    socket.on("stockUpdate", (data) => {
      // Pass the update to the callback
      onStockUpdate(data.productId, data.quantity);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};

export default useStockUpdateSocket;

//useStockUpdateSocket((updatedProductId, newQuantity) => {
//setProducts((prevProducts) =>
// prevProducts.map((product) =>
// product._id === updatedProductId
///  ? { ...product, quantity: newQuantity } // 🟢 Update matched product
//  : product // 🔵 Keep others as is
// )
//);
//});
