import React from "react";
import { toast } from "react-toastify";
import { createShortUrl } from "../api";

interface ShortenUrlProps {
  showShortenUrl: Boolean;
  setShowShortenUrl: React.Dispatch<React.SetStateAction<Boolean>>;
  loadDashboard: () => void;
}

const initialState = {
  originalUrl: "",
  expirationDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
  hasExpirationDate: false,
  shortUrl: "",
  autoShorten: true,
  hasPassword: false,
  password: "",
};

function ShortenUrl({
  showShortenUrl,
  setShowShortenUrl,
  loadDashboard,
}: ShortenUrlProps) {
  const [shortenUrlData, setShortenUrlData] = React.useState(initialState);
  const [alreadyShortening, setAlreadyShortening] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (alreadyShortening) return;
    setAlreadyShortening(true);
    console.log(shortenUrlData);
    if (!shortenUrlData.autoShorten && !shortenUrlData.shortUrl) {
      toast.error("Please enter a short URL or disable auto-shorten");
      setAlreadyShortening(false);
      return;
    }
    if (shortenUrlData.hasPassword && !shortenUrlData.password) {
      toast.error("Please enter a password or disable password protection");
      setAlreadyShortening(false);
      return;
    }
    if (
      shortenUrlData.hasExpirationDate &&
      shortenUrlData.expirationDate < new Date()
    ) {
      toast.error("Please enter a valid future date for expiration");
      setAlreadyShortening(false);
      return;
    }
    try {
      await toast.promise(
        createShortUrl(shortenUrlData),
        {
          pending: "Creating short URL...",
          success: "Short URL created successfully",
        }
      );
      loadDashboard();
      setShortenUrlData(initialState);
      setShowShortenUrl(false);
    } catch (error) {
      console.log(error);
    } finally {
      setAlreadyShortening(false);
    }
  };

  return (
    <>
      <div
        className={`${!showShortenUrl && "hidden"} absolute top-0 left-0 w-screen h-screen flex items-center justify-center z-20`}
        style={{
          backdropFilter: showShortenUrl ? "blur(8px)" : "none", // Apply blur effect conditionally
          backgroundColor: showShortenUrl
            ? "rgba(0, 0, 0, 0.5)"
            : "transparent", // Add a semi-transparent background
        }}
      >
        <div
          id="crud-modal"
          tabIndex={-1}
          aria-hidden="true"
          className={`${!showShortenUrl && "hidden"} overflow-y-auto overflow-x-hidden justify-center items-center md:inset-0 max-h-full`}
        >
          <div className="relative p-4 w-[95vw] max-w-xl max-h-full flex flex-col">
            <div className="bg-white rounded-lg shadow dark:bg-gray-700 min-h-[80vh]">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create New Url
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="crud-modal"
                  onClick={() => setShowShortenUrl((prev: Boolean) => !prev)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form
                className="p-4 md:p-5 flex-grow min-h-[70vh] flex flex-col justify-between"
                onSubmit={handleSubmit}
              >
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Original URL
                    </label>
                    <input
                      type="text"
                      name="originalUrl"
                      id="originalUrl"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter original URL"
                      onChange={(e) => {
                        setShortenUrlData((prev) => ({
                          ...prev,
                          originalUrl: e.target.value,
                        }));
                      }}
                      value={shortenUrlData.originalUrl}
                      required={true}
                      minLength={5}
                      maxLength={500}
                    />
                  </div>
                  <div className="col-span-4 sm:col-span-2 flex items-center justify-around">
                    <label
                      htmlFor="autoShorten"
                      className="mt-auto text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Shorten Automatically
                    </label>
                    <input
                      type="checkbox"
                      name="autoShorten"
                      id="autoShorten"
                      className="h-4 w-4  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 mt-auto mb-1 ml-2 mr-auto dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      onChange={(e) => {
                        setShortenUrlData((prev) => ({
                          ...prev,
                          autoShorten: e.target.checked,
                        }));
                      }}
                      checked={shortenUrlData.autoShorten}
                    />
                  </div>
                  {!shortenUrlData.autoShorten && (
                    <div className="col-span-4 sm:col-span-2">
                      <label
                        htmlFor="shortUrl"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Short URL (5-10 characters only - letters and numbers
                        only)
                      </label>
                      <input
                        type="string"
                        name="shortUrl"
                        id="shortUrl"
                        className={`${!shortenUrlData.autoShorten ? "bg-gray-50 dark:bg-gray-600" : "bg-gray-200 dark:bg-gray-500 "} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-500 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:placeholder-gray-400`}
                        placeholder={
                          shortenUrlData.autoShorten
                            ? "Auto-generated"
                            : "Enter short URL"
                        }
                        onChange={(e) => {
                          setShortenUrlData((prev) => ({
                            ...prev,
                            shortUrl: e.target.value,
                          }));
                        }}
                        value={shortenUrlData.shortUrl}
                        disabled={shortenUrlData.autoShorten}
                        minLength={5}
                        maxLength={10}
                      />
                    </div>
                  )}
                  <div className="col-span-4 sm:col-span-2 flex items-center">
                    <label
                      htmlFor="hasExpirationDate"
                      className="text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Set Expiration Date
                    </label>
                    <input
                      type="checkbox"
                      name="hasExpirationDate"
                      id="hasExpirationDate"
                      className="h-4 w-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 m-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      onChange={(e) => {
                        setShortenUrlData((prev) => ({
                          ...prev,
                          hasExpirationDate: e.target.checked,
                        }));
                      }}
                      checked={shortenUrlData.hasExpirationDate}
                    />
                  </div>
                  {shortenUrlData.hasExpirationDate && (
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="expirationDate"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Expiration Date
                      </label>
                      <input
                        type="date"
                        name="expirationDate"
                        id="expirationDate"
                        className={`${shortenUrlData.hasExpirationDate ? "bg-gray-50 dark:bg-gray-600" : "bg-gray-200 dark:bg-gray-500"}  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                        onChange={(e) => {
                          setShortenUrlData((prev) => ({
                            ...prev,
                            expirationDate: new Date(e.target.value),
                          }));
                        }}
                        value={
                          shortenUrlData.expirationDate
                            .toISOString()
                            .split("T")[0]
                        }
                        disabled={!shortenUrlData.hasExpirationDate}
                        min={new Date().toISOString().split("T")[0]}
                        max={
                          new Date(
                            new Date().getTime() + 1000 * 60 * 60 * 24 * 365
                          )
                            .toISOString()
                            .split("T")[0]
                        }
                      />
                    </div>
                  )}

                  <div className="col-span-4 sm:col-span-2 flex items-center">
                    <label
                      htmlFor="hasPassword"
                      className="text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Set Password
                    </label>
                    <input
                      type="checkbox"
                      name="hasPassword"
                      id="hasPassword"
                      className="h-4 w-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 m-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      onChange={(e) => {
                        setShortenUrlData((prev) => ({
                          ...prev,
                          hasPassword: e.target.checked,
                        }));
                      }}
                      checked={shortenUrlData.hasPassword}
                    />
                  </div>

                  {shortenUrlData.hasPassword && (
                    <div className="col-span-4 sm:col-span-2">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="text"
                        name="password"
                        id="password"
                        className={`${shortenUrlData.hasPassword ? "bg-gray-50 dark:bg-gray-600" : "bg-gray-200 dark:bg-gray-500"} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                        onChange={(e) => {
                          setShortenUrlData((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }));
                        }}
                        value={shortenUrlData.password}
                        minLength={4}
                        maxLength={20}
                        disabled={!shortenUrlData.hasPassword}
                      />
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-fit p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Create Short URL
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShortenUrl;
