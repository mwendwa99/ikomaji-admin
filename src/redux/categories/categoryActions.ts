import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setCategories,
  setLoading,
  setError,
  clearError,
} from "./categorySlice";

export const fetchCategory = createAsyncThunk(
  "categories/fetchCategory",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const response = await fetch("http://localhost:3000/categories");
      const data = await response.json();
      dispatch(setCategories(data));
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(
        setError({
          message: error.message,
          status: error.status,
          origin: "fetchCategory",
        })
      );
      dispatch(setLoading(false));
    }
  }
);
