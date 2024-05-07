import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks";
import QRCodeComponent from "../component/QRCode";
import { shortenWithoutLogin } from "../api";
import { toast } from "react-toastify";

function Home() {
  const { name } = useAppSelector((state) => state.user);

  const [originalUrl, setOriginalUrl] = React.useState("");
  const [previousUrl, setPreviousUrl] = React.useState("");
  const [wasShortened, setWasShortened] = React.useState(false);
  const [shortenedUrl, setShortenedUrl] = React.useState("");

  const generateShortenedUrl = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (!originalUrl) {
      toast.error("Please enter a URL to shorten");
      return;
    }
    if (previousUrl === originalUrl) {
      return;
    }
    toast.promise(
      shortenWithoutLogin(originalUrl).then((res: any) => {
        setPreviousUrl(originalUrl);
        setShortenedUrl(`${window.location.origin}/${res.url.shortUrl}`);
        setWasShortened(true);
      }),
      {
        pending: "Shortening URL...",
        success: "URL shortened successfully",
      },
    );
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 pt-16 mx-auto text-center">
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
                    to={"/signup"}
                    className="px-5 py-2 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg hover:bg-blue-500 lg:mx-0 lg:w-auto"
                  >
                    Signup
                  </Link>
                  <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 ">
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

          <div className="w-full mt-10 bg-gray-200 dark:bg-gray-800 p-6 rounded-lg">
            <div className="mb-2 flex justify-between items-center">
              <label
                htmlFor="url-shortener"
                className="text-md font-medium text-gray-900 dark:text-white"
              >
                Shorten a long URL
              </label>
            </div>
            <div className="flex items-center">
              <button
                className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-blue-700 dark:bg-blue-600 border hover:bg-blue-800 dark:hover:bg-blue-700 rounded-s-lg border-blue-700 dark:border-blue-600 hover:border-blue-700 dark:hover:border-blue-700"
                onClick={generateShortenedUrl}
              >
                Generate
              </button>
              <div className="relative w-full">
                <input
                  id="url-shortener"
                  type="text"
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border rounded-r-lg focus:outline-none border-gray-300 text-gray-800 dark:text-gray-100 text-sm border-s-0 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  placeholder="https://example.com"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                />
              </div>
            </div>
            {wasShortened && (
              <>
                <div className="my-3">
                  <label
                    htmlFor="short-url"
                    className="text-sm text-left font-medium text-gray-900 dark:text-white mb-2 block"
                  >
                    Shortened URL:
                  </label>
                  <div className="relative mb-4">
                    <input
                      id="short-url"
                      type="text"
                      className="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={shortenedUrl}
                      disabled
                      readOnly
                    />
                    <button
                      data-copy-to-clipboard-target="shorten-url"
                      data-tooltip-target="tooltip-shorten-url"
                      className="absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center"
                      onClick={() => {
                        navigator.clipboard.writeText(shortenedUrl);
                        const tooltip = document.getElementById(
                          "default-icon-shorten-url",
                        );
                        const successIcon = document.getElementById(
                          "success-icon-shorten-url",
                        );
                        toast.success("Copied to clipboard");
                        tooltip?.classList.add("hidden");
                        successIcon?.classList.remove("hidden");
                        setTimeout(() => {
                          tooltip?.classList.remove("hidden");
                          successIcon?.classList.add("hidden");
                        }, 2000);
                      }}
                    >
                      <span id="default-icon-shorten-url">
                        <svg
                          className="w-3.5 h-3.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 18 20"
                        >
                          <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                        </svg>
                      </span>
                      <span
                        id="success-icon-shorten-url"
                        className="hidden inline-flex items-center"
                      >
                        <svg
                          className="w-3.5 h-3.5 text-blue-700 dark:text-blue-500"
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
                  </div>
                </div>
                <QRCodeComponent link={shortenedUrl} />
              </>
            )}
          </div>
          <h3 className="text-left text-xl font-semibold text-gray-800 dark:text-white lg:text-2xl mt-8">
            You can{" "}
            {name
              ? "go to the dashboard to view all your shortened URLs."
              : "signup to view all your shortened URLs."}
          </h3>
        </div>
      </section>
    </>
  );
}

export default Home;
