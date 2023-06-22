import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchCategory = createAsyncThunk("categories/fetch", async () => {
  const response = await fetch("http://localhost:3000/categories");
  const data = await response.json();
  return data;
});

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});
