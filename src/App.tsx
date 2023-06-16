import { useContext, useMemo } from "react";

import { DefaultAppContext } from "./context/DefaultAppContext";
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

interface CardData {
  id: number;
  title: string;
  value: number;
  percentage: string;
}

interface AppData {
  dashboard: CardData[];
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

function App() {
  const appData = useContext<AppData>(DefaultAppContext);

  const valueSum = useMemo(() => {
    return appData.dashboard.reduce((acc, item) => {
      return acc + item.value;
    }, 0);
  }, [appData.dashboard]);

  const data = [
    { category: "Monday", value: 10 },
    { category: "Tuesday", value: 20 },
    { category: "Wednesday", value: 15 },
    { category: "Thursday", value: 5 },
    { category: "Friday", value: 8 },
  ];
  return (
    <div style={containerStyle}>
      <CssBaseline />
      <Drawer>
        <Grid container>
          <Grid item sm={12}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", marginLeft: 1 }}
            >
              Dashboard
            </Typography>
            <Dashboard />
          </Grid>
          <Grid item sm={5} sx={{ ml: 1 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", marginLeft: 1 }}
            >
              Income Overview
            </Typography>
            <Paper elevation={0} sx={chartStyle}>
              <Chart data={data} valueSum={valueSum} />
            </Paper>
          </Grid>
          <Grid item sm={6}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", marginLeft: 1 }}
            >
              Analytics Report
            </Typography>
            <Paper elevation={0} sx={[chartStyle]}>
              <GridChart />
            </Paper>
          </Grid>
        </Grid>
      </Drawer>
      <Box id="historyList"></Box>
    </div>
  );
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
