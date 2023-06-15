import { useContext } from "react";

import { DefaultAppContext } from "./context/DefaultAppContext";
import "./App.css";

import Box from "@mui/material/Box";
import Card from "./components/Card/Card";
import Drawer from "./components/Drawer/Drawer";

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
      {appData.dashboard.map((item, index) => (
        <Box id="card" sx={cardStyle}>
          <Card
            key={index}
            title={item.title}
            value={item.value}
            percentage={item.percentage}
          />
        </Box>
      ))}
    </Box>
  );
}

function App() {
  return (
    <>
      <Drawer>
        <Dashboard />
      </Drawer>
      <Box id="historyList"></Box>
    </>
  );
}

export default App;

const boxStyle = {
  display: "flex",
  flexDirection: "row",
};
const cardStyle = {
  m: 1,
  p: 1,
};
