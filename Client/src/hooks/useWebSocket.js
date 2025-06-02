import { useEffect } from "react";
import io from "socket.io-client";

const useStockUpdateSocket = (onStockUpdate) => {
  useEffect(() => {
    const socket = io("http://localhost:3000", {
      transports: ["websocket"],
    });

    socket.on("stockUpdate", (data) => {
      onStockUpdate(data.productId, data.quantity);
    });

    // Optional: handle connection errors, reconnect, etc.

    return () => {
      socket.disconnect();
    };
  }, [onStockUpdate]); // Add onStockUpdate to dependencies
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
