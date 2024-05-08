import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import ErrorAndRedirect from "../pages/ErrorAndRedirect";
import ReportLink from "../pages/ReportLink";
import { Layout, ProtectedRoute, AntiProtectedRoute } from "./Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
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
          {
            path: "report",
            element: <ReportLink />,
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
      {
        path: "/*",
        element: <ErrorAndRedirect />,
      },
    ],
  },
]);

export default router;
