import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ComponentProvider } from "./context/ComponentContext";
require("dotenv").config();

ReactDOM.render(
  <React.StrictMode>
    <ComponentProvider>
      <App />
    </ComponentProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
