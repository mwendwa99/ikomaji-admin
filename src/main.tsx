import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { DefaultAppProvider } from "./context/DefaultAppContext.jsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <DefaultAppProvider>
    <App />
  </DefaultAppProvider>
);
