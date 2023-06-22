import { configureStore } from "@reduxjs/toolkit";
import { orderSlice } from "./orderSlice";
import { productSlice } from "./productSlice";
import { categorySlice } from "./categorySlice";

export const store = configureStore({
  reducer: {
    // ...
    products: productSlice.reducer,
    orders: orderSlice.reducer,
    categories: categorySlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
