import {  useState } from "react";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceTable from "../components/AttendanceTable";

export default function Attendance() {
  
  const [reloadKey, setReloadKey] = useState(0)

  const handleSuccess = () => {
    // increment key to force table reload
    setReloadKey((prev) => prev + 1)
  }

  

  return (
    <>
    <AttendanceForm  onSuccess={handleSuccess} />
    
    <AttendanceTable key={reloadKey}/>
    </>
  );
}
