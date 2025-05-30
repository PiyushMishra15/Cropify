// redux/cartSlice.js (using Redux Toolkit for simplicity)

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // array of cart items
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add product to cart
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item._id === product._id);

      if (existingItem) {
        // If item exists, increase qty and update currentPrice
        existingItem.qty += product.qty;
        existingItem.currentPrice =
          existingItem.qty * existingItem.pricePerUnit;
      } else {
        state.items.push(product);
      }
    },

    // Remove product from cart
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item._id !== id);
    },

    // Increase product quantity by 1
    increaseProductQty: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item._id === id);
      if (item) {
        item.qty += 1;
        item.currentPrice = item.qty * item.pricePerUnit;
      }
    },

    // Decrease product quantity by 1 (remove if qty <= 0)
    decreaseProductQty: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item._id === id);
      if (item) {
        item.qty -= 1;
        if (item.qty <= 0) {
          state.items = state.items.filter((item) => item._id !== id);
        } else {
          item.currentPrice = item.qty * item.pricePerUnit;
        }
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseProductQty,
  decreaseProductQty,
} = cartSlice.actions;

export default cartSlice.reducer;
