import { createAsyncThunk } from "@reduxjs/toolkit";
import { setOrders, setLoading, setError, clearError } from "./orderSlice";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const response = await fetch("http://localhost:3000/orders");
      const data = await response.json();
      dispatch(setOrders(data));
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(
        setError({
          message: error.message,
          status: error.status,
          origin: "fetchOrders",
        })
      );
      dispatch(setLoading(false));
    }
  }
);
