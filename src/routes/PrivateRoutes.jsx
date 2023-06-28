import { Route, Routes, Navigate } from "react-router-dom";
import Inventories from "pages/inventory";
import MiniDrawer from "pages/Drawer";
import Vendor from "pages/vendors";
import Vendors from "pages/vendor";
import Categories from "pages/categories";
import Dashboard from "pages/Dashboard";
import SingleCategory from "pages/categories/SingleCategory";
import Profile from "pages/profile";
import Users from "pages/users";
import MessageCenter from "pages/message-center";
import Orders from "pages/orders";

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
      <Route element={<MiniDrawer />}>
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="message-center" element={<MessageCenter />} />
        <Route path="orders" element={<Orders />} />
        <Route path="global-vendors" element={<Vendor />} />
        <Route path="vendors" element={<Vendors />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/:id" element={<SingleCategory />} />
        <Route path="account" element={<Profile />} />

        <Route index element={<Inventories />} />
        {/* <Route path="*" element={<Navigate to="/error/404" />} /> */}
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
