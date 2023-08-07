import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import DrawerPovider from "./context/DrawerContext.tsx";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <DrawerPovider>
        <App />
      </DrawerPovider>
    </ThemeProvider>
  </Provider>
);
