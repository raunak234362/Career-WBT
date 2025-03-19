/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Assessment } from "../../Assessment";
import { BASE_URL, IMG_URL } from "../../constants";

const StudentProfile = () => {
  const [formData, setFormData] = useState("");
  const [contests, setContests] = useState([]);
  const userId = localStorage.getItem("userId");
  const [attempt, setAttempt] = useState(false);
  const [contest, setContest] = useState({});
  const [result, setResult] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [questions, setQuestions] = useState();
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
        `${BASE_URL}/api/v1/user/`,
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
        `${BASE_URL}/api/v1/contest/all`,
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
        `${BASE_URL}/api/v1/contest/attempt/${contestId}`,
        requestOptions
      );
      const data = await response.json();
      if (data?.success) {
        setResult(data?.data?.result);
        setContest(data?.data?.contest);
        setQuestions(data?.data?.questions);
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

  const toggleEdit = () => {
    setIsEditing(!isEditing); // Toggle editing mode
  };

  if (attempt) {
    return (
      <div className="absolute top-0 left-0 z-50 w-screen h-screen bg-white ">
        <Assessment contest={contest} result={result} questions={questions} />
      </div>
    );
  } else {
    return (
      <div className="max-w-full p-8 mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex flex-row items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Profile</h1>
          {contests?.length > 0 && (
            <button
              onClick={() => handleAttempt(contests[0]._id)}
              className="px-6 py-2 text-white transition duration-300 bg-green-500 rounded-full hover:bg-green-700"
            >
              Attempt Test
            </button>
          )}
        </div>

        <div className="flex flex-col justify-between p-6 rounded-lg shadow-md md:flex-row bg-gray-50">
          <div className="flex flex-col w-full md:w-3/4">
            <div className="flex flex-wrap mb-4">
              <div className="w-full mb-4 md:w-1/2 md:mb-0">
                <h2 className="text-lg font-semibold text-gray-700">
                  Student Name
                </h2>
                <p className="text-gray-900">{formData?.name?.toUpperCase()}</p>
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-lg font-semibold text-gray-700">
                  Father Name
                </h2>
                <p className="text-gray-900">
                  {formData?.fatherName?.toUpperCase()}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap mb-4">
              <div className="w-full mb-4 md:w-1/2 md:mb-0">
                <h2 className="text-lg font-semibold text-gray-700">
                  Mother Name
                </h2>
                <p className="text-gray-900">
                  {formData?.motherName?.toUpperCase()}
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-lg font-semibold text-gray-700">
                  College ID
                </h2>
                <p className="text-gray-900">{formData?.studentId}</p>
              </div>
            </div>

            <div className="flex flex-wrap mb-4">
              <div className="w-full mb-4 md:w-1/2 md:mb-0">
                <h2 className="text-lg font-semibold text-gray-700">Email</h2>
                <p className="text-gray-900">
                  {formData?.email?.toLowerCase()}
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-lg font-semibold text-gray-700">
                  Contact Number
                </h2>
                <p className="text-gray-900">{formData?.phone}</p>
              </div>
            </div>

            <div className="flex flex-wrap mb-4">
              <div className="w-full mb-4 md:w-1/2 md:mb-0">
                <h2 className="text-lg font-semibold text-gray-700">
                  Permanent Address
                </h2>
                <p className="text-gray-900">
                  {formData?.permAddress?.streetLine1}{" "}
                  {formData?.permAddress?.streetLine2?.toUpperCase()}{" "}
                  {formData?.permAddress?.city?.toUpperCase()}
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-lg font-semibold text-gray-700">
                  Current Address
                </h2>
                <p className="text-gray-900">
                  {formData?.currAddress?.streetLine1}{" "}
                  {formData?.currAddress?.streetLine2?.toUpperCase()}{" "}
                  {formData?.currAddress?.city?.toUpperCase()}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap mb-4">
              <div className="w-full mb-4 md:w-1/2 md:mb-0">
                <h2 className="text-lg font-semibold text-gray-700">
                  Current Semester
                </h2>
                <p className="text-gray-900">{formData?.currentSemester}</p>
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-lg font-semibold text-gray-700">
                  Passing Year
                </h2>
                <p className="text-gray-900">{formData?.passingYear}</p>
              </div>
            </div>

            <div className="flex flex-wrap mb-4">
              <div className="w-full mb-4 md:w-1/2 md:mb-0">
                <h2 className="text-lg font-semibold text-gray-700">
                  Marks/CGPA
                </h2>
                <p className="text-gray-900">{formData?.cgpa}</p>
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-lg font-semibold text-gray-700">
                  Backlogs
                </h2>
                <p className="text-gray-900">{formData?.backlog}</p>
              </div>
            </div>
            <button
              onClick={toggleEdit}
              className="bg-green-500 rounded-lg px-5 py-2 w-[20%] text-white text-xl font-semibold"
            >
              Edit Profile
            </button>
            {isEditing && (
            <div className="p-8 mt-4 bg-white rounded-lg shadow-lg">
              <h2 className="mb-4 text-lg font-semibold text-gray-700">
                Edit Profile
              </h2>
              <form onSubmit={""}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block mb-2 font-semibold text-gray-700"
                  >
                    Student Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block mb-2 font-semibold text-gray-700"
                  >
                    Contact Number
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block mb-2 font-semibold text-gray-700"
                  >
                    Current Address
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                {/* Add more fields for Age, Date of Birth, Profile Image, Phone Number, Current Address */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={toggleEdit}
                    className="px-4 py-2 text-white transition duration-300 bg-red-300 rounded-lg hover:bg-red-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white transition duration-300 bg-green-500 rounded-lg hover:bg-green-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          )}
          </div>

          <div className="flex justify-center w-full mt-6 md:w-1/4 md:mt-0">
            <img
              src={`${IMG_URL}/${formData?.profilePic}`}
              alt="Profile Pic"
              className="object-cover h-auto border-2 border-white rounded-lg shadow-lg w-60"
            />
          </div>
        </div>
      </div>
    );
  }
};

export default StudentProfile;
