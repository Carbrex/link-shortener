import { useEffect, useState } from "react";
import Pagination from "../component/Pagination";
import ShortenUrl from "../component/ShortenUrl";
import EditUrl from "../component/ShowAndEditUrl";
import { getDashboard } from "../api";
import Loading from "../component/Loading";
import { toast } from "react-toastify";
import { UrlData } from "../types";

function Dashboard() {
  const [tableData, setTableData] = useState<UrlData[]>([] as UrlData[]);
  const [showShortenUrl, setShowShortenUrl] = useState<Boolean>(false);
  const [editUrl, setEditUrl] = useState<Boolean>(false);
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const [maxValue, setMaxValue] = useState(0);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [firstLoad, setFirstLoad] = useState<Boolean>(true);
  const [showExpired, setShowExpired] = useState<Boolean>(false);

  const loadDashboard = async (showMessage: boolean = false): Promise<void> => {
    if (firstLoad) {
      setFirstLoad(false);
      setLoading(true);
    }
    try {
      const dataPromise = getDashboard(
        currentPage,
        perPage,
        sortField,
        sortOrder,
        showExpired,
      );
      if (showMessage) {
        toast.promise(dataPromise, {
          pending: "Loading Dashboard...",
          success: "Dashboard loaded successfully",
          error: "Error loading Dashboard",
        });
      }
      const data: any = await dataPromise;
      setTableData(data.links);
      setMaxValue(data.count);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else console.log(error);
      toast.error("Error loading Dashboard");
    } finally {
      setLoading(false);
    }
  };

  const getUrlData = (id: string) => {
    return tableData.find((data) => data._id === id);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [currentPage, perPage, sortField, sortOrder, showExpired]);

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
      <div>
        <label className="flex items-center gap-2 m-2">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={showExpired as boolean}
            onChange={() => {
              setShowExpired((prev: Boolean) => !prev);
              setCurrentPage(1);
            }}
          />
          <span>Show expired also</span>
        </label>
      </div>

      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3"
                onClick={() => handleSort("shortUrl")}
              >
                <p className="flex items-center gap-1">
                  Short URL
                  {sortField === "shortUrl" && (
                    <SortArrow sortOrder={sortOrder} />
                  )}
                </p>
              </th>
              <th
                scope="col"
                className="px-6 py-3 hidden sm:table-cell"
                onClick={() => handleSort("originalUrl")}
              >
                <p className="flex items-center gap-1">
                  Original URL
                  {sortField === "originalUrl" && (
                    <SortArrow sortOrder={sortOrder} />
                  )}
                </p>
              </th>
              <th
                scope="col"
                className="px-6 py-3 hidden xs:table-cell"
                onClick={() => handleSort("clickCount")}
              >
                <p className="flex items-center gap-1">
                  Clicks
                  {sortField === "clickCount" && (
                    <SortArrow sortOrder={sortOrder} />
                  )}
                </p>
              </th>
              <th
                scope="col"
                className="px-6 py-3 hidden lg:table-cell"
                onClick={() => handleSort("createdAt")}
              >
                <p className="flex items-center gap-1">
                  Created At
                  {sortField === "createdAt" && (
                    <SortArrow sortOrder={sortOrder} />
                  )}
                </p>
              </th>
              <th
                scope="col"
                className="px-6 py-3 hidden md:table-cell"
                onClick={() => handleSort("expirationDate")}
              >
                <p className="flex items-center gap-1">
                  Expires
                  {sortField === "expirationDate" && (
                    <SortArrow sortOrder={sortOrder} />
                  )}
                </p>
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>
                <tr className="h-5"></tr>
                <tr className="h-12">
                  <td></td>
                  <td></td>
                  <Loading />
                </tr>
              </>
            ) : (
              tableData.map((data) => (
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
                    {data.clickCount}
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <time>{`${new Date(data.createdAt).toLocaleString()}`}</time>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    {!data.hasExpirationDate ? (
                      "Never"
                    ) : (
                      <time>{`${new Date(data.expirationDate).toLocaleString()}`}</time>
                    )}
                  </td>
                  <td className="px-6 py-4 hover:cursor-pointer">
                    <p
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => {
                        setEditUrl((prev: Boolean) => !prev);
                        setEditItemId(data._id);
                      }}
                    >
                      Show
                    </p>
                  </td>
                </tr>
              ))
            )}
            {!loading && tableData.length === 0 && (
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
        <EditUrl
          _id={editItemId}
          editUrl={editUrl}
          setEditUrl={setEditUrl}
          loadDashboard={loadDashboard}
          urlData={getUrlData(editItemId) as UrlData}
        />
      )}
      {showShortenUrl && (
        <ShortenUrl
          showShortenUrl={showShortenUrl}
          setShowShortenUrl={setShowShortenUrl}
          loadDashboard={loadDashboard}
        />
      )}
      <div className="my-10 flex justify-center w-full">
        <Pagination
          maxValue={maxValue}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          perPage={perPage}
        />
      </div>
    </div>
  );
}

export default Dashboard;

const SortArrow = ({ sortOrder }: { sortOrder: string }) => {
  return (
    <svg
      className={`w-4 h-4 ${sortOrder === "asc" ? "" : "transform rotate-180"}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 15l7-7 7 7"
      ></path>
    </svg>
  );
};
