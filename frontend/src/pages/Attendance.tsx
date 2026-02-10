import { useEffect, useState } from "react";
import api from "../api/axios";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceTable from "../components/AttendanceTable";

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [reloadKey, setReloadKey] = useState(0)

  const handleSuccess = () => {
    // increment key to force table reload
    setReloadKey((prev) => prev + 1)
  }

  useEffect(() => {
    api.get("/employees").then((res) => setEmployees(res.data));
  }, []);

  return (
    <>
    <AttendanceForm employees={employees} onSuccess={handleSuccess} />
    
    <AttendanceTable key={reloadKey}/>
    </>
  );
}
