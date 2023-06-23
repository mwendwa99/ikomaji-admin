import { useContext, useMemo, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { fetchOrders } from "./redux/orderSlice";
import { fetchProducts } from "./redux/productSlice";

import { DefaultAppContext } from "./context/DefaultAppContext";
import { DrawerContext } from "./context/DrawerContext";
import "./App.css";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import InventoryPage from "./pages/InventoryPage";
import DashboardPage from "./pages/DashboardPage";

import Drawer from "./components/Drawer/Drawer";

function App() {
  const appData = useContext(DefaultAppContext);
  const { selectedPage, handleSelectedPage } = useContext(DrawerContext);
  const dispatch = useAppDispatch();
  const { orders, loading: orderIsLoading } = useAppSelector(
    (state) => state.orders
  );
  const { products, loading: productIsLoading } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts());
  }, [dispatch]);

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
            <DashboardPage
              appData={appData}
              loading={orderIsLoading}
              orders={orders}
              valueSum={valueSum}
            />
          </Drawer>
          <Box id="historyList"></Box>
        </div>
      );
    case "Inventory":
      return (
        <div style={containerStyle}>
          <CssBaseline />
          <Drawer handleSelectedPage={handleSelectedPage}>
            <InventoryPage products={products} loading={productIsLoading} />
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
