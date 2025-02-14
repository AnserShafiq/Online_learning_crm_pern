import { useEffect, useState } from "react";
import { useGetData } from "../stores/useGetData";
import { useUserStore } from "../stores/useUserStore"

const UserDetails = () => {
  const {user, timeSpent, timer, updateTimer} = useUserStore();
  const {manager,gettingManager} = useGetData();

  const [timeDisplay, setTimeDisplayed] = useState(0);

  useEffect(() => {
    const m_id = user.manager_id;
    console.log(`User's manager=> `, m_id)
    if(user.user_type === 'Sale Manager' && user.manager_id !== undefined){
      gettingManager(user.manager_id, 'HM')
    }else if(user!== null && user.manager_id !== undefined){
      gettingManager(user.manager_id, 'SM')
      timeSpent()
    }
  }, [gettingManager,user,timeSpent])


  useEffect(() => {
    const handleTimeDisplay = () => {
      setTimeDisplayed(timer)
    }
    handleTimeDisplay()
  },[timer])

  useEffect(() => {
    const timeIncrement = setInterval(() => {
      setTimeDisplayed((prev) => prev+1)
      if(timeDisplay%15 === 0 && timeDisplay > 0){
        updateTimer(timeDisplay)
      }
      
    }, 1000)
    return () => clearInterval(timeIncrement)
  },[timeDisplay,updateTimer])

  return (
    <div className="grid grid-cols-4 gap-4 flex-wrap w-full bg-dull px-10 py-10">
        {/* User Name */}
        <div className="inline-flex gap-2">
          <h2 className="font-semibold uppercase text-emerald-500 tracking-wide"><span className="border-b border-emerald-500 ">Name</span> : </h2><h2 className="font-normal capitalize">{user.name}</h2>
        </div>
        {/* User Id */}
        <div className="inline-flex gap-2">
          <h2 className="font-semibold uppercase text-emerald-500 tracking-wide"><span className="border-b border-emerald-500 ">Id</span> : </h2><h2 className="font-normal capitalize">{user.agent_id}</h2>
        </div>
        {/* User Email */}
        <div className="inline-flex gap-2">
          <h2 className="font-semibold uppercase text-emerald-500 tracking-wide"><span className="border-b border-emerald-500 ">E-Mail</span> : </h2><h2 className="font-normal capitalize">{user.email}</h2>
        </div>
        {/* Companies */}
        <div className="inline-flex gap-2">
          <h2 className="font-semibold uppercase text-emerald-500 tracking-wide"><span className="border-b border-emerald-500 ">Company Assigned</span> : </h2><h2 className="font-normal capitalize">{user.assigned_company}</h2>
        </div>
        {/* Manager */}
        <div className="inline-flex gap-2">
          <h2 className="font-semibold uppercase text-emerald-500 tracking-wide"><span className="border-b border-emerald-500 ">Manager</span> : </h2><h2 className="font-normal capitalize">{manager?.name}</h2>
        </div>
        {/* Companies */}
        <div className="inline-flex gap-2">
          <h2 className="font-semibold uppercase text-emerald-500 tracking-wide"><span className="border-b border-emerald-500 ">Post</span> : </h2><h2 className="font-normal capitalize">{user.user_type}</h2>
        </div>
        {/* Time Spent */}
        <div className="flex flex-row gap-2">
          <h2 className="font-semibold uppercase text-emerald-500 tracking-wide"><span className="border-b border-emerald-500 ">Time Spent</span> : </h2><h2 className="font-normal capitalize">{Math.floor(timeDisplay / 3600)} hours {Math.floor((timeDisplay%3600) / 60)} min</h2>
        </div>
    </div>
  )
}

export default UserDetails