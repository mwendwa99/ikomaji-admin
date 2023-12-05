import { useContext, useEffect } from "react";
import { DrawerContext } from "./context/DrawerContext";
import "./App.css";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useAuth0 } from "@auth0/auth0-react";

import InventoryPage from "./pages/InventoryPage";
import DashboardPage from "./pages/DashboardPage";
import CategoriesPage from "./pages/CategoriesPage";
import SupportPage from "./pages/SupportPage";
import DiscountsPage from "./pages/DiscountsPage";
import SignInPage from "./pages/SignInPage";

import Drawer from "./components/Drawer/Drawer";

function App() {
  const { selectedPage, handleSelectedPage } = useContext(DrawerContext);
  const { isLoading } = useAuth0();

  // add selected page to url
  useEffect(() => {
    window.history.replaceState({}, "", `/${selectedPage}`);
  }, [selectedPage]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  // if (!isAuthenticated) {
  //   return <SignInPage />;
  // }

  return (
    <Box sx={containerStyle}>
      <CssBaseline />
      <Drawer handleSelectedPage={handleSelectedPage}>
        <div style={{ position: "relative", zIndex: 1 }}>
          {selectedPage === "Orders" && <DashboardPage />}
          {selectedPage === "Inventory" && <InventoryPage />}
          {selectedPage === "Category" && <CategoriesPage />}
          {selectedPage === "Discounts" && <DiscountsPage />}
          {selectedPage === "Support" && <SupportPage />}
          {selectedPage === "Logout" && <SignInPage />}
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
