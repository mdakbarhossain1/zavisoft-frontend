import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/productsSlice";
import categoriesReducer from "./features/categoriesSlice";
import cartReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    cart: cartReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
