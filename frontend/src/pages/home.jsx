import { useState } from "react";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const managers = [
    { manager_id: 1, name: "Manager 1" },
    { manager_id: 2, name: "Manager 2" },
    { manager_id: 3, name: "Manager 3" },
  ]
  const handleSubmission = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries()); 
  
      data.assigned = [...formData.getAll("assigned")]; 
  
      const response = await fetch("http://localhost:4600/new-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
  
      const responseData = await response.json();
      console.log("Success:", responseData);
      setUserData(responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div>
      <h3 className="text-3xl text-specialColor">Website&apos;s Home</h3>

      <form onSubmit={handleSubmission} className="flex flex-wrap">
            <div className="flex flex-col w-1/2 border-2 border-black">
                <label>Agent&apos;s Name</label>
                <input type='text' placeholder="Agent's Name..." name='name' id='name' required/>
            </div>
            <div className="flex flex-col w-1/2 border-2 border-black">
                <label>Gender</label>
                <select name='gender' id="gender" required>
                    <option value={''} >Select Option</option>
                    <option value={'Male'}>Male</option>
                    <option value={'Female'}>Female</option>
                </select>
            </div>
            <div className="flex flex-col w-1/2 border-2 border-black">
                <label>Email Id</label>
                <input type='email' placeholder="Agent's Email..." name='email' id='email' required/>
            </div>
            <div className="flex flex-col w-1/2 border-2 border-black">
                <label>Managers</label>
                <select name="manager" id="manager" required>
                    <option value={''} >Select Manager</option>
                    {
                        managers.map((manager) =>(
                            <option value={manager.manager_id} key={manager.manager_id}>{manager.name}</option>
                        ) )
                    }
                </select>
            </div>
            <div className="flex flex-col w-1/2 border-2 border-black">
                <label>Profile Password</label>
                <input type='text' placeholder="Password..." name='password' id='password' required/>
            </div>
            <div className="flex flex-col w-1/2 border-2 border-black">
            <label>Company Allotted</label>
            <div id="assigned-checkboxes">
                <label>
                    <input type="checkbox" name="assigned" value="One" /> One
                </label>
                <label>
                    <input type="checkbox" name="assigned" value="Two" /> Two
                </label>
                <label>
                    <input type="checkbox" name="assigned" value="Three" /> Three
                </label>
                <label>
                    <input type="checkbox" name="assigned" value="Four" /> Four
                </label>
                <label>
                    <input type="checkbox" name="assigned" value="Five" /> Five
                </label>
            </div>
            </div>

            <button type="submit">Submit</button>
        </form>

      {userData && <p>Response: {JSON.stringify(userData)}</p>}
    </div>
  );
};

export default Home;
