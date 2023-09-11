import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDiscount,
  updateDiscount,
  deleteDiscount,
  addDiscount,
} from "./discountActions";

const initialState = {
  discounts: [],
  loading: false,
  error: {
    message: "",
    code: "",
    origin: "",
  },
};

export const discountSlice = createSlice({
  name: "discounts",
  initialState,
  reducers: {
    setDiscounts: (state, action) => {
      state.discounts = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearError: (state) => {
      state.error = {
        message: "",
        code: "",
        origin: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscount.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDiscount.fulfilled, (state, action) => {
        state.discounts = action.payload as any;
        state.loading = false;
      })
      .addCase(fetchDiscount.rejected, (state, action) => {
        state.error = action.payload as any;
        state.loading = false;
      })
      .addCase(updateDiscount.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDiscount.fulfilled, (state, action) => {
        state.discounts = action.payload as any;
        state.loading = false;
      })
      .addCase(updateDiscount.rejected, (state, action) => {
        state.error = action.payload as any;
        state.loading = false;
      })
      .addCase(deleteDiscount.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDiscount.fulfilled, (state, action) => {
        state.discounts = action.payload as any;
        state.loading = false;
      })
      .addCase(deleteDiscount.rejected, (state, action) => {
        state.error = action.payload as any;
        state.loading = false;
      })
      .addCase(addDiscount.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDiscount.fulfilled, (state, action) => {
        state.discounts = action.payload as any;
        state.loading = false;
      })
      .addCase(addDiscount.rejected, (state, action) => {
        state.error = action.payload as any;
        state.loading = false;
      });
  },
});

export const { setDiscounts, setError, setLoading, clearError } =
  discountSlice.actions;

export default discountSlice.reducer;
