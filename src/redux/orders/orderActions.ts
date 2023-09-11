import { createAsyncThunk } from "@reduxjs/toolkit";
import { setOrders, setLoading, setError, clearError } from "./orderSlice";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const response = await fetch("http://localhost:8080/api/orders");
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

export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (id: string, { dispatch }) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const response = await fetch(`http://localhost:8080/api/order/${id}`);
      const data = await response.json();
      dispatch(setOrders(data));
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(
        setError({
          message: error.message,
          status: error.status,
          origin: "fetchOrderById",
        })
      );
      dispatch(setLoading(false));
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id: string, { dispatch }) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      await fetch(`http://localhost:8080/api/order/${id}`, {
        method: "DELETE",
      });
      dispatch(fetchOrders());
    } catch (error: any) {
      dispatch(
        setError({
          message: error.message,
          status: error.status,
          origin: "deleteOrder",
        })
      );
      dispatch(setLoading(false));
    }
  }
);
