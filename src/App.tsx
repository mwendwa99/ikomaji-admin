import { useContext } from "react";
import { DrawerContext } from "./context/DrawerContext";
import "./App.css";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import InventoryPage from "./pages/InventoryPage";
import DashboardPage from "./pages/DashboardPage";
import CategoriesPage from "./pages/CategoriesPage";
import SupportPage from "./pages/SupportPage";

import Drawer from "./components/Drawer/Drawer";

function App() {
  const { selectedPage, handleSelectedPage } = useContext(DrawerContext);

  return (
    <Box sx={containerStyle}>
      <CssBaseline />
      <Drawer handleSelectedPage={handleSelectedPage}>
        <div style={{ position: "relative", zIndex: 1 }}>
          {selectedPage === "Dashboard" && <DashboardPage />}
          {selectedPage === "Inventory" && <InventoryPage />}
          {selectedPage === "Category" && <CategoriesPage />}
          {selectedPage === "Support" && <SupportPage />}
          {selectedPage === "NotFound" && <h1>Page Not Found</h1>}
        </div>
      </Drawer>
    </Box>
  );
}

export default App;

const containerStyle = {
  flex: 1,
  backgroundColor: "#fafafb",
  minHeight: "100vh",
  position: "relative",
  zIndex: 1,
};
