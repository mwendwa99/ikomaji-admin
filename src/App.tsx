import { useContext, useMemo } from "react";

import { DefaultAppContext } from "./context/DefaultAppContext";
import { DrawerContext } from "./context/DrawerContext";
import "./App.css";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import InventoryPage from "./pages/InventoryPage";
import DashboardPage from "./pages/DashboardPage";
import CategoriesPage from "./pages/CategoriesPage";

import Drawer from "./components/Drawer/Drawer";

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
            <InventoryPage />
          </Drawer>
        </div>
      );
    case "Category":
      return (
        <div style={containerStyle}>
          <CssBaseline />
          <Drawer handleSelectedPage={handleSelectedPage}>
            <CategoriesPage />
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
