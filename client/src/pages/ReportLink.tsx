import React from "react";
import { toast } from "react-toastify";
import { reportUrl } from "../api";

function ReportLink() {
  const [reportedUrl, setReportedUrl] = React.useState(
    `${window.location.origin + "/"}`,
  );
  const [reason, setReason] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!reportedUrl || !reason) {
      toast.error("Please fill in all fields");
    }
    if (!reportedUrl.startsWith(window.location.origin)) {
      toast.error("Please enter a url that was shortened by this service.");
      return;
    }
    let url = reportedUrl;
    url = url.replace(window.location.origin + "/", "");
    reportUrl(url, reason)
      .then((res: any) => {
        toast.success(res.msg);
        setReportedUrl(`${window.location.origin + "/"}`);
        setReason("");
      })
      .catch((err: any) => {
        toast.error(err.msg);
      });
  };

  const handleReportedUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.startsWith(window.location.origin + "/")) {
      setReportedUrl(e.target.value);
    }
  };

  return (
    <>
      <div className="">
        <div className="flex flex-col max-w-md w-[80vw] mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Report a Url
          </h2>
          <p className="text-gray-500 dark:text-gray-300 mt-3">
            Report a url that violates the terms of service. We will review the
            url and take appropriate action in accordance with our terms of
            service within 72 hours.
          </p>
          <svg
            viewBox="0 0 24 24"
            className="text-red-500 w-full h-48 mt-4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="17" r="1" fill="currentColor" />
            <path
              d="M12 10L12 14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.44722 18.1056L10.2111 4.57771C10.9482 3.10361 13.0518 3.10362 13.7889 4.57771L20.5528 18.1056C21.2177 19.4354 20.2507 21 18.7639 21H5.23607C3.7493 21 2.78231 19.4354 3.44722 18.1056Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="mt-4">
          <form
            action="#"
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col space-y-1">
              <label htmlFor="url" className="text-gray-800 dark:text-white">
                Url
              </label>
              <input
                type="text"
                id="reported-url"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[30rem] max-w-[80vw]"
                placeholder={`${window.location.origin}/shortened-url`}
                value={reportedUrl}
                onChange={handleReportedUrlChange}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="reason" className="text-gray-800 dark:text-white">
                Reason
              </label>
              <textarea
                id="reason"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[30rem] max-w-[80vw]"
                placeholder="Reason for reporting the url"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                maxLength={300}
                minLength={10}
                required
                rows={5}
              ></textarea>
            </div>
            <button
              type="submit"
              className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Report
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ReportLink;
