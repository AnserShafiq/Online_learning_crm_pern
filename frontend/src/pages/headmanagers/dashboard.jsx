import { useEffect, useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
import {pdfjs} from 'react-pdf'

const HMDashboard = () => {
    const {user, checkAuth} = useUserStore();
    const [file, setFile] = useState(null)
    const [fileData, setFileData] = useState(null)
    useEffect(() => {
      checkAuth()
    },[checkAuth])

    const handleFileUpload = (e) => {
      e.preventDefault();
      const fileRead = e.target.files[0]
      setFile(fileRead)
      const data = new FileReader();
      if(fileRead.type === 'application/pdf'){
        data.onload = async () => {
          const typedArray = new Uint8Array(data.result)
          const pdf = await pdfjs.getDocument(typedArray).promise
          let text = "";
          for (let i = 0; i < pdf.numPages; i++) {
            const page = await pdf.getPage(i + 1);
            const content = await page.getTextContent();
            text += content.items.map((item) => item.str).join(" ") + "\n";
          }
          setFileData(text)
        }
        data.readAsArrayBuffer(fileRead)
      }else{
        setFileData('Unsupported Type')
      }
    }
    useEffect(() => {
      if (file) {
        console.log(file); // Logs the updated file after state change
      }
    }, [file]);
    
  return (
    <div className='flex flex-col w-full gap-1'>
      <h3>Welcome Manager,  {user?.name}</h3>
      <form>
        <div>
          <label>Add a lecture file: </label>
          <input type="file" accept=".doc, .docx, .pdf" id="testfile" name="testfile" onChange={handleFileUpload}/>
          <h4>File Content:</h4>
        <pre className="whitespace-pre-wrap">{fileData || "No file uploaded."}</pre>
        </div>
      </form>
    </div>
  )
}

export default HMDashboard