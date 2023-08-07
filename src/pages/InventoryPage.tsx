import { Grid } from "@mui/material";

import InventoryGridComponent from "../components/Grid/InventoryGridComponent";

export default function DashboardPage() {
  return (
    <Grid container sx={{ flex: 1, height: "100%" }}>
      <Grid item sm={12}>
        <InventoryGridComponent />
      </Grid>
    </Grid>
  );
}
