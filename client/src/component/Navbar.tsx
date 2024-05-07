import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import Logo from "../assets/lynk.png";
import WebpLogo from "../assets/lynk.webp";
import { NavLink } from "react-router-dom";

function Navbar() {
  const { name, profilePicture } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto h-20 p-4">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <picture>
            <source srcSet={WebpLogo} type="image/webp" />
            <source srcSet={Logo} type="image/png" />
            <img src={Logo} className="h-11" alt="Lynk Logo" />
          </picture>
        </NavLink>
        <div className="flex md:hidden">
          <DarkModeButton />
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark  dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${isOpen ? "absolute top-0 right-0 w-96 max-w-full" : "hidden"} md:static md:h-auto w-full md:block md:w-auto z-10`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-400 rounded-lg bg-gray-200 md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <div
              className={`${isOpen ? "" : "hidden"} md:hidden w-full flex justify-center h-10 `}
            >
              <svg
                className={`hover:rounded-full text-gray-900 dark:text-white dark:hover:bg-gray-700 hover:cursor-pointer`}
                onClick={() => setIsOpen(false)}
                width={30}
                height={30}
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.9393 12L6.9696 15.9697L8.03026 17.0304L12 13.0607L15.9697 17.0304L17.0304 15.9697L13.0607 12L17.0303 8.03039L15.9696 6.96973L12 10.9393L8.03038 6.96973L6.96972 8.03039L10.9393 12Z"
                />
              </svg>
            </div>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${isActive ? "dark:text-blue-500  text-blue-700" : "text-gray-900 dark:text-white"}`
                }
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            {name && (
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${isActive ? "dark:text-blue-500  text-blue-700" : "text-gray-900 dark:text-white"}`
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                to="/report"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${isActive ? "dark:text-blue-500  text-blue-700" : "text-gray-900 dark:text-white"}`
                }
              >
                Report Url
              </NavLink>
            </li>
            <li>
              <a
                href="https://github.com/Carbrex"
                target="_blank"
                className="flex gap-1 py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Github
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 mt-[0.1rem]"
                  viewBox="0 0 52 52"
                  enable-background="new 0 0 52 52"
                >
                  <g>
                    <path
                      d="M48.7,2H29.6C28.8,2,28,2.5,28,3.3v3C28,7.1,28.7,8,29.6,8h7.9c0.9,0,1.4,1,0.7,1.6l-17,17
		c-0.6,0.6-0.6,1.5,0,2.1l2.1,2.1c0.6,0.6,1.5,0.6,2.1,0l17-17c0.6-0.6,1.6-0.2,1.6,0.7v7.9c0,0.8,0.8,1.7,1.6,1.7h2.9
		c0.8,0,1.5-0.9,1.5-1.7v-19C50,2.5,49.5,2,48.7,2z"
                    />
                    <path
                      d="M36.3,25.5L32.9,29c-0.6,0.6-0.9,1.3-0.9,2.1v11.4c0,0.8-0.7,1.5-1.5,1.5h-21C8.7,44,8,43.3,8,42.5v-21
		C8,20.7,8.7,20,9.5,20H21c0.8,0,1.6-0.3,2.1-0.9l3.4-3.4c0.6-0.6,0.2-1.7-0.7-1.7H6c-2.2,0-4,1.8-4,4v28c0,2.2,1.8,4,4,4h28
		c2.2,0,4-1.8,4-4V26.2C38,25.3,36.9,24.9,36.3,25.5z"
                    />
                  </g>
                </svg>
              </a>
            </li>
            <li className="hidden md:block mt-[-0.45rem]">
              <DarkModeButton />
            </li>
            {!name && (
              <li>
                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${isActive ? "dark:text-blue-500  text-blue-700" : "text-gray-900 dark:text-white"}`
                  }
                >
                  Sign In
                </NavLink>
              </li>
            )}
            {name && (
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex gap-2 items-center py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent  md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent h-fit mt-[-0.25rem] ${isActive ? "dark:text-blue-500  text-blue-700" : "text-gray-900 dark:text-white"}`
                  }
                >
                  <img
                    className="rounded-full w-8 h-8"
                    src={
                      profilePicture ||
                      `https://ui-avatars.com/api/?name=${name}`
                    }
                    alt="image description"
                  />
                  <p className="">Profile</p>
                </NavLink>
              </li>
            )}
            {name && (
              <li>
                <button
                  className="w-full text-left py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-gray-900 dark:text-white"
                  onClick={() => dispatch({ type: "user/LOGOUT" })}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function DarkModeButton() {
  const dispatch = useAppDispatch();
  const { isDarkMode } = useAppSelector((state) => state.user);

  const setIsDarkMode = () => {
    dispatch({ type: "user/TOGGLE_DARK_MODE" });
  };

  return (
    <button
      id="theme-toggle"
      type="button"
      className="text-gray-900 rounded-lg hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent flex items-center justify-center p-2 w-10 h-10 "
      onClick={setIsDarkMode}
    >
      <svg
        id="theme-toggle-dark-icon"
        className={`${isDarkMode ? "opacity-0" : "opacity-100"} absolute w-5 h-5 transition-all duration-200`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
      </svg>
      <svg
        id="theme-toggle-light-icon"
        className={`${!isDarkMode ? "opacity-0" : "opacity-100"} absolute w-5 h-5 transition-all duration-200`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
}

export default Navbar;
