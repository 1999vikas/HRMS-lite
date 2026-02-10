import { useEffect, useState } from "react";
import api from "../api/axios";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";

export default function Employees() {
  const [employees, setEmployees] = useState<any[]>([]);
  const load = async () => {
    const res = await api.get("/employees");
    setEmployees(res.data);
  };

  useEffect(() => { load(); }, []);

  return (
    <>
      <EmployeeForm onSuccess={load} />
      <EmployeeTable
        data={employees}
        onDelete={async (id: number) => {
          await api.delete(`/employees/${id}`);
          load();
        }}
      />
    </>
  );
}
