/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import PdfCreator from "./PdfCreator";

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
      `${import.meta.env.VITE_BASE_URL}/api/v1/admin/result/all`,
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
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/result/${id}/declare`,
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
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/result/results/${id}`,
        requestOptions
      );
      const data = await response.json();
      setFormData(data?.data);
      console.log(data?.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSave = async () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("access")}`
    );
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify({ resultList: selected }),
    };

    console.log(selected);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/result/send`,
        requestOptions
      );
      const data = await response.json();
      console.log(data);
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
      <div className="flex flex-row items-center w-full gap-8 p-5">
        {contestData?.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-xl rounded-lg w-[35%] h-64 p-5"
          >
            <h1 className="text-2xl font-semibold text-center text-gray-800">
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
                className="flex items-center justify-center px-4 py-2 mx-auto mt-5 text-white bg-green-500 rounded"
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
                className="flex items-center justify-center px-4 py-2 mx-auto mt-5 text-white bg-green-500 rounded"
              >
                Display Result
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="p-5 m-5 bg-white shadow-lg rounded-xl">
        <div className="flex flex-row justify-around ">
          <div className="flex w-full gap-2 p-5">
            <input
              type="text"
              placeholder="Search by Student ID"
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded"
            />
            <div>
              <button
                onClick={() => setCurrentPage(1)} // Reset to first page on search
                className="px-4 py-2 text-white bg-green-500 rounded"
              >
                Search
              </button>
            </div>
          </div>
          <button
            className="px-4 py-2 text-white bg-green-500 rounded"
            onClick={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            Save
          </button>
        </div>

        <div className="w-full p-5 overflow-y-auto rounded-lg h-fit max-h-80 table-container">
          <table className="w-full text-center border-collapse table-auto rounded-xl">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-1 py-2">S.No</th>
                <th className="px-6 py-2">Student ID</th>
                <th className="px-6 py-2">Name</th>
                <th className="px-2 py-2">Contact No.</th>
                <th className="px-2 py-2">Marks</th>
                <th className="px-1 py-2">Option</th>
                <th className="px-1 py-2">Answer Sheet</th>
              </tr>
            </thead>
            <tbody>
              {formData?.map((item, index) => (
                <tr key={index} className="bg-gray-100 hover:bg-gray-200">
                  <td className="px-1 py-3 border">{index + 1}</td>
                  <td
                    className="px-4 py-3 border cursor-pointer"
                    onClick={() => toggleStudentDetail(index)}
                  >
                    {item?.userId?.studentId}
                  </td>

                  <td className="px-4 py-3 border">{item?.userId?.name}</td>
                  <td className="px-4 py-3 border">{item?.userId?.phone}</td>
                  <td className="px-4 py-3 border">{item?.totalMarks}</td>
                  <td className="px-2 py-3 border ">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selected?.includes(item?._id)}
                        className="sr-only peer"
                        onChange={(e) => {
                          // Prevent default behavior is not necessary here
                          if (e.target.checked) {
                            if (!selected?.includes(item?._id)) {
                              setSelected([...selected, item?._id]);
                            }
                          } else {
                            setSelected(
                              selected.filter((id) => id !== item?._id)
                            );
                          }
                        }}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      <span
                        className={`ms-3 text-lg font-medium ${
                          selected?.includes(item?._id)
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {selected?.includes(item?._id)
                          ? "Selected"
                          : "Not Selected"}
                      </span>
                    </label>
                  </td>

                  <td className="px-4 py-3 border">
                    <button
                      onClick={() => {
                        const pdfRoot = ReactDOM.createRoot(
                          document.getElementById("pdf")
                        );
                        pdfRoot.render(
                          <PdfCreator
                            question={item?.answers}
                            username={item?.userId?.name}
                            marks={item?.totalMarks}
                          />
                        );
                      }}
                      className="px-4 py-2 text-white bg-green-500 rounded"
                    >
                      Download
                    </button>
                  </td>
                  {popupRowIndex === index && (
                    <div
                      className={`popup-menu absolute overflow-y-auto inset-0 my-auto h-2/3 mx-auto right-52 max-w-2xl bg-white shadow-black/50 rounded-lg shadow-lg p-2 ${
                        popupVisible ? "visible" : "hidden"
                      }`}
                    >
                      <div className="max-w-xl p-4 mx-auto my-auto bg-white rounded-lg shadow-md">
                        {/* <div className="flex justify-center w-full mt-6 md:w-1/4 md:mt-0">
                          <img
                            src={`${BASE_URL}/api/v1/admin/result/${item?.userId?.profilePic}`}
                            alt="Profile Pic"
                            className="object-cover h-auto border-2 border-white rounded-lg shadow-lg w-60"
                          />
                        </div> */}
                        <div className="mb-4">
                          <div className="mb-5 text-2xl font-bold underline">
                            Student Information
                          </div>
                          <div className="flex flex-col text-left">
                            <div className="mb-2">
                              <span className="font-semibold">Student ID:</span>{" "}
                              <span>{item?.userId?.userId}</span>
                            </div>
                            <div className="mb-2">
                              <span className="font-semibold">Name:</span>{" "}
                              <span>{item?.userId?.name}</span>
                            </div>
                            <div className="mb-2">
                              <span className="font-semibold">Phone:</span>{" "}
                              <span>{item?.userId?.phone}</span>
                            </div>
                            <div className="mb-2">
                              <span className="font-semibold">Email:</span>{" "}
                              <span>{item?.userId?.email}</span>
                            </div>
                            <div className="mb-2">
                              <span className="font-semibold">Gender:</span>{" "}
                              <span>{item?.userId?.gender}</span>
                            </div>
                            <div className="mb-2">
                              <span className="font-semibold">
                                Date of Birth:
                              </span>{" "}
                              <span>
                                {item?.userId?.dob
                                  ? formatDate(item.userId.dob)
                                  : "N/A"}
                              </span>
                            </div>
                            <div className="mb-2">
                              <span className="font-semibold">
                                Father Name:
                              </span>{" "}
                              <span>{item?.userId?.fatherName}</span>
                            </div>
                            <div className="mb-2">
                              <span className="font-semibold">
                                Mother Name:
                              </span>{" "}
                              <span>{item?.userId?.motherName}</span>
                            </div>
                            <div className="mb-2">
                              <span className="font-semibold">
                                Current Address:
                              </span>{" "}
                              <span className="text-gray-900">
                                {item?.userId?.currAddress?.streetLine1}{" "}
                                {item?.userId?.currAddress?.streetLine2?.toUpperCase()}{" "}
                                {item?.userId?.currAddress?.city?.toUpperCase()}
                              </span>
                            </div>
                            <div className="mb-2">
                              <span className="font-semibold">
                                College Name:
                              </span>{" "}
                              <span>{item?.userId?.college}</span>
                            </div>
                            <div className="mb-2">
                              <span className="font-semibold">Branch:</span>{" "}
                              <span>{item?.userId?.branch}</span>
                            </div>
                            <div className="mb-2">
                              <span className="font-semibold">Course:</span>{" "}
                              <span>{item?.userId?.course}</span>
                            </div>
                            <div className="mb-2">
                              <span className="font-semibold">CGPA:</span>{" "}
                              <span>{item?.userId?.cgpa}</span>
                            </div>
                            <div className="mb-2">
                              <span className="font-semibold">Resume:</span>{" "}
                              <a
                                target="_blank"
                                href={`${import.meta.env.VITE_IMG_URL}/${item?.userId?.resume}`}
                              >
                                Open Resume
                              </a>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleStudentDetail(index)}
                          className="px-4 py-2 text-white transition duration-200 bg-green-500 rounded-md hover:bg-green-700"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div id="pdf" className="flex flex-row flex-wrap justify-center"></div>
    </div>
  );
};

export default Result;
