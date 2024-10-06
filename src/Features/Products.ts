import { createSlice } from "@reduxjs/toolkit";

const initialState: any[] = []; // Use 'any[]' for a more general initial state

export const productsSlice = createSlice({
  name: "products", // Typically lowercase for consistency
  initialState,
  reducers: {
    setProducts: (state, action) => {
      // Directly mutate the state
      return action.payload; // Simply return the new state
    },
  },
});

// Export the action creator
export const { setProducts } = productsSlice.actions;

// Export the reducer as default
export default productsSlice.reducer;
