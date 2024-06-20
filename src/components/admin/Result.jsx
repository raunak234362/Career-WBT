/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";

const Result = () => {
  const [formData, setFormData] = useState([]);
  const [contestData, setContestData] = useState();
  const [selected, setSelected] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupRowIndex, setPopupRowIndex] = useState(-1);

  const fetchContestData = async () => {
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
    const response = await fetch(
      `${BASE_URL}/api/v1/admin/result/all`,
      requestOptions
    );
    const data = await response.json();
    console.log("Fetched data:", data);
    if (data?.data) {
      setContestData(data?.data);
      console.log(data?.data);
    }
  };
  const evaluateResults = async (id) => {
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
        `${BASE_URL}/api/v1/admin/result/${id}/declare`,
        requestOptions
      );
      const data = await response.json();
      if (data.success === true) {
        console.log("Result declared successfully");
      } else {
        console.error("Error in declaring result");
      }
    } catch {
      console.error("Error in fetching data");
    }
  };

  const fetchStudent = async (id) => {
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
        `${BASE_URL}/api/v1/admin/result/results/${id}`,
        requestOptions
      );
      const data = await response.json();
      setFormData(data?.data);
      console.log(data?.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const toggleStudentDetail = (index) => {
    setPopupRowIndex(index);
    setPopupVisible(!popupVisible);
  };

  useEffect(() => {
    fetchContestData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  return (
    <div>
      <div className="flex flex-row gap-8 w-full p-5 items-center">
        {contestData?.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-xl rounded-lg w-[35%] h-64 p-5"
          >
            <h1 className="text-2xl text-center font-semibold text-gray-800">
              Evaluate The Result of <br />
              <strong>{item?.name}</strong>
            </h1>
            <p className="text-lg text-center">
              Number of Unevaluated Result: <strong>{item?.unEvaluated}</strong>
            </p>
            <p className="text-lg text-center">
              Total Number of Student Participated:{" "}
              <strong>{item?.participants?.length}</strong>
            </p>
            <p className="text-lg text-center">
              Set:{" "}
              <strong>
                {item?.set === "A" ? "Technical" : "Non-Technical"}
              </strong>
            </p>
            {item?.unEvaluated > 0 && (
              <button
                onClick={(e) => {
                  e.preventDefault(0);
                  evaluateResults(item?._id);
                }}
                className="px-4 py-2 flex justify-center items-center mx-auto mt-5 bg-green-500 text-white rounded"
              >
                Evaluate
              </button>
            )}
            {item?.unEvaluated == 0 && item?.participants?.length > 0 && (
              <button
                onClick={(e) => {
                  e.preventDefault(0);
                  fetchStudent(item?._id);
                }}
                className="px-4 py-2 flex justify-center items-center mx-auto mt-5 bg-green-500 text-white rounded"
              >
                Display Result
              </button>
            )}
          </div>
        ))}
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
              {formData?.map((item, index) => (
                <tr key={index} className="bg-gray-100 hover:bg-gray-200">
                  <td className="px-1 py-3 border">{index + 1}</td>
                  <td
                    className="px-4 py-3 border"
                    onClick={() => toggleStudentDetail(index)}
                  >
                    {item?.userId?.studentId}
                  </td>

                  <td className="px-4 py-3 border">{item?.userId?.name}</td>
                  <td className="px-4 py-3 border">{item?.userId?.phone}</td>
                  <td className="px-4 py-3 border">{item?.totalMarks}</td>
                  <td className=" px-2 py-3 border">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selected?.includes(item?.userId?._id)}
                        className="sr-only peer"
                        onChange={(e) => {
                          // Prevent default behavior is not necessary here
                          if (e.target.checked) {
                            if (!selected?.includes(item?.userId?._id)) {
                              setSelected([...selected, item?.userId?._id]);
                            }
                          } else {
                            setSelected(
                              selected.filter((id) => id !== item?.userId?._id)
                            );
                          }
                        }}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      <span
                        className={`ms-3 text-lg font-medium ${
                          selected?.includes(item?.userId?._id)
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {selected?.includes(item?.userId?._id)
                          ? "Selected"
                          : "Not Selected"}
                      </span>
                    </label>
                  </td>
                  {popupRowIndex === index && (
                    <div
                      className={`popup-menu absolute overflow-y-auto inset-0 my-auto h-1/2 mx-auto right-52 w-[500px] bg-white rounded-lg shadow-lg p-2 ${
                        popupVisible ? "visible" : "hidden"
                      }`}
                    >
                      <div>Name: {item?.userId?.name}</div>
                      <div>Phone: {item?.userId?.phone}</div>
                      <div>Email: {item?.userId?.email}</div>
                      <div>User ID: {item?.userId?.userId}</div>
                    </div>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Result;
