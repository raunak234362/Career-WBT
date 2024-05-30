/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Assessment } from "../../Assessment";

const StudentProfile = () => {
  const [formData, setFormData] = useState("");
  const [contests, setContests] = useState([]);
  const userId = localStorage.getItem("userId");
  const [attempt, setAttempt] = useState(false);
  const [contest, setContest] = useState({});
  const [result, setResult] = useState({});
  const navigate = useNavigate();

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
        `https://wbt-quizcave.onrender.com/api/v1/user/`,
        requestOptions
      );
      const data = await response.json();
      setFormData(data?.data);
      console.log(data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchContests = async () => {
    const myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('access')}`
    );
    myHeaders.append('Content-Type', 'application/json');
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(
        `https://wbt-quizcave.onrender.com/api/v1/contest/all`,
        requestOptions
      );
      const data = await response.json();
      setContests(data?.data);
      console.log(data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAttempt = async (contestId) => {
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
    };

    try {
      const response = await fetch(
        `https://wbt-quizcave.onrender.com/api/v1/contest/attempt/${contestId}`,
        requestOptions
      );
      const data = await response.json();
      if (data?.success) {
        setResult(data?.data?.result);
        setContest(data?.data?.contest);
        setAttempt(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!userId) {
      navigate("/"); // Redirect to login if no userId is found
    } else {
      fetchStudent();
      fetchContests();
      handleAttempt();
    }
  }, [userId, navigate]);

  if (attempt) {
    return (
      <div className="w-screen h-screen absolute top-0 left-0 z-50 bg-white ">
        <Assessment contest={contest} result={result} />
      </div>
    );
  } else {
    return (
      <div className="max-full mx-auto p-6 m-5 bg-white rounded-md shadow-md">
        <div className="flex flex-row justify-between">
          <h1 className="text-4xl flex font-bold mb-6 items-center justify-center text-center">
            Profile
          </h1>
          {contests.length > 0 && (
            <button
              onClick={() => handleAttempt(contests[0]._id)}
              className="mr-2 bg-green-500 text-white py-2 px-4 h-10 rounded-lg hover:bg-green-700"
            >
              Attempt Test
            </button>
          )}
        </div>

        <div className="flex flex-row justify-between mt-5 p-5 rounded-lg shadow-xl">
          <div className="flex flex-col">
            <div className="mb-4 flex flex-row items-center">
              <h2 className="text-xl font-semibold">Student Name</h2>
              <p className="text-gray-700 text-xl px-5">{formData?.name}</p>
            </div>
            <div className="mb-4 flex flex-row items-center">
              <h2 className="text-xl font-semibold">Father Name</h2>
              <p className="text-gray-700 text-xl px-5">{formData?.fatherName}</p>
            </div>
            <div className="mb-4 flex flex-row items-center">
              <h2 className="text-xl font-semibold">Mother Name</h2>
              <p className="text-gray-700 text-xl px-5">{formData?.motherName}</p>
            </div>
            <div className="mb-4 flex flex-row items-center">
              <h2 className="text-xl font-semibold">College ID</h2>
              <p className="text-gray-700 text-xl px-5">{formData?.studentId}</p>
            </div>
            <div className="mb-4 flex flex-row items-center">
              <h2 className="text-xl font-semibold">Email</h2>
              <p className="text-gray-700 text-xl px-5">{formData?.email}</p>
            </div>
            <div className="mb-4 flex flex-row items-center">
              <h2 className="text-xl font-semibold">Contact Number</h2>
              <p className="text-gray-700 text-xl px-5">{formData?.phone}</p>
            </div>
            <div className="mb-4 flex flex-row items-center">
              <h2 className="text-xl font-semibold">Permanent Address</h2>
              <p className="text-gray-700 text-xl px-5">
                {formData?.permAddress?.streetLine1}{" "}
                {formData?.permAddress?.streetLine2} {formData?.permAddress?.city}
              </p>
            </div>
            <div className="mb-4 flex flex-row items-center">
              <h2 className="text-xl font-semibold">Current Address</h2>
              <p className="text-gray-700 text-xl px-5">
                {formData?.currAddress?.streetLine1}{" "}
                {formData?.currAddress?.streetLine2} {formData?.currAddress?.city}
              </p>
            </div>
            <div className="mb-4 flex flex-row items-center">
              <h2 className="text-xl font-semibold">Final Semester</h2>
              <p className="text-gray-700 text-xl px-5">
                {formData?.currentSemester}
              </p>
            </div>
            <div className="mb-4 flex flex-row items-center">
              <h2 className="text-xl font-semibold">Marks/CGPA</h2>
              <p className="text-gray-700 text-xl px-5">{formData?.cgpa}</p>
            </div>
            <div className="mb-4 flex flex-row items-center">
              <h2 className="text-xl font-semibold">Backlogs</h2>
              <p className="text-gray-700 text-xl px-5">{formData?.backlog}</p>
            </div>
          </div>
          <div className="mb-6">
            <img
              src={`https://wbt-quizcave.onrender.com/${formData?.profilePic}`}
              alt="Profile Pic"
              className=" w-60 h-auto rounded-lg border-2 border-white shadow-lg shadow-black/50 object-cover"
            />
          </div>
        </div>
      </div>
    );
  }
};

export default StudentProfile;
