import { color } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks";
import QRCode from "./QRCode";

function Home() {
  const { name } = useAppSelector((state) => state.user);
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-16 mx-auto text-center">
          <div className="max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
              {/* #1d84f9 #8fe121 */}
              <span
                style={{
                  background: "linear-gradient(to right, #1d84f9, #8fe121)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Lynk
              </span>{" "}
              - URL Shortener
            </h1>
            <p className="mt-6 text-gray-500 dark:text-gray-300">
              Lynk is a URL shortener that allows you to shorten any URL and
              share it with others. Lynk is fast, secure, and easy to use.
            </p>
            <div className="pt-6">
              {!name ? (
                <>
                  <Link
                    to={"/register"}
                    className="px-5 py-2 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg hover:bg-blue-500 lg:mx-0 lg:w-auto"
                  >
                    Signup
                  </Link>
                  <p className="mt-3 text-sm text-gray-400 ">
                    It's free and only takes a few seconds.
                  </p>
                </>
              ) : (
                <Link
                  to={"/dashboard"}
                  className="px-5 py-2 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg hover:bg-blue-500 lg:mx-0 lg:w-auto"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          <div className="w-full mt-10">
            <div className="mb-2 flex justify-between items-center">
              <label
                htmlFor="url-shortener"
                className="text-md font-medium text-gray-900 dark:text-white"
              >
                Shorten a long URL
              </label>
            </div>
            <div className="flex items-center">
              <button className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-blue-700 dark:bg-blue-600 border hover:bg-blue-800 dark:hover:bg-blue-700 rounded-s-lg border-blue-700 dark:border-blue-600 hover:border-blue-700 dark:hover:border-blue-700">
                Generate
              </button>
              <div className="relative w-full">
                <input
                  id="url-shortener"
                  type="text"
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-e-0 focus:outline-none border-gray-300 text-gray-500 dark:text-gray-400 text-sm border-s-0 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  placeholder="https://example.com"
                  // readonly
                  // disabled
                />
              </div>
              <button
                data-tooltip-target="tooltip-url-shortener"
                data-copy-to-clipboard-target="url-shortener"
                className="flex-shrink-0 z-10 inline-flex items-center py-3 px-4 text-sm font-medium text-center text-gray-500 dark:text-gray-400 hover:text-gray-900 bg-gray-100 border border-gray-300 rounded-e-lg hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600  dark:hover:text-white dark:border-gray-600"
                type="button"
              >
                <span id="default-icon">
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                  </svg>
                </span>
                <span
                  id="success-icon"
                  className="hidden inline-flex items-center"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                </span>
              </button>
              <div
                id="tooltip-url-shortener"
                role="tooltip"
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                <span id="default-tooltip-message">Copy link</span>
                <span id="success-tooltip-message" className="hidden">
                  Copied!
                </span>
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
            <p
              id="helper-text-explanation"
              className="mt-2 text-sm text-gray-500 dark:text-gray-400"
            >
              {/* Make sure that your URL is valid */}
            </p>
            <QRCode link="https://google.com"/>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
