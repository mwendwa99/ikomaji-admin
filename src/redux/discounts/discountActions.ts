import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setLoading,
  clearError,
  setDiscounts,
  setError,
} from "./discountSlice";

export const fetchDiscount = createAsyncThunk(
  "discounts/fetchDiscounts",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const response = await fetch("http://localhost:8080/api/discounts/");
      const data = await response.json();
      dispatch(setDiscounts(data));
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(
        setError({
          message: error.message,
          code: error.code,
          origin: "fetchDiscounts",
        })
      );
      dispatch(setLoading(false));
    }
  }
);

export const addDiscount = createAsyncThunk(
  "discounts/addDiscount",
  async (discount, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const response = await fetch("http://localhost:8080/api/discounts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(discount),
      });
      const data = await response.json();
      dispatch(setDiscounts(data));
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(
        setError({
          message: error.message,
          code: error.code,
          origin: "addDiscount",
        })
      );
      dispatch(setLoading(false));
    }
  }
);

export const deleteDiscount = createAsyncThunk(
  "discounts/deleteDiscount",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const response = await fetch(
        `http://localhost:8080/api/discounts/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      dispatch(setDiscounts(data));
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(
        setError({
          message: error.message,
          code: error.code,
          origin: "deleteDiscount",
        })
      );
      dispatch(setLoading(false));
    }
  }
);

export const updateDiscount = createAsyncThunk(
  "discounts/updateDiscount",
  async (discount, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      const response = await fetch(
        `http://localhost:8080/api/discounts/${discount?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(discount),
        }
      );
      const data = await response.json();
      dispatch(setDiscounts(data));
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(
        setError({
          message: error.message,
          code: error.code,
          origin: "updateDiscount",
        })
      );
      dispatch(setLoading(false));
    }
  }
);
