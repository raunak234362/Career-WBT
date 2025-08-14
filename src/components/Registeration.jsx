/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Logo from "../assets/logo.png";
import { set, useForm } from "react-hook-form";
import Service from "../config/Service";
const Registeration = () => {
    const [isSameAddress, setIsSameAddress] = useState(false);
    const [profilePreview, setProfilePreview] = useState(null);
    const { register, handleSubmit, watch, setValue } = useForm();
    
      const handleFileChange = (e, fileType) => {
        const file = e.target.files[0];
      };
    
    const date = new Date();
    // const handleSubmit = () => {
    //     console.log("submitted")
    // }

  const courseSemesterMap = {
    "BE/BTECH": ["Semester-7", "Semester-8", "Passout"],
    BCA: ["Semester-5", "Semester-6", "Passout"],
    BBA: ["Semester-5", "Semester-6", "Passout"],
    BCOM: ["Semester-5", "Semester-6", "Passout"],
    MBA: ["Semester-3", "Semester-4", "Passout"],
    MTECH: ["Semester-3", "Semester-4", "Passout"],
    DIPLOMA: ["Semester-3", "Semester-4", "Passout"],
  };
    
    const handleCheckboxChange = () => {
        setIsSameAddress(!isSameAddress);
        if (!isSameAddress) {
          setValue((prevState) => ({
            ...prevState,
            currAddress: { ...prevState.permAddress },
          }));
        }
    };
    const getSemesters = () => {
        const course = watch("course");
        console.log(course);
        return course ? courseSemesterMap[course] : [];
    };

    const onSubmit = async(data) => {
        const formData = new FormData()
        formData.append("resume", formData.resume);
        formData.append("name", formData.name);
        formData.append("email", formData.email);
        formData.append("phone", formData.phone);
        formData.append("altphone", formData.altPhone);
        formData.append("password", formData.password);
        formData.append("dob", formData.dob);
        formData.append("studentId", formData.studentId);
        formData.append("gender", formData.gender);
        formData.append("fatherName", formData.fatherName);
        formData.append("motherName", formData.motherName);
        formData.append(
            "currentSemester",
            isNaN(Number.parseInt(data.currentSemester)) ? 0 : Number.parseInt(data.currentSemester)
        );
        formData.append("marksheet", formData.marksheet);
        formData.append("branch", formData.branch);
        formData.append("course", formData.course);
        formData.append("college", formData.college);
        formData.append("cgpa", formData.cgpa);
        formData.append("passingYear", formData.passingYear);
        formData.append("backlog", formData.backlog);
        formData.append("permAddress", JSON.stringify(formData.permAddress));
        formData.append("currAddress", JSON.stringify(formData.currAddress));
        formData.append("profile", formData.profilePic);
        console.log("Form Data Submitted:", formData);
        
        const response = await Service.registerUser(formData);
        if (response) {
            console.log("Registration successful:", response);
        } else {
            console.error("Registration failed");
        }
    }
    
  return (
    <>
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
                    placeholder="Name"
                    id="name"
                    {...register("name", { required: true })}
                    onChange={(e) => setValue("name", e.target.value)}
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
                  placeholder="Email"
                  id="email"
                  {...register("email", { required: true })}
                onChange={(e) => setValue("email", e.target.value)}
                />
              </div>
              <div className="mt-3 text-sm">
                <label htmlFor="CollegeID">Student College ID</label>
                <input
                  className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                  type="text"
                  placeholder="Student ID"
                    id="studentId"
                    onChange={(e) => setValue("studentId", e.target.value)}          
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
                    placeholder="Contact Number"
                    id="phone"
                    onChange={(e) => setValue("phone", e.target.value)}
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
                    placeholder="Alternative Contact Number"
                    id="altphone"
                    onChange={(e) => setValue("altphone", e.target.value)}
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
                    id="gender"
                    onChange={(e) => setValue("gender", e.target.value)}
                    {...register("gender", { required: true })}
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
                    placeholder="dd-mm-yyyy"
                    id="dob"
                    onChange={(e) => setValue("dob", e.target.value)}
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
                  placeholder="Password"
                id="password"
                onChange={(e) => setValue("password", e.target.value)}
                  {...register("password", { required: true, minLength: 6 })}
                />
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
                    placeholder="Father Name"
                    id="fatherName"
                    onChange={(e) => setValue("fatherName", e.target.value)}
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
                    placeholder="Mother Name"
                    id="motherName"
                    onChange={(e) => setValue("motherName", e.target.value)}
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
                  placeholder="College Name"
                  id="college"
                    onChange={(e) => setValue("college", e.target.value)}
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
                    id="course"
                    onChange={(e) => setValue("course", e.target.value)}
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
                    placeholder="Branch"
                    id="branch"
                    onChange={(e) => setValue("branch", e.target.value)}
                    {...register("branch", { required: true })}
                  />
                </div>
                <div className="mt-3 w-full sm:w-[375px]">
                  <label htmlFor="currentSemester" className="text-sm">
                    Select Semester
                  </label>
                  <select
                    className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                    required
                    id="currentSemester"
                    onChange={(e) => setValue("currentSemester", e.target.value)}
                    {...register("currentSemester", { required: true })}
                  >
                    <option value="">Current Semester</option>
                                      {getSemesters().map((semester) => (
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
                    required
                    placeholder="CGPA"
                    id="cgpa"
                    onChange={(e) => setValue("cgpa", e.target.value)}
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
                    placeholder="No. of Backlog"
                    id="backlog"
                    onChange={(e) => setValue("backlog", e.target.value)}
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
                    placeholder="Passing Year"
                    id="passingYear"
                    onChange={(e) => setValue("passingYear", e.target.value)}
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
                    onChange={(e) => handleFileChange(e, "marksheet")}
                    {...register("marksheet", { required: true })}
                    accept=".pdf,.doc,.docx"
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
                    accept="image/*"
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
                    accept=".pdf,.doc,.docx"
                  />
                </div>
              </div>
            </div>

            {/*address*/}
            <div className="flex-row p-5 m-4 rounded-lg bg-green-50">
              <div className="mt-3">
                <p className="text-2xl font-bold text-green-800"></p>
                <label htmlFor="permanentAddress" className="font-bold">
                  Permanent Address
                </label>
                <input
                  className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                  type="text"
                  placeholder="Street Line 1"
                  id="permanentStreetLine1"
                  {...register("permAddress.streetLine1", { required: true })}
                />
                <input
                  className="w-full px-4 py-3 mt-2 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                  type="text"
                  id="permanentStreetLine2"
                  {...register("permAddress.streetLine2", { required: false })}
                />
                {/*address[4 fields]*/}
                <div className="flex gap-2">
                  <input
                    className="w-full px-4 py-3 mt-2 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                    type="text"
                    placeholder="City"
                    id="permanentCity"
                    {...register("permAddress.city", { required: true })}
                  />
                  <input
                    className="w-full px-4 py-3 mt-2 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                    type="text"
                    placeholder="State"
                    id="permanentState"
                    {...register("permAddress.state", { required: true })}
                  />
                  <input
                    className="w-full px-4 py-3 mt-2 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                    type="text"
                    placeholder="Country"
                    id="permanentCountry"
                    {...register("permAddress.country", { required: true })}
                  />
                  <input
                    className="w-full px-4 py-3 mt-2 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                    type="text"
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
                  <label htmlFor="currentAddress" className="font-bold">
                    Current Address
                  </label>
                  <input
                    className="w-full px-4 py-3 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                    type="text"
                    placeholder="Street Line 1"
                    id="currentStreetLine1"
                    {...register("currAddress.streetLine1", { required: true })}
                  />
                  <input
                    className="w-full px-4 py-3 mt-2 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                    type="text"
                    placeholder="Street Line 2"
                    id="currentStreetLine2"
                    {...register("currAddress.streetLine2", {
                      required: false,
                    })}
                  />
                  <div className="flex gap-2">
                    <input
                      className="w-full px-4 py-3 mt-2 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                      type="text"
                      placeholder="City"
                      id="currentCity"
                      {...register("currAddress.city", { required: true })}
                    />
                    <input
                      className="w-full px-4 py-3 mt-2 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                      type="text"
                      placeholder="State"
                      id="currentState"
                      {...register("currAddress.state", { required: true })}
                    />
                    <input
                      className="w-full px-4 py-3 mt-2 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                      type="text"
                      placeholder="Country"
                      id="currentCountry"
                      {...register("currAddress.country", { required: true })}
                    />
                    <input
                      className="w-full px-4 py-3 mt-2 leading-tight text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 peer"
                      type="text"
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
    </>
  );
}

export default Registeration