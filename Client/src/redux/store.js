import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import userLocationReducer from "./slices/locationSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    userLocationReducer: userLocationReducer,
  },
});

export default store;
