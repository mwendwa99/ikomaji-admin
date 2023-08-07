import { useContext } from "react";

import { DrawerContext } from "./context/DrawerContext";
import "./App.css";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import InventoryPage from "./pages/InventoryPage";
import DashboardPage from "./pages/DashboardPage";
import CategoriesPage from "./pages/CategoriesPage";

import Drawer from "./components/Drawer/Drawer";

function App() {
  const { selectedPage, handleSelectedPage } = useContext(DrawerContext);

  switch (selectedPage) {
    case "Dashboard":
      return (
        <div style={containerStyle}>
          <CssBaseline />
          <Drawer handleSelectedPage={handleSelectedPage}>
            <DashboardPage />
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
  flex: 1,
  backgroundColor: "#fafafb",
  height: "100%",
};
