import React from "react";
import { toast } from "react-toastify";
import { EditUrlProps } from "../types";

interface ExtendedEditUrlProps extends EditUrlProps {
  setIsEditing: React.Dispatch<React.SetStateAction<Boolean>>;
}

function ShowUrl({
  _id,
  editUrl,
  setEditUrl,
  loadDashboard,
  setIsEditing,
  urlData,
}: ExtendedEditUrlProps) {
  return (
    <>
      <div
        className={`${!editUrl && "hidden"} absolute top-0 left-0 w-screen h-screen flex items-center justify-center z-20`}
        style={{
          backdropFilter: editUrl ? "blur(8px)" : "none", // Apply blur effect conditionally
          backgroundColor: editUrl ? "rgba(0, 0, 0, 0.5)" : "transparent", // Add a semi-transparent background
        }}
      >
        <div
          id="crud-modal"
          tabIndex={-1}
          aria-hidden="true"
          className={`${!editUrl && "hidden"} overflow-y-auto overflow-x-hidden justify-center items-center md:inset-0 max-h-full`}
        >
          <div className="relative p-4 w-[95vw] max-w-xl max-h-full flex flex-col">
            <div className="bg-white rounded-lg shadow dark:bg-gray-700 min-h-[80vh]">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Show and Edit existing URL{_id}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="crud-modal"
                  onClick={() => setEditUrl((prev: Boolean) => !prev)}
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
              <div className="p-4 md:p-5 flex-grow min-h-[70vh] flex flex-col justify-between">
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
                      value={urlData.originalUrl}
                      disabled
                    />
                  </div>
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
                      className={`${!false ? "bg-gray-50 dark:bg-gray-600" : "bg-gray-200 dark:bg-gray-500 "} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-500 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:placeholder-gray-400`}
                      placeholder={"Enter short URL"}
                      value={urlData.shortUrl}
                      disabled
                    />
                  </div>
                  <div>
                    <p
                      
                    >
                      <span className="inline mb-2 mr-2 text-sm font-medium text-gray-900 dark:text-white">Clicks:</span>{urlData.clickCount}
                    </p>
                  </div>
                  <div className="col-span-4 sm:col-span-2">
                    <label
                      htmlFor="expirationDate"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Expiration Date
                    </label>
                    <p>
                      {urlData.hasExpirationDate ? (
                        <time>{`${new Date(urlData.expirationDate).toLocaleString()}`}</time>
                      ) : (
                        "Never"
                      )}
                    </p>
                  </div>

                  {urlData.password && (
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
                        className={`${true ? "bg-gray-50 dark:bg-gray-600" : "bg-gray-200 dark:bg-gray-500"} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                        value={urlData.password}
                        disabled
                      />
                    </div>
                  )}
                </div>
                <button
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-fit p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  <svg
                    className="w-[0.875rem] h-[0.875rem] mr-[0.25rem] my-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
                      fill="currentColor"
                    />
                  </svg>
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowUrl;
