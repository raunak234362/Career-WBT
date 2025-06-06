/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import Service from "../config/Service";
import { useForm } from "react-hook-form";
const RegisterStudent = () => {
  const [formData, setFormData] = useState({
    profilePic: "",
    resume: "",
    name: "",
    email: "",
    phone: "",
    altPhone: "",
    password: "",
    dob: "",
    studentId: "",
    gender: "",
    fatherName: "",
    motherName: "",
    currentSemester: "",
    marksheet: "",
    branch: "",
    course: "",
    college: "",
    cgpa: "",
    passingYear: "",
    backlog: "",
    permAddress: {
      streetLine1: "",
      streetLine2: "",
      city: "",
      state: "",
      country: "",
      zip: "",
    },
    currAddress: {
      streetLine1: "",
      streetLine2: "",
      city: "",
      state: "",
      country: "",
      zip: "",
    },
  });
const {
  register,
  setValue,
  handleSubmit,
  watch,
  formState: { errors },
} = useForm();

  const [isSameAddress, setIsSameAddress] = useState(false);
  const [profilePreview, setProfilePreview] = useState(null);
  const [resumeName, setResumeName] = useState("");
  const navigate = useNavigate();

  const courseSemesterMap = {
    "BE/BTECH": ["Semester-7", "Semester-8", "Passout"],
    BCA: ["Semester-5", "Semester-6", "Passout"],
    BBA: ["Semester-5", "Semester-6", "Passout"],
    BCOM: ["Semester-5", "Semester-6", "Passout"],
    MBA: ["Semester-3", "Semester-4", "Passout"],
    MTECH: ["Semester-3", "Semester-4", "Passout"],
    DIPLOMA: ["Semester-3", "Semester-4", "Passout"],
  };

  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    setFormData({ ...formData, course: selectedCourse, currentSemester: "" });
  };

  const handleSemesterChange = (e) => {
    setFormData({ ...formData, currentSemester: e.target.value });
  };

  const getSemesters = () => {
    const selectedCourse = formData.course;
    return courseSemesterMap[selectedCourse] || [];
  };

  const handleCheckboxChange = () => {
    setIsSameAddress(!isSameAddress);
    if (!isSameAddress) {
      setFormData((prevState) => ({
        ...prevState,
        currAddress: { ...prevState.permAddress },
      }));
    }
  };

  // const handleChange = (e, field) => {
  //   const value = e.target.value;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [field]: value,
  //   }));
  // };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (fileType === "profile") {
      setProfilePreview(URL.createObjectURL(file));
      setFormData((prevState) => ({
        ...prevState,
        profilePic: file,
      }));
    } else if (fileType === "marksheet") {
      setFormData((prevState) => ({
        ...prevState,
        marksheet: file,
      }));
    } else if (fileType === "resume") {
      setResumeName(file.name);
      setFormData((prevState) => ({
        ...prevState,
        resume: file,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("access")}`
    );

    const sem = formData?.currentSemester?.charAt(
      formData.currentSemester.length - 1
    );

    const form = new FormData();
    form.append("profile", formData.profilePic);
    form.append("resume", formData.resume);
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("altphone", formData.altPhone);
    form.append("password", formData.password);
    form.append("dob", formData.dob);
    form.append("studentId", formData.studentId);
    form.append("gender", formData.gender);
    form.append("fatherName", formData.fatherName);
    form.append("motherName", formData.motherName);
    form.append(
      "currentSemester",
      isNaN(Number.parseInt(sem)) ? 0 : Number.parseInt(sem)
    );
    form.append("marksheet", formData.marksheet);
    form.append("branch", formData.branch);
    form.append("course", formData.course);
    form.append("college", formData.college);
    form.append("cgpa", formData.cgpa);
    form.append("passingYear", formData.passingYear);
    form.append("backlog", formData.backlog);
    form.append("permAddress", JSON.stringify(formData.permAddress));
    form.append("currAddress", JSON.stringify(formData.currAddress));
    form.append("profile", formData.profilePic);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: form,
      redirect: "follow",
    };
    

    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/user/register`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("access", data?.data?.accessToken);
        localStorage.setItem("refresh", data?.data?.refreshToken);

        setFormData(data?.data);
        console.log(data?.data);
        navigate("/student/");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error(error);
    }

    const response = await Service.registerUser(formData);
    console.log("Response from registerUser:", response);
    
  };

  // const onSubmit = async (data) => {
  //   console.log("ooooooooooooooo:", data);

  // };

  const date = new Date();

  return (
    <div>
      <div className="flex flex-col border 2xl:mx-[20%] lg:mx-[10%] my-3 rounded-lg p-4 bg-white shadow-lg shadow-green-500/50 md:mx-[10%]">
        <div className="flex flex-col">
          <div
            className={`flex flex-row ${
              profilePreview !== null ? "justify-between" : "justify-center"
            } flex-wrap items-center mx-10 my-5`}
          >
            <img
              src={Logo}
              name="profile"
              className="w-[20%] items-center ml-2 mb-5 lg:w-[30%] xl:w-[30%] md:w-[30%] sm:w-[30%]"
              alt="Logo"
            />

            {profilePreview && (
              <div className="right-0 flex justify-end">
                <img
                  src={profilePreview}
                  alt="Profile Preview"
                  name="profile"
                  className="my-auto rounded-full w-28 h-28"
                />
              </div>
            )}
          </div>
          <div className="flex flex-row items-center justify-end mx-5">
            <h1 className="w-full font-bold text-center text-gray-800 2xl:items-center 2xl:text-2xl pl-28 lg:text-2xl lg:pl-14 md:text-xl md:pl-14 sm:text-xl">
              New Student Registration Form
            </h1>
            <h1 className="items-center px-1 py-1 font-bold text-center text-gray-800 rounded-md 2xl:text-md xl:text-md lg:text-sm md:text-md sm:text-xs bg-green-50 w-fit">
              {date.toLocaleDateString()}
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            id="studentDetails"
            className="flex-row p-5 m-4 rounded-lg bg-green-50"
          >
            <p className="font-bold text-green-800 2xl:text-xl xl:text-xl lg:text-xl md:text-lg sm:text-lg">
              Student Details
            </p>
            <div>
              <label htmlFor="Name" className="text-sm">
                Student Name
              </label>
              <div className="flex flex-row w-full gap-3 mt-2 2xl:text-md md:text-sm">
                <input
                  className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                  type="text"
                  value={formData?.name}
                  required
                  placeholder="Name"
                  id="name"
                  {...register("name", { required: true })} 
                />
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="email" className="text-sm">
                Personal Email
              </label>
              <input
                className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                type="email"
                value={formData?.email}
                required
                placeholder="Email"
                id="email"
                {...register("email", { required: true })}
              />
            </div>
            <div className="mt-3 text-sm">
              <label htmlFor="CollegeID">Student College ID</label>
              <input
                className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                type="text"
                value={formData?.studentId}
                required
                placeholder="Student ID"
                id="studentId"
                {...register("studentId", { required: true })}
              />
            </div>
            {/* Contacts */}
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-5">
              <div className="mt-3 w-full sm:w-[560px]">
                <label htmlFor="contact" className="text-sm">
                  Student Contact Number
                </label>
                <input
                  className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                  type="text"
                  value={formData?.phone}
                  required
                  placeholder="Contact Number"
                  id="phone"
                  {...register("phone", { required: true })}
                />
              </div>
              <div className="mt-3 w-full sm:w-[560px]">
                <label htmlFor="contact" className="text-sm">
                  Alternate Contact Number
                </label>
                <input
                  className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                  type="text"
                  value={formData?.altPhone}
                  placeholder="Alternative Contact Number"
                  id="altphone"
                  {...register("altPhone", { required: false })}
                />
              </div>
            </div>
            {/*gender, dob*/}
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-5">
              <div className="mt-3 w-full sm:w-[560px]">
                <label htmlFor="contact" className="text-sm">
                  Gender
                </label>
                <select
                  className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                  value={formData?.gender}
                  required
                  id="gender"
                  {...register("gender", {required:true})}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mt-3 w-full sm:w-[560px]">
                <label htmlFor="contact" className="text-sm">
                  Date of Birth
                </label>
                <input
                  className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                  type="date"
                  value={formData?.dob}
                  required
                  placeholder="dd-mm-yyyy"
                  id="dob"
                  {...register("dob", { required: true })}
                />
              </div>
            </div>

            <div className="relative mt-3 group">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
              <input
                className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500"
                type="password"
                value={formData?.password}
                required
                placeholder="Password"
                id="password"
                {...register("password", { required: true, minLength: 6 })}
              />
              {/* <span className="absolute left-0 p-2 text-xs text-white transition-opacity duration-300 rounded-lg opacity-0 group-hover:opacity-100">
              Minimum character should be 6
            </span> */}
            </div>
          </div>
          {/*personal information*/}
          <div className="flex flex-col p-5 m-4 rounded-lg bg-green-50">
            <p className="font-bold text-green-800 2xl:text-xl xl:text-xl lg:text-xl md:text-lg sm:text-lg">
              Personal Information
            </p>
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-5">
              <div className="mt-3 w-full sm:w-[560px]">
                <label htmlFor="contact" className="text-sm">
                  Father Name
                </label>
                <input
                  className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                  type="text"
                  value={formData?.fatherName}
                  required
                  placeholder="Father Name"
                  id="fatherName"
                 {...register("fatherName", { required: true })}
                />
              </div>
              <div className="mt-3 w-full sm:w-[560px]">
                <label htmlFor="contact" className="text-sm">
                  Mother Name
                </label>
                <input
                  className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                  type="text"
                  value={formData?.motherName}
                  required
                  placeholder="Mother Name"
                  id="motherName"
                  {...register("motherName", { required: true })}
                />
              </div>
            </div>
          </div>
          {/*college details*/}
          <div className="flex-row p-5 m-4 rounded-lg p- bg-green-50">
            <p className="font-bold text-green-800 2xl:text-xl xl:text-xl lg:text-xl md:text-lg sm:text-lg">
              College Details
            </p>
            <div className="mt-3">
              <label htmlFor="email" className="text-sm">
                College Name
              </label>
              <input
                className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                type="text"
                value={formData?.college}
                required
                placeholder="College Name"
                id="college"
                {...register("college", { required: true })}
              />
            </div>

            {/*cgpa,backlogs, year of passing*/}
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-5">
              <div className="mt-3 w-full sm:w-[375px]">
                <label htmlFor="course" className="text-sm">
                  Course
                </label>
                <select
                  className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                  value={formData.course}
                  required
                  id="course"
                 {...register("course", { required: true })}
                >
                  <option value="">Select Your Course</option>
                  <optgroup label="Technical">
                    <option value="DIPLOMA">Diploma</option>
                    <option value="BE/BTECH">B.E/B.Tech</option>
                    <option value="MTECH">M.Tech</option>
                    <option value="BCA">
                      Bachelor's of Computer Applications
                    </option>
                  </optgroup>
                  <optgroup label="Non-Technical">
                    <option value="MBA">
                      Master's of Business Administrations
                    </option>
                    <option value="BBA">
                      Bachelor's of Business Administrations
                    </option>
                    <option value="BCOM">Bachelor's of Commerce</option>
                  </optgroup>
                </select>
              </div>
              <div className="mt-3 w-full sm:w-[375px]">
                <label htmlFor="branch" className="text-sm">
                  Branch
                </label>
                <input
                  className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                  type="text"
                  value={formData?.branch}
                  placeholder="Branch"
                  id="branch"
                  {...register("branch", { required: true })}
                />
              </div>
              <div className="mt-3 w-full sm:w-[375px]">
                <label htmlFor="currentSemester" className="text-sm">
                  Select Semester
                </label>
                <select
                  className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                  value={formData.currentSemester}
                  required
                  id="currentSemester"
                  {...register("currentSemester", { required: true })}
                >
                  <option value="">Current Semester</option>
                  {getSemesters()?.map((semester) => (
                    <option key={semester} value={semester}>
                      {semester}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-6 sm:flex-row sm:gap-5">
              <div className="mt-3 w-full sm:w-[375px]">
                <label htmlFor="cgpa" className="text-sm">
                  CGPA
                </label>
                <input
                  className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={formData?.cgpa}
                  required
                  placeholder="CGPA"
                  id="cgpa"
                  {...register("cgpa", { required: true })}
                />
              </div>
              <div className="mt-3 w-full sm:w-[375px]">
                <label htmlFor="backlog" className="text-sm">
                  No. of Backlog
                </label>
                <input
                  className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                  type="number"
                  min="0"
                  value={formData?.backlog}
                  required
                  placeholder="No. of Backlog"
                  id="backlog"
                  {...register("backlog", { required: true })}
                />
              </div>
              <div className="mt-3 w-full sm:w-[375px]">
                <label htmlFor="passingYear" className="text-sm">
                  Year of Passing
                </label>
                <input
                  className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                  type="number"
                  min="2000"
                  max="2025"
                  value={formData?.passingYear}
                  required
                  placeholder="Passing Year"
                  id="passingYear"
                  {...register("passingYear", { required: true })}
                />
              </div>
            </div>

            {/*files*/}
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-5">
              <div className="mt-3 w-full sm:w-[375px]">
                <label htmlFor="marksheet" className="text-sm">
                  Upload Marksheet
                </label>
                <input
                  className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                  type="file"
                  id="marksheet"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={async (e) => {
                    handleFileChange(e, "marksheet");
                    await setFormData((prevState) => ({
                      ...prevState,
                      marksheet: e?.target?.files[0],
                    }));
                  }}
                />
              </div>
              <div className="mt-3 w-full sm:w-[375px]">
                <label htmlFor="profile" className="text-sm">
                  Upload Profile Image
                </label>
                <input
                  className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                  type="file"
                  id="profile"
                  required
                  accept="image/*"
                  onChange={async (e) => {
                    handleFileChange(e, "profile");
                    await setFormData((prevState) => ({
                      ...prevState,
                      profile: e?.target?.files[0],
                    }));
                  }}
                />
              </div>
              <div className="mt-3 w-full sm:w-[375px]">
                <label htmlFor="resume" className="text-sm">
                  Upload Resume
                </label>
                <input
                  className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                  type="file"
                  id="resume"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={async (e) => {
                    handleFileChange(e, "resume");
                    await setFormData((prevState) => ({
                      ...prevState,
                      resume: e?.target?.files[0],
                    }));
                  }}
                />
                {resumeName && (
                  <div className="mt-2">
                    <p>Resume: {resumeName}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/*address*/}
          <div className="flex-row p-5 m-4 rounded-lg bg-green-50">
            <div className="mt-3">
              <p className="text-2xl font-bold text-green-800"></p>
              <label htmlFor="permanentAddress" className="font-bold">Permanent Address</label>
              <input
                className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                type="text"
                value={formData?.permAddress?.streetLine1}
                required
                placeholder="Street Line 1"
                id="permanentStreetLine1"
                {...register("permAddress.streetLine1", { required: true })}
              />
              <input
                className="w-full px-4 py-3 mt-2 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                type="text"
                value={formData?.permAddress?.streetLine2}
                placeholder="Street Line 2"
                id="permanentStreetLine2"
                {...register("permAddress.streetLine2", { required: false })}
              />
              {/*address[4 fields]*/}
              <div className="flex gap-2">
                <input
                  className="w-full px-4 py-3 mt-2 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                  type="text"
                  value={formData?.permAddress?.city}
                  required
                  placeholder="City"
                  id="permanentCity"
                  {...register("permAddress.city", { required: true })}
                />
                <input
                  className="w-full px-4 py-3 mt-2 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                  type="text"
                  value={formData?.permAddress?.state}
                  required
                  placeholder="State"
                  id="permanentState"
                  {...register("permAddress.state", { required: true })}
                />
                <input
                  className="w-full px-4 py-3 mt-2 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                  type="text"
                  value={formData?.permAddress?.country}
                  required
                  placeholder="Country"
                  id="permanentCountry"
                  {...register("permAddress.country", { required: true })}
                />
                <input
                  className="w-full px-4 py-3 mt-2 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                  type="text"
                  value={formData?.permAddress?.zip}
                  required
                  placeholder="Zip Code"
                  id="permanentZip"
                  {...register("permAddress.zip", { required: true })}
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={isSameAddress}
                  onChange={handleCheckboxChange}
                  className="form-checkbox"
                />
                <span className="ml-2">Same as Permanent Address</span>
              </label>
            </div>
            {!isSameAddress && (
              <div className="mt-3">
                <label htmlFor="currentAddress" className="font-bold">Current Address</label>
                <input
                  className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                  type="text"
                  value={formData?.currAddress?.streetLine1}
                  required
                  placeholder="Street Line 1"
                  id="currentStreetLine1"
                  {...register("currAddress.streetLine1", { required: true })}
                />
                <input
                  className="w-full px-4 py-3 mt-2 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                  type="text"
                  value={formData?.currAddress?.streetLine2}
                  placeholder="Street Line 2"
                  id="currentStreetLine2"
                  {...register("currAddress.streetLine2", { required: false })}
                />
                <div className="flex gap-2">
                  <input
                    className="w-full px-4 py-3 mt-2 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                    type="text"
                    value={formData?.currAddress?.city}
                    required
                    placeholder="City"
                    id="currentCity"
                    {...register("currAddress.city", { required: true })}
                  />
                  <input
                    className="w-full px-4 py-3 mt-2 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                    type="text"
                    value={formData?.currAddress?.state}
                    required
                    placeholder="State"
                    id="currentState"
                    {...register("currAddress.state", { required: true })}
                  />
                  <input
                    className="w-full px-4 py-3 mt-2 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                    type="text"
                    value={formData?.currAddress?.country}
                    required
                    placeholder="Country"
                    id="currentCountry"
                    {...register("currAddress.country", { required: true })}
                  />
                  <input
                    className="w-full px-4 py-3 mt-2 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                    type="text"
                    value={formData?.currAddress?.zip}
                    required
                    placeholder="Zip Code"
                    id="currentZip"
                    {...register("currAddress.zip", { required: true })}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center">
            <button
              className="px-4 py-3 text-xl font-bold text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterStudent;
