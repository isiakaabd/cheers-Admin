import { ThemeProvider } from "@emotion/react";
import { Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import { Grid } from "@mui/material";

function App() {
  return (
    <Grid item container>
      <Suspense>
        <Outlet />
      </Suspense>
    </Grid>
  );
}

export default App;
