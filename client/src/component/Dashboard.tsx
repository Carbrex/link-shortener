import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import ShortenUrl from "./ShortenUrl";
import EditUrl from "./EditUrl";
import { getDashboard } from "../api";

function Dashboard() {
  const [tableData, setTableData] = useState([
    {
      _id: "1",
      shortUrl: "abcdef",
      originalUrl: "https://www.google.com",
      clicks: 0,
      createdAt: "2021-09-25T12:00:00.000Z",
    },
    {
      _id: "2",
      shortUrl: "defghi",
      originalUrl: "https://www.facebook.com",
      clicks: 0,
      createdAt: "2021-09-25T12:00:00.000Z",
    },
    {
      _id: "3",
      shortUrl: "ghijkl",
      originalUrl: "https://www.twitter.com",
      clicks: 0,
      createdAt: "2021-09-25T12:00:00.000Z",
    },
  ]);
  const [showShortenUrl, setShowShortenUrl] = useState<Boolean>(false);
  const [editUrl, setEditUrl] = useState<Boolean>(false);
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    setLoading(true);
    getDashboard()
      .then((data) => {
        console.log(data);
        // setTableData(data.urls);
        // setLoading(false);
      })
      .catch((error): void => {
        if (error instanceof Error) {
          console.log(error.message);
        } else console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* url shortener dashboard */}

      <div className="flex flex-col-reverse gap-4 xs:flex-row pt-8 justify-between mb-4">
        <h1 className="text-2xl font-bold underline mb-5">Your URLs</h1>
        <button
          type="submit"
          onClick={() => setShowShortenUrl((prev: Boolean) => !prev)}
          className="sm:mr-4 h-fit w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-4"
        >
          Shorten a url
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12H20M12 4V20"
              stroke="rgb(255 255 255)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Short URL
              </th>
              <th scope="col" className="px-6 py-3 hidden sm:table-cell">
                Original URL
              </th>
              <th scope="col" className="px-6 py-3 hidden xs:table-cell">
                Clicks
              </th>
              <th scope="col" className="px-6 py-3 hidden lg:table-cell">
                Created At
              </th>
              <th scope="col" className="px-6 py-3 hidden md:table-cell">
                Expires
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data) => (
              <tr
                key={data._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-col"
                >
                  {data.shortUrl}
                  <a
                    href={`/${data.shortUrl}`}
                    className="text-xs text-gray-500 dark:text-gray-400"
                    target="_blank"
                  >
                    {`${window.location.hostname}/${data.shortUrl}`}
                  </a>
                </th>
                <td className="px-6 py-4 hidden sm:table-cell">
                  <a href={`${data.originalUrl}`} target="_blank">
                    {data.originalUrl.slice(0, 30)}
                    {data.originalUrl.length > 30 ? "..." : ""}
                  </a>
                </td>
                <td className="px-6 py-4 hidden xs:table-cell">
                  {data.clicks}
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <time>{`${new Date(data.createdAt).toLocaleString()}`}</time>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <time>{`${new Date(data.createdAt).toLocaleString()}`}</time>
                </td>
                <td className="px-6 py-4 hover:cursor-pointer">
                  <p
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => {
                      setEditUrl((prev: Boolean) => !prev);
                      setEditItemId(data._id);
                    }}
                  >
                    Edit
                  </p>
                </td>
              </tr>
            ))}
            {tableData.length === 0 && (
              <>
                <tr className="max-w-screen ">
                  <td className="hidden xs:table-cell"></td>
                  <td className="hidden lg:table-cell"></td>
                  <td className="pl-4">No data to show</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
      {editUrl && editItemId && (
        <EditUrl _id={editItemId} editUrl={editUrl} setEditUrl={setEditUrl} />
      )}
      {showShortenUrl && (
        <ShortenUrl
          showShortenUrl={showShortenUrl}
          setShowShortenUrl={setShowShortenUrl}
        />
      )}
      <div className="my-10 flex justify-center w-full">
        <Pagination />
      </div>
    </div>
  );
}

export default Dashboard;
