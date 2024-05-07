import React, { useEffect } from "react";

interface PaginationProps {
  maxValue: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  perPage?: number;
}

function Pagination({ maxValue, currentPage, setCurrentPage, perPage = 10 }: PaginationProps) {
  const totalPages = Math.ceil(maxValue / perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  // keep only 5 pages in view
  if (pages.length > 5) {
    if (currentPage < 3) {
      pages.splice(5);
    } else if (currentPage > totalPages - 2) {
      pages.splice(0, totalPages - 5);
    } else {
      pages.splice(0, currentPage - 3);
      pages.splice(5);
    }
  }

  const handlePrevious = () => {
    console.log(currentPage);
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }
  const handleNext = () => {
    console.log(currentPage);
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }
  
  const handlePage = (page: number) => {
    console.log(currentPage);
    setCurrentPage(page);
  }
  
  return (
    <>
      <div aria-label="Page navigation example" className="sm:hidden">
        <ul className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <button
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={handlePrevious}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>
          {pages.map((page, index) => (
            <li key={index}>
              <button
                onClick={() => handlePage(page)}
                className={`${page===currentPage?'bg-gray-200 dark:bg-gray-700':'bg-white dark:bg-gray-800'} flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
              >
                {page}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={handleNext}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
      <div aria-label="Page navigation example" className="hidden sm:block">
        <ul className="flex items-center -space-x-px h-10 text-base">
          <li>
            <button
              onClick={handlePrevious}
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>
          {pages.map((page, index) => (
            <li key={index}>
              <button
                onClick={() => handlePage(page)}
                className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === page ? "z-10 bg-gray-200 dark:bg-gray-700" : 'bg-white dark:bg-gray-800'
                }`}
              >
                {page}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={handleNext}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Pagination;
