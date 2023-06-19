import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import DefaultAppProvider from "./context/DefaultAppContext.jsx";
import DrawerPovider from "./context/DrawerContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <DefaultAppProvider>
    <DrawerPovider>
      <App />
    </DrawerPovider>
  </DefaultAppProvider>
);
