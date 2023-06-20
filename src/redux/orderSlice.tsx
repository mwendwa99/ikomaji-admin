import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface OrderState {
  orders: [];
  loading: boolean;
  error: string | null;
}

export const fetchOrders = createAsyncThunk("orders/fetch", async () => {
  const response = await fetch("http://localhost:8888/");
  const data = await response.json();
  return data;
});

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

// export const { getOrders } = orderSlice.actions;
export default orderSlice.reducer;
