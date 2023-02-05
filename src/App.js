import { Suspense } from "react";
import { Outlet } from "react-router-dom";
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
