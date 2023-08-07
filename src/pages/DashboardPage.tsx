import { Grid } from "@mui/material";

import OrderGridComponent from "../components/Grid/OrderGridComponent";

export default function DashboardPage() {
  return (
    <Grid container sx={{ flex: 1, height: "100%" }}>
      <Grid item sm={12}>
        <OrderGridComponent />
      </Grid>
    </Grid>
  );
}
