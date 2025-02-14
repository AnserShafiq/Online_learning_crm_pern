import { useEffect } from "react";
import { useUserStore } from "../../stores/useUserStore";
import UserDetails from "../../component/userdetails";
// import {useNavigate} from 'react-router-dom';
import LectureOne from "../../component/Lectures/One";
import SideMenu from "../../component/sideMenu";

const AgentDashboard = () => {
  
    const {checkAuth} = useUserStore();
    useEffect(() => {
      checkAuth()
    },[checkAuth])


  return (
    <div className="flex flex-col w-full gap-1">
      <h3>Welcome Agent</h3>
      <div className="grid grid-cols-[20%,80%] gap-0 border">
        <SideMenu />
        <div className="">
          <LectureOne />
        </div>
      </div>

      
      <UserDetails />

    </div>
  )
}

export default AgentDashboard