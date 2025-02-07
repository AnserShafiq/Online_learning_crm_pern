import { useEffect } from "react";
import { useUserStore } from "../../stores/useUserStore";

const HMDashboard = () => {
    const {user, checkAuth} = useUserStore();
    useEffect(() => {
      checkAuth()
    },[checkAuth])
  return (
    <div>HMDashboard, {user?.name}</div>
  )
}

export default HMDashboard