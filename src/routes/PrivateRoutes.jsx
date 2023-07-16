import { Route, Routes, Navigate } from "react-router-dom";
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
import LocalOrders from "pages/local-order";
import AllMessages from "pages/message-center/AllMessages";
import Message from "pages/message-center/Message";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MiniDrawer />}>
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="messages" element={<AllMessages />} />
        <Route path="messages/:id" element={<MessageCenter />} />
        <Route path="messages/:id/:ids" element={<Message />} />
        <Route path="orders" element={<Orders />} />
        <Route path="global-vendors" element={<Vendor />} />
        <Route path="vendors" element={<Vendors />} />
        <Route path="local-orders" element={<LocalOrders />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/:id" element={<SingleCategory />} />
        <Route path="account" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
