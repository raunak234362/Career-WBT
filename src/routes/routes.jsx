
import Login from "../components/Login";
import StdCareerLayout from "../components/student/StdCareerLayout";
import AdmCareerLayout from "../components/admin/AdmCareerLayout";
// import AddContest from "../components/admin/AddContest";
// import { Assessment } from "../Assessment";
import QuestionPage from "../components/admin/QuestionPage";
import App from "../App";
import AdminProfile from "../components/admin/AdminProfile";
import StudentResult from "../components/student/Result";
import Contest from "../components/admin/Contest";
import StudentProfile from "../components/student/StudentProfile";
import StudentContest from "../components/student/Contest";
import Result from "../components/admin/Result";
import RegisterStudent from "../components/Register";
import Registeration from "../components/Registeration";
// import {
//   AddContest,
//   AddQuestion,
//   AdminProfile,
//   Contest,
//   AdmCareerLayout,
//   CardContest,
//   EditQuestion,
//   PdfCreator,
//   QuestionPage,
//   Result,
//   Sidebar
// } from "../components/admin";
// import { Login, Registeration } from "../components/style";
// import { App } from "../App";
// import {
//   StdCareerLayout,
//   StudentProfile,
//   Contest as StudentContest,
//   Result as StudentResult,
// } from "../components/student";

const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registeration />,
  },
  {
    path: "/dashboard",
    element: <App />,
    children: [
      {
        path: "admin",
        element: <AdmCareerLayout />,
        children: [
          {
            path: "profile",
            element: <AdminProfile />,
          },
          {
            path: "contest",
            element: <Contest />,
          },
          {
            path: "question",
            element: <QuestionPage />,
          },
          {
            path: "result",
            element: <Result />,
          },
        ],
      },
      {
        path: "student",
        element: <StdCareerLayout />,
        children: [
          {
            path: "profile",
            element: <StudentProfile />,
          },
          {
            path: "contest",
            element: <StudentContest />,
          },
          {
            path: "result",
            element: <StudentResult />,
          },
        ],
      },
    ],
  },
];

export default routes;
