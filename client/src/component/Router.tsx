import { useEffect } from "react";
import {
  Outlet,
  RouterProvider,
  ScrollRestoration,
  createBrowserRouter,
  useLocation,
  Navigate,
} from "react-router-dom";
import Navbar from "./Navbar";
import { useAppSelector } from "../hooks";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";

const Layout = () => {
  const location = useLocation();
  const hideNavbarRoutes = [
    // "/signin",
    // "/signup",
    "/verify",
    "/forgot-password",
  ];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      <div className="min-h-section w-screen flex justify-center bg-white dark:bg-gray-900 dark:text-white">
        <Outlet />
      </div>
    </div>
  );
};

const ProtectedRoute = () => {
  const { token } = useAppSelector((state) => state.user);

  if (!token) return <Navigate to="/signin" />;
  return <Outlet />;
};

const AntiProtectedRoute = () => {
  const { token } = useAppSelector((state) => state.user);

  if (token) return <Navigate to="/dashboard" />;
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "/",
        element: <AntiProtectedRoute />,
        children: [
          {
            path: "signin",
            element: <Signin />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
        ],
      },
      // {
      //   path: "/*",
      //   element: <ErrorPage />,
      // },
    ],
  },
]);

export default router;
