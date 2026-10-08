/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

const DataTabel = (props: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // 👈 Change this as per need

  // 🔎 Filter rows based on search term
  const filteredData = props.sampleData.filter((row: any) =>
    Object.values(row).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 📄 Pagination calculations
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-5">
      {props.isClient ? (
        <h2 className="text-xl font-semibold mb-4 text-center">User Table - Client Side</h2>
      ) : (
        <h2 className="text-xl font-semibold mb-4 text-center">User Table - Server Side</h2>
      )}

      {/* Search Input */}
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset to page 1 on search
          }}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              {props.hearderPart.map((ele: any, idx: number) => (
                <th key={idx} className="px-4 py-2 border text-left">
                  {ele.headerName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((user: any, userIndex: number) => (
                <tr key={userIndex} className="hover:bg-gray-50">
                  {props.hearderPart.map((col: any, colIndex: number) => {
                    const cellValue = user[col.field];
                    return (
                      <td
                        key={colIndex}
                        className={`px-4 py-2 border font-medium ${
                          col.field === "status"
                            ? cellValue === "Active"
                              ? "text-green-600"
                              : cellValue === "Pending"
                              ? "text-yellow-600"
                              : "text-red-600"
                            : ""
                        }`}
                      >
                        {cellValue}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={props.hearderPart.length} className="px-4 py-4 text-center text-gray-500">
                  No matching results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📌 Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages || 1}
        </span>
        <div className="space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-100"
          >
            Prev
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTabel;
