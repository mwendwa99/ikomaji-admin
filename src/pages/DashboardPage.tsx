import { useAppSelector } from "../redux/hooks";

import { Grid, Box, Typography } from "@mui/material";

import OrderGridComponent from "../components/Grid/OrderGridComponent";

interface OrderProps {
  orders: [];
  loading: boolean;
  error: {
    message: string;
    code: string;
    origin: string;
  };
}

export default function DashboardPage() {
  const { error } = useAppSelector<OrderProps>((state) => state.orders);

  return (
    <Box>
      {error && (
        <Typography variant="body1" color="tomato">
          {error?.message}
        </Typography>
      )}
      <Grid container sx={{ flex: 1, height: "100%" }}>
        <Grid item sm={12}>
          <OrderGridComponent />
        </Grid>
      </Grid>
    </Box>
  );
}
