import { HashRouter, Route, Routes } from "react-router-dom"
import Register from "./Register"
import Login from "./Login"
import Successful from "./Successful"
import StdCareerLayout from "./student/StdCareerLayout"
import AdmCareerLayout from "./admin/AdmCareerLayout"


const Layout = () => {
  return (
    <div>
      <HashRouter>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/successful" element={<Successful/>}/>
            <Route path="/student/*" element={<StdCareerLayout/>}/>
            <Route path="/admin/*" element={<AdmCareerLayout/>}/>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default Layout
