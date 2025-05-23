/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import career from "../assets/career.jpg";
// import { BASE_URL } from "../constants";
import { useForm } from "react-hook-form";
import AuthService from "../config/AuthService";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      role: "student"
    }
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { userId, password, role } = data;

    try {
      const user = await AuthService.login({ role, userId, password });

      if (!user?.data?.accessToken) {
        throw new Error("Invalid Credentials");
      }
      sessionStorage.setItem("token", user.data.accessToken);
      sessionStorage.setItem("refresh", user.data.refreshToken);
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("role", role);

      if (user.data.role !== role.toUpperCase()) {
        setErrorMessage(`Please log in through the ${user.data.role} portal`);
        return;
      }
      navigate(role === "admin" ? "/admin" : "/student");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.message || "Failed to login");
    }
  };
  const selectedRole = watch("role");

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <div className="md:w-1/2">
        <img src={career} alt="Career" className="object-cover w-full h-full" />
      </div>

      <div className="flex flex-col justify-center p-10 md:w-1/2">
        <h1 className="mb-8 text-3xl font-bold text-center">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="mr-4">
              <input
                type="radio"
                value="admin"
                {...register("role")}
                className="mr-2"
              />
              Admin
            </label>
            <label className="ml-4">
              <input
                type="radio"
                value="student"
                {...register("role")}
                className="mr-2"
              />
              Student
            </label>
          </div>

          <div className="mb-6">
            <div className="flex items-center py-2 border-b border-gray-300">
              <FaUser className="mr-3 text-gray-500" />
              <input
                type="text"
                placeholder="User ID"
                {...register("userId", { required: "User ID is required" })}
                className="w-full px-2 py-1 text-gray-700 bg-transparent border-none focus:outline-none"
              />
            </div>
            {errors.userId && (
              <p className="mt-1 text-sm text-red-500">{errors.userId.message}</p>
            )}
          </div>


          <div className="mb-6">
            <div className="flex items-center py-2 border-b border-gray-300">
              <RiLockPasswordFill className="mr-3 text-gray-500" />
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-2 py-1 text-gray-700 bg-transparent border-none focus:outline-none"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 text-center text-red-500">{errorMessage}</div>
          )}

          <div className="mb-4">
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none"
            >
              Login
            </button>
          </div>

          {selectedRole === "student" && (
            <p className="text-center">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-500 hover:text-blue-700"
              >
                Register
              </Link>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUser } from "react-icons/fa";
// import { RiLockPasswordFill } from "react-icons/ri";
// import { Link } from "react-router-dom";
// import career from "../assets/career.jpg";
// import { BASE_URL } from "../constants";
// import { useForm } from "react-"
// const Login = () => {
//   const [userId, setUserId] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("student"); // Local state for role selection
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const url =
//         role === "admin"
//           ? `${BASE_URL}/api/v1/admin/user/login`
//           : `${BASE_URL}/api/v1/user/login`;

//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userId, password }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to login");
//       }

//       const responseData = await response.json();
//       console.log(responseData);

//       if (responseData?.data?.role !== role) {
//         setErrorMessage(`Please log in ${responseData?.data?.role} portal`);
//         return;
//       }

//       localStorage.setItem("access", responseData?.data?.accessToken);
//       localStorage.setItem("refresh", responseData?.data?.refreshToken);
//       localStorage.setItem("userId", userId);

//       navigate(role === "admin" ? "/admin" : "/student");
//     } catch (error) {
//       console.error(error);
//       setErrorMessage(error.message);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen md:flex-row">
//       <div className="md:w-1/2">
//         <img src={career} alt="Career" className="object-cover w-full h-full" />
//       </div>
//       <div className="flex flex-col justify-center p-10 md:w-1/2">
//         <h1 className="mb-8 text-3xl font-bold text-center">Login</h1>
//         <form onSubmit={handleLogin}>
//           <div className="mb-6 role-selection">
//             <label className="mr-4">
//               <input
//                 type="radio"
//                 value="admin"
//                 checked={role === "admin"}
//                 onChange={() => setRole("admin")}
//                 className="mr-2"
//               />
//               Admin
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 value="student"
//                 checked={role === "student"}
//                 onChange={() => setRole("student")}
//                 className="mr-2"
//               />
//               Student
//             </label>
//           </div>
//           <div className="mb-6">
//             <div className="flex items-center py-2 border-b border-gray-300">
//               <FaUser className="mr-3 text-gray-500" />
//               <input
//                 type="text"
//                 placeholder="User ID"
//                 value={userId}
//                 onChange={(e) => setUserId(e.target.value)}
//                 className="w-full px-2 py-1 mr-3 leading-tight text-gray-700 bg-transparent border-none appearance-none focus:outline-none"
//               />
//             </div>
//           </div>
//           <div className="mb-6">
//             <div className="flex items-center py-2 border-b border-gray-300">
//               <RiLockPasswordFill className="mr-3 text-gray-500" />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-2 py-1 mr-3 leading-tight text-gray-700 bg-transparent border-none appearance-none focus:outline-none"
//               />
//             </div>
//           </div>
//           {errorMessage && (
//             <div className="mb-4 text-red-500">{errorMessage}</div>
//           )}
//           <div className="flex flex-row justify-between"></div>
//           <div className="flex items-center justify-between">
//             <button
//               type="submit"
//               className="w-full px-4 py-2 font-bold text-white transition-colors duration-300 bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
//             >
//               Login
//             </button>
//           </div>
//           {role === "student" && (
//             <div className="mt-4">
//               <p className="text-center">
//                 Don't have an account?{" "}
//                 <Link
//                   to="/register"
//                   className="text-blue-500 transition-colors duration-300 hover:text-blue-700"
//                 >
//                   Register
//                 </Link>
//               </p>
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
