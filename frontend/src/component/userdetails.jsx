import { useEffect } from "react";
import { useGetData } from "../stores/useGetData";
import { useUserStore } from "../stores/useUserStore"

const UserDetails = () => {
  const {user} = useUserStore();
  const {manager,gettingManager} = useGetData();
  useEffect(() => {
    if(user.user_type === 'Sale Manager'){
      gettingManager(user.manager_id, 'HM')
    }else{
      gettingManager(user.manager_id, 'SM')
    }
  }, [gettingManager,user])
  return (
    <div className="flex flex-row border gap-16 flex-wrap w-full bg-dull px-10 py-10">
        {/* User Name */}
        <div className="flex gap-4">
          <h2 className="font-semibold uppercase text-emerald-500 tracking-wide"><span className="border-b border-emerald-500 ">Name</span> : </h2><h2 className="font-normal capitalize">{user.name}</h2>
        </div>
        {/* User Id */}
        <div className="flex gap-4">
          <h2 className="font-semibold uppercase text-emerald-500 tracking-wide"><span className="border-b border-emerald-500 ">Id</span> : </h2><h2 className="font-normal capitalize">{user.agent_id}</h2>
        </div>
        {/* User Email */}
        <div className="flex gap-4">
          <h2 className="font-semibold uppercase text-emerald-500 tracking-wide"><span className="border-b border-emerald-500 ">E-Mail</span> : </h2><h2 className="font-normal capitalize">{user.email}</h2>
        </div>
        {/* Companies */}
        <div className="flex gap-4">
          <h2 className="font-semibold uppercase text-emerald-500 tracking-wide"><span className="border-b border-emerald-500 ">Company assigned</span> : </h2><h2 className="font-normal capitalize">{typeof(user.assigned_company)}</h2>
        </div>
        {/* Manager */}
        <div className="flex gap-4">
          <h2 className="font-semibold uppercase text-emerald-500 tracking-wide"><span className="border-b border-emerald-500 ">Manager</span> : </h2><h2 className="font-normal capitalize">{manager?.name}</h2>
        </div>
        {/* Companies */}
        <div className="flex gap-4">
          <h2 className="font-semibold uppercase text-emerald-500 tracking-wide"><span className="border-b border-emerald-500 ">Post</span> : </h2><h2 className="font-normal capitalize">{user.user_type}</h2>
        </div>
    </div>
  )
}

export default UserDetails