import { useEffect } from "react";

import { Grid, Paper, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchProducts } from "../redux/products/productActions";

import InventoryGrid from "../components/Table/InventoryGrid";
import DataGrid from "../components/Table/DataTable";

export default function InventoryPage() {
  const { products, loading } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // console.log("products", products);

  const columns = [
    {
      field: "product_id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "product_name",
      headerName: "Product Name",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 100,
    },
    {
      field: "size",
      headerName: "Size",
      width: 100,
    },
    {
      field: "product_image",
      headerName: "Image",
      width: 100,
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
    },
  ];

  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid item sm={12}>
        <Typography variant="body1" sx={{ fontWeight: "bold", marginLeft: 1 }}>
          Inventory
        </Typography>
        <Paper elevation={0} sx={chartStyle}>
          {/* <InventoryGrid products={products} loading={loading} /> */}
          <DataGrid type="product" rows={products} columns={columns} />
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
