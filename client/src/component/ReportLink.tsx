import React from 'react'

function ReportLink() {
  return (
    <>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Report a Url</h2>
        <div className="mt-4">
          <form action="#" className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-1">
              <label htmlFor="url" className="text-gray-800 dark:text-white">Url</label>
              <input type="text" id="url" className="input" placeholder="https://example.com" />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="reason" className="text-gray-800 dark:text-white">Reason</label>
              <textarea id="reason" className="input" placeholder="Reason for reporting the url"></textarea>
            </div>
            <button className="btn">Report</button>
          </form>
        </div>
        
    </>
  )
}

export default ReportLink