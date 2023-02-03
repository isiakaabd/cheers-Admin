/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import {
  Registration,
  Login,
  VerifyEmail,
  ForgotPassword,
  ResetPassword,
} from "components";
import { Avatar, Grid } from "@mui/material";
import images from "assets/images";

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add("bg-white");
    return () => {
      document.body.classList.remove("bg-white");
    };
  }, []);

  return (
    <Grid
      item
      container
      // justifyContent={"center"}
      sx={{
        minHeight: "100vh",
        height: "100%",
        p: { lg: "3rem", md: "2.5rem", xs: "2rem" },
        pb: 8,
      }}
    >
      {/* sx={{ boxShadow: SHADOWS.light }} */}
      {/* begin::Content */}
      <Grid
        item
        container
        sx={{ p: 0 }}
        // justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Grid item sx={{ p: { md: "2rem", xs: "1rem" } }}>
          <Link to="/">
            <Avatar
              src={images.logo}
              sx={{
                borderRadius: "1rem",
                height: "6.5rem",
                width: "6.5rem",
                mb: { md: 3, xs: 2 },
              }}
            />
          </Link>
        </Grid>
        <Grid
          item
          sx={{
            boxShadow: 0,
            width: { lg: "50rem" },
            mx: "auto",
            p: { md: 5, xs: 3 },
          }}
        >
          <Outlet />
        </Grid>
      </Grid>
    </Grid>
  );
};

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="login" element={<Login />} />
      <Route path="registration" element={<Registration />} />
      <Route path="/verify" element={<VerifyEmail />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
);

export { AuthPage };
