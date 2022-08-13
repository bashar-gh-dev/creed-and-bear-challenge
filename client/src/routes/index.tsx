import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "../components/shared/auth/require-auth";
import Loadable from "../components/shared/lazy-loader/Loadable";
import MainLayout from "../layout/layout";
import About from "../pages/about/about";
import UserDetailsPage from "../pages/user-details/user-details";
import UserEditPage from "../pages/user-edit/user-edit";

const Users = Loadable(lazy(() => import("../pages/users/users")));
const Login = Loadable(lazy(() => import("../pages/login/login")));

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          path="users/:userId/edit"
          element={
            <RequireAuth>
              <UserEditPage />
            </RequireAuth>
          }
        />
        <Route
          path="users/:userId"
          element={
            <RequireAuth>
              <UserDetailsPage />
            </RequireAuth>
          }
        />
        <Route
          path="users"
          element={
            <RequireAuth>
              <Users />
            </RequireAuth>
          }
        />
        <Route
          path="about"
          element={
            <RequireAuth>
              <About />
            </RequireAuth>
          }
        />
        <Route path="/" element={<Navigate to={"users"} />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Navigate to={"users"} />} />
    </Routes>
  );
};

export default Routers;
