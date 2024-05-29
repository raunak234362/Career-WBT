/* eslint-disable no-unused-vars */
import { HashRouter, Route, Routes } from "react-router-dom"
import Register from "./Register"
import Login from "./Login"
import Successful from "./Successful"
import StdCareerLayout from "./student/StdCareerLayout"
import AdmCareerLayout from "./admin/AdmCareerLayout"
import { Assessment } from "../Assessment"
import { useState } from "react"
// import { Assessment } from "../Assessment"


const Layout = () => {
  const [contest, setContest] = useState({});
  const [result, setResult] = useState({});

  return (
    <div>
      <HashRouter>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/successful" element={<Successful/>}/>
            <Route path="/student/*" element={<StdCareerLayout/>}/>
            <Route path="/admin/*" element={<AdmCareerLayout/>}/>
            <Route path="/start-test" element={<Assessment contest={contest} result={result}/>}/>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default Layout
