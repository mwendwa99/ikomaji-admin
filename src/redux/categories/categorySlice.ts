import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategory,
  deleteCategory,
  updateCategory,
  addCategory,
} from "./categoryActions";

interface CategoryState {
  categories: [];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.categories = action.payload as any;
        state.loading = false;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.error = action.payload as any;
        state.loading = false;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = action.payload as any;
        state.loading = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.payload as any;
        state.loading = false;
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories = action.payload as any;
        state.loading = false;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.error = action.payload as any;
        state.loading = false;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.categories = action.payload as any;
        state.loading = false;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error = action.payload as any;
        state.loading = false;
      });
  },
});

export const { setCategories, setLoading, setError, clearError } =
  categorySlice.actions;

export default categorySlice.reducer;
