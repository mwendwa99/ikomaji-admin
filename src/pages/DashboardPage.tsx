import { useContext } from "react";

import { Grid, Paper, Typography, Box } from "@mui/material";

import { DefaultAppContext } from "../context/DefaultAppContext";

import GridChart from "../components/Chart/GridChart";
import BarChart from "../components/Chart/BarChart";
import DataGrid from "../components/Table/DataGrid";
import List from "../components/List/List";
import Card from "../components/Card/Card";

interface AppData {
  dashboard: CardData[];
  transactions: Transactions[];
  income: Income[];
  orders: object[];
}
interface CardData {
  id: number;
  title: string;
  value: number;
  percentage: string;
}
interface Transactions {
  orderNumber: string;
  time: string;
  revenue: number;
  percentage: number;
}

interface Income {
  category: string;
  value: number;
}

function Dashboard() {
  const appData = useContext(DefaultAppContext);

  return (
    <Box id="dashboard" sx={boxStyle}>
      <Grid container>
        {appData.dashboard.map((item, index) => (
          <Box key={index} id="card" sx={cardStyle}>
            <Grid item sm={3}>
              <Card
                title={item.title}
                value={item.value}
                percentage={item.percentage}
              />
            </Grid>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}

export default function DashboardPage({
  appData,
  valueSum,
  loading,
  orders,
}: {
  appData: AppData;
  valueSum: number;
  loading: boolean;
  orders: object[];
}) {
  return (
    <Grid container>
      <Grid item sm={12}>
        <Typography variant="body1" sx={{ fontWeight: "bold", marginLeft: 1 }}>
          Dashboard
        </Typography>
        <Dashboard />
      </Grid>
      <Grid item sm={5}>
        <Typography variant="body1" sx={{ fontWeight: "bold", marginLeft: 1 }}>
          Income Overview
        </Typography>
        <Paper elevation={0} sx={chartStyle}>
          <BarChart data={appData.income} valueSum={valueSum} />
        </Paper>
      </Grid>
      <Grid item sm={7}>
        <Typography variant="body1" sx={{ fontWeight: "bold", marginLeft: 1 }}>
          Analytics Report
        </Typography>
        <Paper elevation={0} sx={[chartStyle]}>
          <GridChart />
        </Paper>
      </Grid>
      <Grid item sm={9}>
        <Typography variant="body1" sx={{ fontWeight: "bold", marginLeft: 1 }}>
          Recent Orders ss
        </Typography>
        <Paper elevation={0} sx={chartStyle}>
          <DataGrid orders={orders} loading={loading} />
        </Paper>
      </Grid>
      <Grid item sm={3}>
        <Typography variant="body1" sx={{ fontWeight: "bold", marginLeft: 1 }}>
          Transaction History
        </Typography>
        <Paper elevation={0} sx={chartStyle}>
          <List transactions={appData.transactions} />
        </Paper>
      </Grid>
    </Grid>
  );
}

const boxStyle = {
  display: "flex",
  flexDirection: "row",
};

const chartStyle = {
  m: 1,
  p: 1,
  border: "1px solid #E5E5E5",
};
const cardStyle = {
  m: 1,
};
