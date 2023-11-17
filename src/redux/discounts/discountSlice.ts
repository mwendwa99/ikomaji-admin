import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDiscounts,
  updateDiscount,
  deleteDiscount,
  addDiscount,
} from "./discountActions";

interface DiscountState {
  discounts: [];
  loading: boolean;
  error: {
    message: string;
    code: string;
    origin: string;
  };
}

const initialState: DiscountState = {
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
      .addCase(fetchDiscounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDiscounts.fulfilled, (state, action) => {
        state.discounts = action.payload as any;
        state.loading = false;
      })
      .addCase(fetchDiscounts.rejected, (state, action) => {
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
