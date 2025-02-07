import { useUserStore } from "../stores/useUserStore"

const UserDetails = () => {
    const {user} = useUserStore();
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
        {/* User Email */}
        <div className="flex gap-4">
          <h2 className="font-semibold uppercase text-emerald-500 tracking-wide"><span className="border-b border-emerald-500 ">Company assigned</span> : </h2><h2 className="font-normal capitalize">{typeof(user.assigned_company)}</h2>
        </div>
    </div>
  )
}

export default UserDetails