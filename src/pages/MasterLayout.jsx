// import { useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import { AsideDefault } from "./components/aside/AsideDefault";
// import { Footer } from "./components/Footer";
// import { HeaderWrapper } from "./components/header/HeaderWrapper";
// import { Toolbar } from "./components/toolbar/Toolbar";
// import { RightToolbar } from "../partials/layout/RightToolbar";
// import { ScrollTop } from "./components/ScrollTop";
// import { Content } from "./components/Content";
// // import { PageDataProvider } from "./core";
// import { useLocation } from "react-router-dom";
// import {
//   DrawerMessenger,
//   ActivityDrawer,
//   Main,
//   InviteUsers,
//   UpgradePlan,
// } from "../partials";
// import { MenuComponent } from "../assets/ts/components";
import MiniDrawer from "./Drawer";
import { Grid } from "@mui/material";

const MasterLayout = () => {
  // const location = useLocation();
  // useEffect(() => {
  //   setTimeout(() => {
  //     MenuComponent.reinitialization()
  //   }, 500)
  // }, [])

  // useEffect(() => {
  //   setTimeout(() => {
  //     MenuComponent.reinitialization()
  //   }, 500)
  // }, [location.key])

  return (
    <Grid item container className="page d-flex flex-row flex-column-fluid">
      <MiniDrawer />
    </Grid>
  );
};

export { MasterLayout };
