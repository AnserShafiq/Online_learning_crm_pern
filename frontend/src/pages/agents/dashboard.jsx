import { useEffect } from "react";
import { useUserStore } from "../../stores/useUserStore";
import UserDetails from "../../component/userdetails";
// import {useNavigate} from 'react-router-dom';
import LectureOne from "../../component/Lectures/One";
import LectureTwo from '../../component/Lectures/Two';
import LectureThree from '../../component/Lectures/Three';
import SideMenu from "../../component/sideMenu";
import { Route, Routes } from "react-router-dom";

const AgentDashboard = () => {
  
    const {checkAuth} = useUserStore();
    useEffect(() => {
      checkAuth()
    },[checkAuth])


  return (
    <div className="flex flex-col w-full gap-1">
      <div className="grid grid-cols-[20%,80%] gap-0">
        <SideMenu />
        <div className="relative h-full">
          <Routes>
            <Route path="/" element={<LectureOne />}/>
            <Route path="lecture-two" element={<LectureTwo />}/>
            <Route path="lecture-three" element={<LectureThree />}/>
          </Routes>
        </div>
      </div>
      <UserDetails />
    </div>
  )
}

export default AgentDashboard