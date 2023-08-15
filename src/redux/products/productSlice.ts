import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  addProduct,
  fetchProductById,
  deleteProduct,
} from "./productActions";

interface ProductState {
  products: [];
  loading: boolean;
  error: {
    message: string;
    code: string;
    origin: string;
  };
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: {
    message: "",
    code: "",
    origin: "",
  },
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
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
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload as any;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error as any;
        state.loading = false;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products = action.payload as any;
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.payload as any;
        state.loading = false;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.products = action.payload as any;
        state.loading = false;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.error = action.payload as any;
        state.loading = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = action.payload as any;
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload as any;
        state.loading = false;
      });
  },
});

export const { setProducts, setLoading, setError, clearError } =
  productSlice.actions;

export default productSlice.reducer;
