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
