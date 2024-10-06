import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../Features/Products";
import UserSlice from "../Features/User";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    user: UserSlice,
  },
});
