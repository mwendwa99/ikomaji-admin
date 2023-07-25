import { createAsyncThunk } from "@reduxjs/toolkit";
import { setProducts, setLoading, setError, clearError } from "./productSlice";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();
      dispatch(setProducts(data));
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(
        setError({
          message: error.message,
          status: error.status,
          origin: "fetchProducts",
        })
      );
      dispatch(setLoading(false));
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product, { dispatch }) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      dispatch(setProducts(data));
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(
        setError({
          message: error.message,
          status: error.status,
          origin: "addProduct",
        })
      );
      dispatch(setLoading(false));
    }
  }
);
