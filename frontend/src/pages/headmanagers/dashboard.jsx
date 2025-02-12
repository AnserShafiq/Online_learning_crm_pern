import { useEffect, useState } from "react";
import { useUserStore } from "../../stores/useUserStore";

const HMDashboard = () => {
    const {user, checkAuth} = useUserStore();
    const [file, setFile] = useState(null)
    useEffect(() => {
      checkAuth()
    },[checkAuth])
    const handleFileUpload = (e) => {
      e.preventDefault();
      const fileRead = e.target.files[0]
      console.log(fileRead)
    }
  return (
    <div className='flex flex-col w-full gap-1'>
      <h3>Welcome Manager,  {user?.name}</h3>
      <form>
        <div>
          <label>Add a lecture file: </label>
          <input type="file" accept=".doc, .docx, .pdf" id="testfile" name="testfile" onChange={handleFileUpload}/>
        </div>
      </form>
    </div>
  )
}

export default HMDashboard