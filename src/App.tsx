import { useContext, useMemo } from "react";

import { DefaultAppContext } from "./context/DefaultAppContext";
import { DrawerContext } from "./context/DrawerContext";
import "./App.css";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Card from "./components/Card/Card";
import Drawer from "./components/Drawer/Drawer";
import Chart from "./components/Chart/BarChart";
import GridChart from "./components/Chart/GridChart";
import DataGrid from "./components/Table/DataGrid";
import List from "./components/List/List";

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

interface Orders {
  id: number;
  orderNumber: string;
  productName: string;
  totalOrder: number;
  status: string;
  totalAmount: string;
}

interface AppData {
  dashboard: CardData[];
  transactions: Transactions[];
  income: Income[];
  orders: Orders[];
}

function Dashboard() {
  const appData = useContext<AppData>(DefaultAppContext);
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

function DashboardPage({
  appData,
  valueSum,
}: {
  appData: AppData;
  valueSum: number;
}) {
  // const appData = useContext<AppData>(DefaultAppContext);
  return (
    <Grid container>
      <Grid item sm={12}>
        <Typography variant="body1" sx={{ fontWeight: "bold", marginLeft: 1 }}>
          Dashboard
        </Typography>
        <Dashboard />
      </Grid>
      <Grid item sm={5} sx={{}}>
        <Typography variant="body1" sx={{ fontWeight: "bold", marginLeft: 1 }}>
          Income Overview
        </Typography>
        <Paper elevation={0} sx={chartStyle}>
          <Chart data={appData.income} valueSum={valueSum} />
        </Paper>
      </Grid>
      <Grid item sm={6}>
        <Typography variant="body1" sx={{ fontWeight: "bold", marginLeft: 1 }}>
          Analytics Report
        </Typography>
        <Paper elevation={0} sx={[chartStyle]}>
          <GridChart />
        </Paper>
      </Grid>
      <Grid item sm={8}>
        <Typography variant="body1" sx={{ fontWeight: "bold", marginLeft: 1 }}>
          Recent Orders
        </Typography>
        <Paper elevation={0} sx={chartStyle}>
          <DataGrid orders={appData.orders} />
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

function App() {
  const appData = useContext(DefaultAppContext);
  const { selectedPage, handleSelectedPage } = useContext(DrawerContext);

  const valueSum = useMemo(() => {
    return appData.dashboard.reduce((acc, item) => {
      return acc + item.value;
    }, 0);
  }, [appData.dashboard]);

  switch (selectedPage) {
    case "Dashboard":
      return (
        <div style={containerStyle}>
          <CssBaseline />
          <Drawer handleSelectedPage={handleSelectedPage}>
            <DashboardPage appData={appData} valueSum={valueSum} />
          </Drawer>
          <Box id="historyList"></Box>
        </div>
      );
    case "Inventory":
      return (
        <div style={containerStyle}>
          <CssBaseline />
          <Drawer handleSelectedPage={handleSelectedPage}>
            <h1>Inventory</h1>
          </Drawer>
        </div>
      );
    default:
      return (
        <div style={containerStyle}>
          <CssBaseline />
          <Drawer handleSelectedPage={handleSelectedPage}>
            <h1>Page Not Found</h1>
          </Drawer>
        </div>
      );
  }
}

export default App;

const containerStyle = {
  backgroundColor: "#fafafb",
  height: "100%",
};

const boxStyle = {
  display: "flex",
  flexDirection: "row",
};
const cardStyle = {
  m: 1,
};
const chartStyle = {
  m: 1,
  p: 1,
  border: "1px solid #E5E5E5",
};
