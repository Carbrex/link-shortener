import { useEffect, useState } from "react";
import { redirectUrl } from "../api";
import Loading from "../component/Loading";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function ErrorAndRedirect() {
  // check if the link is a short link get everything after origin
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [needPassword, setNeedPassword] = useState(false);
  const [password, setPassword] = useState("");

  const url = window.location.href;
  let shortUrl =
    url.split(window.location.origin)[1].charAt(0) === "/"
      ? url.split(window.location.origin)[1].slice(1).split("?")[0]
      : url.split(window.location.origin)[1].split("?")[0];

  useEffect(() => {
    // fetch the short url
    setLoading(true);
    let pass = password;
    if (!pass) {
      pass = getPassword();
    }
    redirectUrl(shortUrl, pass)
      .then((data: any) => {
        console.log(data);
        if (data.needPassword) {
          toast.error(data.msg,{toastId: "incorrect-password-redirect"});
          setLoading(false);
          setNeedPassword(true);
        } else if (data.originalUrl) window.location.href = data.originalUrl;
      })
      .catch((error) => {
        console.log(error.message);
        setIsError(true);
        setLoading(false);
      });
  }, [shortUrl]);

  const getPassword = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const newPassword = urlParams.get("password");
    if (newPassword) {
      setPassword(newPassword);
    }
    return newPassword || "";
  };

  useEffect(() => {
    getPassword();
  }, []);

  if (loading) return <Loading />;
  if (needPassword)
    return (
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          This link is password protected
        </h2>
        <div className="mt-4 flex flex-col">
          <label
            htmlFor="current-password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Current password
          </label>
          <input
            type="text"
            id="current-password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[30rem] max-w-[80vw]"
            placeholder="Enter current password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <a
            href={`/${shortUrl}?password=${password}`}
            className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 w-fit"
          >
            Take me to the link
          </a>
        </div>
        <p className="my-4 text-gray-500 dark:text-gray-400">
          Pro tip: You can append the password to the url like this to avoid the
          prompt
          <br />
          <a
            href={`/${shortUrl}?password=${password ? password : "password"}`}
            className="text-blue-500 dark:text-blue-400 hover:underline"
          >
            {`${window.location.origin}/${shortUrl}?password=${password ? password : "password"}`}
          </a>
        </p>
        <button
          className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
          onClick={() => window.history.back()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:rotate-180"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>

          <span>Go back</span>
        </button>
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center">
        {/* {shortUrl} */}
        <section className="bg-white dark:bg-gray-900 ">
          <div className="container px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
            <div className="wf-ull lg:w-1/2">
              <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
                404 error
              </p>
              <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
                Page not found
              </h1>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Sorry, the page you are looking for doesn't exist. Here are some
                helpful links:
              </p>

              <div className="flex items-center mt-6 gap-x-3">
                <button
                  className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
                  onClick={() => window.history.back()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 rtl:rotate-180"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                  </svg>

                  <span>Go back</span>
                </button>

                <Link
                  to={"/dashboard"}
                  className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
                >
                  Take me home
                </Link>
              </div>
            </div>

            <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
              <svg
                viewBox="0 0 514 164"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="101"
                  cy="22"
                  r="20"
                  stroke="#667085"
                  strokeWidth="2"
                />
                <circle
                  cx="101"
                  cy="142"
                  r="20"
                  stroke="#667085"
                  strokeWidth="2"
                />
                <circle
                  cx="21"
                  cy="102"
                  r="20"
                  stroke="#667085"
                  strokeWidth="2"
                />
                <circle
                  cx="141"
                  cy="102"
                  r="20"
                  stroke="#667085"
                  strokeWidth="2"
                />
                <circle
                  cx="193"
                  cy="82"
                  r="20"
                  stroke="#667085"
                  strokeWidth="2"
                />
                <circle
                  cx="313"
                  cy="82"
                  r="20"
                  stroke="#667085"
                  strokeWidth="2"
                />
                <circle
                  cx="253"
                  cy="22"
                  r="20"
                  stroke="#667085"
                  strokeWidth="2"
                />
                <circle
                  cx="253"
                  cy="142"
                  r="20"
                  stroke="#667085"
                  strokeWidth="2"
                />
                <path
                  d="M1 102C1 90.9543 9.9543 82 21 82H141C152.046 82 161 90.9543 161 102C161 113.046 152.046 122 141 122H21C9.9543 122 1 113.046 1 102Z"
                  stroke="#667085"
                  strokeWidth="2"
                />
                <path
                  d="M101 162C89.9543 162 81 153.046 81 142L81 22C81 10.9543 89.9543 2 101 2C112.046 2 121 10.9543 121 22L121 142C121 153.046 112.046 162 101 162Z"
                  stroke="#667085"
                  strokeWidth="2"
                />
                <path
                  d="M7.14214 115.995C-0.668351 108.184 -0.668351 95.5211 7.14214 87.7106L86.7107 8.1421C94.5212 0.331614 107.184 0.331607 114.995 8.14209C122.805 15.9526 122.805 28.6159 114.995 36.4264L35.4264 115.995C27.6159 123.805 14.9526 123.805 7.14214 115.995Z"
                  stroke="#667085"
                  strokeWidth="2"
                />
                <circle
                  cx="453"
                  cy="22"
                  r="20"
                  stroke="#667085"
                  strokeWidth="2"
                />
                <circle
                  cx="453"
                  cy="142"
                  r="20"
                  stroke="#667085"
                  strokeWidth="2"
                />
                <circle
                  cx="373"
                  cy="102"
                  r="20"
                  stroke="#667085"
                  strokeWidth="2"
                />
                <circle
                  cx="493"
                  cy="102"
                  r="20"
                  stroke="#667085"
                  strokeWidth="2"
                />
                <path
                  d="M353 102C353 90.9543 361.954 82 373 82H493C504.046 82 513 90.9543 513 102C513 113.046 504.046 122 493 122H373C361.954 122 353 113.046 353 102Z"
                  stroke="#667085"
                  strokeWidth="2"
                />
                <path
                  d="M453 162C441.954 162 433 153.046 433 142L433 22C433 10.9543 441.954 2 453 2C464.046 2 473 10.9543 473 22L473 142C473 153.046 464.046 162 453 162Z"
                  stroke="#667085"
                  strokeWidth="2"
                />
                <path
                  d="M359.142 115.995C351.332 108.184 351.332 95.5211 359.142 87.7106L438.711 8.1421C446.521 0.331614 459.184 0.331607 466.995 8.14209C474.805 15.9526 474.805 28.6159 466.995 36.4264L387.426 115.995C379.616 123.805 366.953 123.805 359.142 115.995Z"
                  stroke="#667085"
                  strokeWidth="2"
                />
                <circle
                  cx="253"
                  cy="82"
                  r="80"
                  stroke="#667085"
                  strokeWidth="2"
                />
                <circle
                  cx="253"
                  cy="82"
                  r="40"
                  stroke="#667085"
                  strokeWidth="2"
                />
                <line
                  x1="8.74228e-08"
                  y1="1"
                  x2="513"
                  y2="1.00004"
                  stroke="#667085"
                  strokeWidth="2"
                />
                <line
                  x1="-8.74228e-08"
                  y1="163"
                  x2="513"
                  y2="163"
                  stroke="#667085"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </section>
      </div>
    );
  return <h1>Redirecting...</h1>;
}

export default ErrorAndRedirect;
