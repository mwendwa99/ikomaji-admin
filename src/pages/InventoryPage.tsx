import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addProduct } from "../redux/products/productActions";

import { Box, Grid, Button, Typography } from "@mui/material";

import InventoryGridComponent from "../components/Grid/InventoryGridComponent";

interface ProductProps {
  products: object[];
  loading: boolean;
  error: {
    message: string;
    code: string;
    origin: string;
  };
}

export default function InventoryPage() {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector<ProductProps>((state) => state.products);

  console.log("error", error);

  const handleAdd = () => {
    // Handle add logic here
    // dispatch(addProduct());
    // open modal
  };
  return (
    <Box>
      {error && (
        <Typography variant="body1" color="tomato">
          {error?.message}
        </Typography>
      )}
      <Grid container sx={{ flex: 1, height: "100%" }}>
        <Grid item sm={12} sx={{ my: 2 }}>
          <Button variant="contained">Add Product</Button>
        </Grid>
        <Grid item sm={12}>
          <InventoryGridComponent />
        </Grid>
      </Grid>
    </Box>
  );
}
