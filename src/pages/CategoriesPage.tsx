import { Grid } from "@mui/material";

import CategoryGridComponent from "../components/Grid/CategoryGridComponent";

export default function DashboardPage() {
  return (
    <Grid container sx={{ flex: 1, height: "100%" }}>
      <Grid item sm={12}>
        <CategoryGridComponent />
      </Grid>
    </Grid>
  );
}
