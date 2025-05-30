import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  latitude: null,
  longitude: null,
};

const userLocationSlice = createSlice({
  name: "userLocation",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      const { latitude, longitude } = action.payload;
      state.latitude = latitude;
      state.longitude = longitude;
    },
    clearLocation: (state) => {
      state.latitude = null;
      state.longitude = null;
    },
  },
});

export const { setLocation, clearLocation } = userLocationSlice.actions;
export default userLocationSlice.reducer;
