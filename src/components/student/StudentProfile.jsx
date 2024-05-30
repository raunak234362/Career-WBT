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
      <div className="max-w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
  <div className="flex flex-row justify-between items-center mb-6">
    <h1 className="text-4xl font-bold text-gray-800">Profile</h1>
    {contests.length > 0 && (
      <button
        onClick={() => handleAttempt(contests[0]._id)}
        className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-700 transition duration-300"
      >
        Attempt Test
      </button>
    )}
  </div>

  <div className="flex flex-col md:flex-row justify-between bg-gray-50 p-6 rounded-lg shadow-md">
    <div className="flex flex-col w-full md:w-3/4">
      <div className="flex flex-wrap mb-4">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <h2 className="text-lg font-semibold text-gray-700">Student Name</h2>
          <p className="text-gray-900">{formData?.name?.toUpperCase()}</p>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-lg font-semibold text-gray-700">Father Name</h2>
          <p className="text-gray-900">{formData?.fatherName}</p>
        </div>
      </div>

      <div className="flex flex-wrap mb-4">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <h2 className="text-lg font-semibold text-gray-700">Mother Name</h2>
          <p className="text-gray-900">{formData?.motherName}</p>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-lg font-semibold text-gray-700">College ID</h2>
          <p className="text-gray-900">{formData?.studentId}</p>
        </div>
      </div>

      <div className="flex flex-wrap mb-4">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <h2 className="text-lg font-semibold text-gray-700">Email</h2>
          <p className="text-gray-900">{formData?.email}</p>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-lg font-semibold text-gray-700">Contact Number</h2>
          <p className="text-gray-900">{formData?.phone}</p>
        </div>
      </div>

      <div className="flex flex-wrap mb-4">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <h2 className="text-lg font-semibold text-gray-700">Permanent Address</h2>
          <p className="text-gray-900">
            {formData?.permAddress?.streetLine1} {formData?.permAddress?.streetLine2} {formData?.permAddress?.city}
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-lg font-semibold text-gray-700">Current Address</h2>
          <p className="text-gray-900">
            {formData?.currAddress?.streetLine1} {formData?.currAddress?.streetLine2} {formData?.currAddress?.city}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap mb-4">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <h2 className="text-lg font-semibold text-gray-700">Current Semester</h2>
          <p className="text-gray-900">{formData?.currentSemester}</p>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-lg font-semibold text-gray-700">Passing Year</h2>
          <p className="text-gray-900">{formData?.passingYear}</p>
        </div>
      </div>

      <div className="flex flex-wrap mb-4">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <h2 className="text-lg font-semibold text-gray-700">Marks/CGPA</h2>
          <p className="text-gray-900">{formData?.cgpa}</p>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-lg font-semibold text-gray-700">Backlogs</h2>
          <p className="text-gray-900">{formData?.backlog}</p>
        </div>
      </div>
    </div>

    <div className="w-full md:w-1/4 flex justify-center mt-6 md:mt-0">
      <img
        src={`https://wbt-quizcave.onrender.com/${formData?.profilePic}`}
        alt="Profile Pic"
        className="w-60 h-auto rounded-lg border-2 border-white shadow-lg object-cover"
      />
    </div>
  </div>
</div>
    );
  }
};

export default StudentProfile;
