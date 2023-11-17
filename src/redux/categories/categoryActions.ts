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
      const response = await fetch("http://localhost:8080/api/categories");
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

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id: string, { dispatch }) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      await fetch(`http://localhost:8080/api/categories/${id}`, {
        method: "DELETE",
      });
      dispatch(fetchCategory());
    } catch (error: any) {
      dispatch(
        setError({
          message: error.message,
          status: error.status,
          origin: "deleteCategory",
        })
      );
      dispatch(setLoading(false));
    }
  }
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (category: any, { dispatch }) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      await fetch(`http://localhost:8080/api/category/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });
      dispatch(fetchCategory());
    } catch (error: any) {
      dispatch(
        setError({
          message: error.message,
          status: error.status,
          origin: "addCategory",
        })
      );
      dispatch(setLoading(false));
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (category, { dispatch }) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      await fetch(`http://localhost:8080/api/category/update/${category.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });
      dispatch(fetchCategory());
    } catch (error: any) {
      dispatch(
        setError({
          message: error.message,
          status: error.status,
          origin: "updateCategory",
        })
      );
      dispatch(setLoading(false));
    }
  }
);
