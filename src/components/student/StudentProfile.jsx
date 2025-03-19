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
      const response = await fetch(`${BASE_URL}/api/v1/user/`, requestOptions);
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
      <div className="max-w-full p-5 mx-auto bg-white border-gray-200 rounded-lg shadow-xl">
        {/* Profile Header */}
        <div className="flex w-full gap-5">
          {/*image*/}
          <div>
            <div className="p-5 pr-1 mb-6 bg-[#59da54f6] rounded-lg">
              <div className="flex items-center justify-end space-x-4">
                <img
                  src={`${IMG_URL}/${formData?.profilePic}`}
                  alt="Profile Pic"
                  className="object-cover w-48 h-48 border-4 border-white shadow-md rounded-2xl"
                />
                <h1 className="text-3xl font-semibold text-right">
                  {formData?.name?.toUpperCase()}
                </h1>
              </div>

              <div>
                {contests?.length > 0 && (
                  <button
                    onClick={() => handleAttempt(contests[0]._id)}
                    className="px-6 py-2 mt-4 text-white transition duration-300 bg-green-700 rounded-full md:mt-0 hover:bg-green-800"
                  >
                    Attempt Test
                  </button>
                )}
              </div>
            </div>
          </div>

          {/*profile details-cards*/}
          <div
            id="profile_details"
            className="w-full border-2 border-gray-300 rounded-lg"
          >
            <div className="p-4 max-w-1xl">
              <div className="flex flex-wrap gap-6 border-2 border-gray-400 rounded-lg">
                {/* Student Details Section */}
                <div id="student_details" className="flex-1 p-4 rounded-lg">
                  {/* Student Name */}
                  <div className="p-6 m-2 rounded-lg bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Student Name
                    </h2>
                    <p className="text-gray-900">
                      {formData?.name?.toUpperCase()}
                    </p>
                  </div>

                  {/* Email */}
                  <div className="p-6 m-2 rounded-lg bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Email
                    </h2>
                    <p className="text-gray-900">
                      {formData?.email?.toLowerCase()}
                    </p>
                  </div>

                  {/* Contact Number */}
                  <div className="p-6 m-2 rounded-lg bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Contact Number
                    </h2>
                    <p className="text-gray-900">{formData?.phone}</p>
                  </div>

                  {/* Father Name */}
                  <div className="p-6 m-2 rounded-lg bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Father Name
                    </h2>
                    <p className="text-gray-900">
                      {formData?.fatherName?.toUpperCase()}
                    </p>
                  </div>

                  {/* Mother Name */}
                  <div className="p-6 m-2 rounded-lg bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Mother Name
                    </h2>
                    <p className="text-gray-900">
                      {formData?.motherName?.toUpperCase()}
                    </p>
                  </div>

                  {/* Permanent Address */}
                  <div className="p-6 m-2 rounded-lg bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Permanent Address
                    </h2>
                    <p className="text-gray-900">
                      {formData?.permAddress?.streetLine1}{" "}
                      {formData?.permAddress?.streetLine2?.toUpperCase()}{" "}
                      {formData?.permAddress?.city?.toUpperCase()}
                    </p>
                  </div>

                  {/* Current Address */}
                  <div className="p-6 m-2 rounded-lg bg-gray-50">
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

                {/* College Details Section */}
                <div className="flex-1 p-4 rounded-lg">
                  {/* College ID */}
                  <div className="p-6 m-2 rounded-lg bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-700">
                      College ID
                    </h2>
                    <p className="text-gray-900">{formData?.studentId}</p>
                  </div>

                  {/* Current Semester */}
                  <div className="p-6 m-2 rounded-lg bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Current Semester
                    </h2>
                    <p className="text-gray-900">{formData?.currentSemester}</p>
                  </div>

                  {/* Passing Year */}
                  <div className="p-6 m-2 rounded-lg bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Passing Year
                    </h2>
                    <p className="text-gray-900">{formData?.passingYear}</p>
                  </div>

                  {/* Marks/CGPA */}
                  <div className="p-6 m-2 rounded-lg bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Marks/CGPA
                    </h2>
                    <p className="text-gray-900">{formData?.cgpa}</p>
                  </div>

                  {/* Backlogs */}
                  <div className="p-6 m-2 rounded-lg bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Backlogs
                    </h2>
                    <p className="text-gray-900">{formData?.backlog}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Edit Profile Button */}
        <div className="mt-6">
          <button
            onClick={toggleEdit}
            className="bg-green-500 rounded-lg px-5 py-2 w-[20%] text-white text-xl font-semibold transition duration-300 hover:bg-green-800"
          >
            Edit Profile
          </button>
        </div>

        {/* Edit Form (Conditional Rendering) */}
        {isEditing && (
          <div className="p-8 mt-6 bg-white border border-gray-200 rounded-lg shadow-xl">
            <h2 className="mb-4 text-xl font-bold text-gray-700">
              Edit Profile
            </h2>
            <form onSubmit={""}>
              <div className="mb-4 text-lg">
                <label
                  htmlFor="name"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Student Name
                </label>
                <input
                  type="text text-lg"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="mb-4 text-lg">
                <label
                  htmlFor="name"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Contact Number
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="mb-4 text-lg">
                <label
                  htmlFor="name"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Current Address
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={toggleEdit}
                  className="px-4 py-2 text-white w-[8%] text-lg font-bold transition duration-300 bg-red-500 rounded-lg hover:bg-red-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white w-[8%] text-lg font-bold transition duration-300 bg-green-500 rounded-lg hover:bg-green-9w-[8%] text-lg00"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
};

export default StudentProfile;
