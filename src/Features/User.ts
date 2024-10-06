import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
interface UserState {
  userInfo: null | {
    id: string;
    name: string;
    email: string;
  };
  isLoggedIn: boolean;
}

const initialState: UserState = {
  userInfo: null,
  isLoggedIn: false,
};

// Create a user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ id: string; name: string; email: string }>) => {
      state.userInfo = action.payload; // Set user information
      state.isLoggedIn = true; // Set login status
    },
    logout: (state) => {
      state.userInfo = null; // Clear user information
      state.isLoggedIn = false; // Set login status to false
    },
    updateUser: (state, action: PayloadAction<{ name?: string; email?: string }>) => {
      if (state.userInfo) {
        state.userInfo = {
          ...state.userInfo,
          ...action.payload, // Update user information
        };
      }
    },
  },
});

// Export actions and reducer
export const { login, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
