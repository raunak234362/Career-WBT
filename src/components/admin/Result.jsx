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
        'https://wbt-quizcave.onrender.com/api/v1/admin/result/results/',
        requestOptions
      );
      const data = await response.json();
      console.log("Fetched data:", data);  // Add this line
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
    {
      id:'1 ',
      name: "Anurag Bhatt",
      studentId:'WBT-hk32112',
      totalMarks:'84',
      phone:'9876543210',
    },
    {
      id:'2 ',
      name: "Anurag Bhatt",
      studentId:'WBT-hk32112',
      totalMarks:'84',
      phone:'9876543210',
    },
    {
      id:'3 ',
      name: "Anurag Bhatt",
      studentId:'WBT-hk32112',
      totalMarks:'84',
      phone:'9876543210',
    },
    {
      id:'4 ',
      name: "Anurag Bhatt",
      studentId:'WBT-hk32112',
      totalMarks:'84',
      phone:'9876543210',
    },
    {
      id:'5 ',
      name: "Anurag Bhatt",
      studentId:'WBT-hk32112',
      totalMarks:'84',
      phone:'9876543210',
    },
   
  ];


  return (
    <div>
        <div className="flex flex-row gap-8 w-full p-5">
        
        <div className="flex flex-col gap-3 w-1/4 bg-white shadow-lg p-5 rounded-xl py-20">
          <h1 className=" text-2xl text-gray-600 font-bold text-center">
          Total Students Present in Result
          </h1>
        </div>
        
      </div>
      <div className="h-80 table-container overflow-y-auto w-full p-5 rounded-lg">
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
                <td className=" px-4 py-3 border">
                 <select>
                    <option value=''>Select Result</option>
                    <option value='selected'>Selected</option>
                    <option value='notSelected'>Not-Selected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Result;
