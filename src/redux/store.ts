import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./orders/orderSlice";
import productSlice from "./products/productSlice";
import categorySlice from "./categories/categorySlice";

export const store = configureStore({
  reducer: {
    // ...
    products: productSlice,
    orders: orderSlice,
    categories: categorySlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
