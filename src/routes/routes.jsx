import Registeration from "../components/style/Registeration";
import Login from "../components/Login";
import StdCareerLayout from "../components/student/StdCareerLayout";
import AdmCareerLayout from "../components/admin/AdmCareerLayout";
import AddContest from "../components/admin/AddContest";
import { Assessment } from "../Assessment";
import QuestionPage from "../components/admin/QuestionPage";
import App from "../App";
import AdminProfile from "../components/admin/AdminProfile";
import Result from "../components/student/Result";
import Contest from "../components/admin/Contest";

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
                    element: <Result/>
                }
        ]
      },
    ],
  },
  {
    path: "/admin",
    element: <AdmCareerLayout />,
  },
];

export default routes;
