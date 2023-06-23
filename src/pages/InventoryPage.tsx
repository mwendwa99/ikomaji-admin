import { useEffect } from "react";

import { Grid, Paper, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchProducts } from "../redux/productSlice";

import InventoryGrid from "../components/Table/InventoryGrid";

export default function InventoryPage() {
  const { products, loading } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid item sm={12}>
        <Typography variant="body1" sx={{ fontWeight: "bold", marginLeft: 1 }}>
          Inventory
        </Typography>
        <Paper elevation={0} sx={chartStyle}>
          <InventoryGrid products={products} loading={loading} />
        </Paper>
      </Grid>
    </Grid>
  );
}

const chartStyle = {
  m: 1,
  p: 1,
  border: "1px solid #E5E5E5",
};
