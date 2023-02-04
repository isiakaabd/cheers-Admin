import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./App.css";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import AppRoutes from "routes/AppRoutes";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <AppRoutes />
      <ToastContainer
        style={{ fontSize: "1.8rem" }}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
