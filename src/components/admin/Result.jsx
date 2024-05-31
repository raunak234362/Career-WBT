/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

const Result = () => {
  const [formData, setFormData] = useState([]);

  const fetchStudent = async () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("access")}`
    );
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://wbt-quizcave.onrender.com/api/v1/admin/result/results/",
        requestOptions
      );
      const data = await response.json();
      console.log("Fetched data:", data);
      if (data?.data) {
        setFormData(data?.data);
      } else {
        console.error("Data format error:", data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const sampleData = [
    // Add more sample data to demonstrate pagination
    { studentId: "S001", name: "Alice", phone: "1234567890", totalMarks: 95 },
    { studentId: "S002", name: "Bob", phone: "0987654321", totalMarks: 88 },
    { studentId: "S003", name: "Charlie", phone: "2345678901", totalMarks: 75 },
    { studentId: "S004", name: "David", phone: "3456789012", totalMarks: 82 },
    { studentId: "S005", name: "Eve", phone: "4567890123", totalMarks: 91 },
    { studentId: "S006", name: "Frank", phone: "5678901234", totalMarks: 67 },
    { studentId: "S007", name: "Grace", phone: "6789012345", totalMarks: 77 },
    { studentId: "S008", name: "Hannah", phone: "7890123456", totalMarks: 84 },
    { studentId: "S009", name: "Ian", phone: "8901234567", totalMarks: 92 },
    { studentId: "S010", name: "Jack", phone: "9012345678", totalMarks: 85 },
    { studentId: "S011", name: "Kate", phone: "0123456789", totalMarks: 74 },
    { studentId: "S012", name: "Leo", phone: "1234567801", totalMarks: 79 },
    { studentId: "S013", name: "Mia", phone: "2345678901", totalMarks: 87 },
    { studentId: "S014", name: "Nina", phone: "3456789012", totalMarks: 93 },
    { studentId: "S015", name: "Oscar", phone: "4567890123", totalMarks: 89 },
    { studentId: "S016", name: "Paul", phone: "5678901234", totalMarks: 80 },
    { studentId: "S017", name: "Quinn", phone: "6789012345", totalMarks: 68 },
    { studentId: "S018", name: "Rachel", phone: "7890123456", totalMarks: 81 },
    { studentId: "S019", name: "Sam", phone: "8901234567", totalMarks: 73 },
    { studentId: "S020", name: "Tina", phone: "9012345678", totalMarks: 90 },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Calculate the current rows to display
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sampleData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(sampleData.length / rowsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <div className="flex flex-row gap-8 w-full p-5">
        <div className="flex flex-col gap-3 w-1/4 bg-white shadow-lg p-5 rounded-xl py-20">
          <h1 className=" text-2xl text-gray-600 font-bold text-center">
            Total Students Present in Result
          </h1>
        </div>
      </div>

      <div className="bg-white shadow-lg p-5 rounded-xl m-5">
        <div className="flex gap-2 w-full p-5">
          <input
            type="text"
            placeholder="Search by Student ID"
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded"
          />
          <button
            onClick={() => setCurrentPage(1)} // Reset to first page on search
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Search
          </button>
        </div>
        <div className=" h-[550px] table-container overflow-y-auto w-full p-5 rounded-lg">
          <table className="w-full table-auto border-collapse text-center rounded-xl">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-1 py-2">S.No</th>
                <th className="px-6 py-2">Student ID</th>
                <th className="px-6 py-2">Name</th>
                <th className="px-2 py-2">Contact No.</th>
                <th className="px-2 py-2">Marks</th>
                <th className="px-1 py-2">Option</th>
              </tr>
            </thead>
            <tbody>
              {/* {formData.length > 0 ? (
              formData.map((item, index) => (
                <tr key={index} className="bg-gray-100 hover:bg-gray-200">
                  <td className="px-1 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{item?.studentId}</td>
                  <td className="px-4 py-2 border">{item?.name}</td>
                  <td className="px-4 py-2 border">{item?.course}</td>
                  <td className="px-4 py-2 border">{item?.phone}</td>
                  <td className="px-4 py-2 border">
                    <select className='w-full px-3 py-2 border border-gray-300 rounded-md'>
                      <option value=''>Select Result</option>
                      <option value='selected'>Selected</option>
                      <option value='notSelected'>Not-Selected</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-2 border">
                  No data available
                </td>
              </tr>
            )} */}
              {sampleData.map((item, index) => (
                <tr key={index} className="bg-gray-100 hover:bg-gray-200">
                  <td className="px-1 py-3 border">{index + 1}</td>
                  <td className="px-4 py-3 border">{item?.studentId}</td>
                  <td className="px-4 py-3 border">{item?.name}</td>
                  <td className="px-4 py-3 border">{item?.phone}</td>
                  <td className="px-4 py-3 border">{item?.totalMarks}</td>
                  <td className=" px-2 py-3 border">
                    <select className="px-1 py-3">
                      <option value="">Select Result</option>
                      <option value="selected">Selected</option>
                      <option value="notSelected">Not-Selected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <div className="flex justify-between mt-4 px-5">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Result;
