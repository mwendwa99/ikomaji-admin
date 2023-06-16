import { useContext } from "react";

import { DefaultAppContext } from "./context/DefaultAppContext";
import "./App.css";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Card from "./components/Card/Card";
import Drawer from "./components/Drawer/Drawer";
import Chart from "./components/Chart/BarChart";

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
  console.log(appData);
  return (
    <Box id="dashboard" sx={boxStyle}>
      <Grid container>
        {appData.dashboard.map((item, index) => (
          <Box id="card" sx={cardStyle}>
            <Grid item md={3}>
              <Card
                key={index}
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
  const data = [
    { category: "Category 1", value: 10 },
    { category: "Category 2", value: 20 },
    { category: "Category 3", value: 15 },
    { category: "Category 4", value: 5 },
    { category: "Category 5", value: 8 },
  ];
  return (
    <div style={containerStyle}>
      <Drawer>
        <Dashboard />
        <Chart data={data} />
      </Drawer>
      <Box id="historyList"></Box>
    </div>
  );
}

export default App;

const containerStyle = {
  backgroundColor: "#fafafb",
  height: "100vh",
};

const boxStyle = {
  display: "flex",
  flexDirection: "row",
};
const cardStyle = {
  m: 1,
};
