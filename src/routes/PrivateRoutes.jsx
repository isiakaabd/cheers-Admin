import { lazy, FC, Suspense, ReactNode } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
// import { MasterLayout } from "../../_metronic/layout/MasterLayout";
// import TopBarProgress from "react-topbar-progress-indicator";
// import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import Inventories from "pages/inventory";
import CreateInventory from "pages/inventory/create";
import ShowInventories from "pages/inventory/show";
import EditInventory from "pages/inventory/edit";
import MasterLayout from "pages/MasterLayout";
// import { MenuTestPage } from "../pages/MenuTestPage";
// import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
// import Inventories from "../modules/errors/components/inventory";
// import CreateInventories from "../modules/errors/components/inventory/create";
// import EditInventories from "../modules/errors/components/inventory/edit";
// import ShowInventories from "../modules/errors/components/inventory/show";
// import Categories from "../modules/errors/components/inventory/categories";

const PrivateRoutes = () => {
  //   const BuilderPageWrapper = lazy(() =>
  //     import("../pages/layout-builder/BuilderPageWrapper")
  //   );
  //   const ProfilePage = lazy(() => import("../modules/profile/ProfilePage"));
  //   const WizardsPage = lazy(() => import("../modules/wizards/WizardsPage"));
  //   const AccountPage = lazy(() => import("../modules/accounts/AccountPage"));
  //   const WidgetsPage = lazy(() => import("../modules/widgets/WidgetsPage"));
  //   const ChatPage = lazy(() => import("../modules/apps/chat/ChatPage"));
  //   const UsersPage = lazy(() =>
  //     import("../modules/apps/user-management/UsersPage")
  //   );

  // useEffect(() => {
  //   actionFetchUserProfile()
  // }, [actionFetchUserProfile])

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        {/* Pages */}
        {/* <Route path="dashboard" element={<DashboardWrapper />} /> */}
        <Route path="inventories" element={<Inventories />} />
        <Route path="inventory/create" element={<CreateInventory />} />
        <Route path="inventories/:inventoryId" element={<ShowInventories />} />
        <Route
          path="inventories/:inventoryId/edit"
          element={<EditInventory />}
        />
        {/* <Route path="categories" element={<Categories />} />
        <Route path="builder" element={<BuilderPageWrapper />} />
        <Route path="menu-test" element={<MenuTestPage />} /> */}
        {/* Lazy Modules */}

        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

// const SuspensedView: FC<{ children?: ReactNode }> = ({ children }) => {
//   const baseColor = getCSSVariableValue("--bs-primary");
//   TopBarProgress.config({
//     barColors: {
//       0: baseColor,
//     },
//     barThickness: 1,
//     shadowBlur: 5,
//   });
//   return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
// };

export default PrivateRoutes;
