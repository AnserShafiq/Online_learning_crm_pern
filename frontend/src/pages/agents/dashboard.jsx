import { useEffect } from "react";
import { useUserStore } from "../../stores/useUserStore";
import UserDetails from "../../component/userdetails";

const AgentDashboard = () => {
    const {checkAuth} = useUserStore();
    useEffect(() => {
      checkAuth()
    },[checkAuth])
  return (
    <div className="flex flex-col w-full gap-1">
      <h3>Welcome Agent</h3>
      <UserDetails />
    </div>
  )
}

export default AgentDashboard