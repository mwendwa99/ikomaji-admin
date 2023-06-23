import { Grid, Paper, Typography } from "@mui/material";

import InventoryGrid from "../components/Table/InventoryGrid";

export default function InventoryPage({
  products,
  loading,
}: {
  products: object[];
  loading: boolean;
}) {
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
