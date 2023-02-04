import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import App from "App";
// import { ErrorsPage } from "../modules/errors/ErrorsPage";

import { AuthPage } from "./AuthPage";
import { ThemeProvider } from "@emotion/react";
import { muiTheme } from "muiTheme";
import { useSelector } from "react-redux";

const AppRoutes = () => {
  const loginStatus = useSelector((state) => state.auth.token);
  //    useSelector((state) => state.auth.token);
  return (
    <ThemeProvider theme={muiTheme}>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route element={<App />}>
              {/* <Route path="error/*" element={<ErrorsPage />} /> */}
              {/* <Route path="logout" element={<Logout />} /> */}
              {loginStatus ? (
                <>
                  <Route path="/*" element={<PrivateRoutes />} />
                  <Route index element={<Navigate to="/dashboard" />} />
                </>
              ) : (
                <>
                  <Route path="auth/*" element={<AuthPage />} />
                  <Route path="*" element={<Navigate to="/auth" />} />
                </>
              )}
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AppRoutes;
