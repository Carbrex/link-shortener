import { useEffect, useState } from "react";
import {
  Outlet,
  RouterProvider,
  ScrollRestoration,
  createBrowserRouter,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar";
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import Sidebar from "./component/Sidebar";
import Profile from "./component/Profile";
import Dashboard from "./component/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "./component/Router";
import { useAppDispatch, useAppSelector } from "./hooks";
import { getUserData } from "./store/userSlice";
import Loading from "./component/Loading";

function App() {
  const dispatch = useAppDispatch();
  const { isDarkMode, loadingUser } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  if (loadingUser) return <Loading />;

  return (
    <>
      <div className={isDarkMode ? "dark" : ""}>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          toastClassName="bg-white text-gray-800 dark:bg-gray-800 dark:text-white"
          theme={isDarkMode ? "dark" : "light"}
        />
        <RouterProvider router={router} />
        {/* <button onClick={() => toast.success("hi")}>toastify</button> */}
        {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
      </div>
    </>
  );
}

export default App;
