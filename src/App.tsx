import { useContext } from "react";

import { DefaultAppContext } from "./context/DefaultAppContext";
import "./App.css";

import Box from "@mui/material/Box";
import Card from "./components/Card/Card";

interface CardData {
  id: number;
  title: string;
  description: string;
  status: string;
}

interface AppData {
  dashboard: CardData[];
}

function Dashboard() {
  const appData = useContext<AppData>(DefaultAppContext);
  console.log(appData);
  return (
    <Box id="dashboard">
      {appData.dashboard.map((item, index) => (
        <Card key={index} title={item.title} description={item.description} />
      ))}
    </Box>
  );
}

function App() {
  return (
    <>
      <Dashboard />
      <Box id="historyList"></Box>
    </>
  );
}

export default App;
