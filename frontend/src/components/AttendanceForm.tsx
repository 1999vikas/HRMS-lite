import { useEffect, useState } from "react"
import api from "../api/axios"
import ErrorAlert from "./ErrorAlert"

interface Employee {
  id: number
  full_name: string
}

interface Errors {
  employee_id?: string
  date?: string
  status?: string
}

const AttendanceForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [employees, setEmployees] = useState<Employee[]>([])

  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "",
  })

  const [errors, setErrors] = useState<Errors>({})
  const [apiError, setApiError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  //  Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get("/employees")
        setEmployees(res.data)
      } catch {
        setApiError("Failed to load employees")
      }
    }

    fetchEmployees()
  }, [])

  
  const validate = () => {
    const newErrors: Errors = {}

    if (!form.employee_id)
      newErrors.employee_id = "Please select an employee"

    if (!form.date) {
      newErrors.date = "Date is required"
    } else {
      const selected = new Date(form.date)
      const today = new Date()

      today.setHours(0, 0, 0, 0)

     
    }

    if (!form.status)
      newErrors.status = "Please select status"

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })

    setErrors({
      ...errors,
      [e.target.name]: "",
    })
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  setApiError("")
  setSuccess("")

  // ✅ Stop if validation fails
  if (!validate()) return

  // Extra guard (VERY professional)
  if (!form.status) {
    setApiError("Please select attendance status")
    return
  }

  try {
    setLoading(true)

    // Normalize payload before sending
    const payload = {
      employee_id: Number(form.employee_id),
      date: form.date,
      status: form.status.toLowerCase(), // prevents enum crash
    }

    console.log("Submitting attendance:", payload)

    await api.post("/attendance", payload)

    setSuccess("✅ Attendance marked successfully!")

    // Reset form safely
    setForm({
      employee_id: "",
      date: "",
      status: "" as "" | "present" | "absent",
    })

    onSuccess()

    setTimeout(() => setSuccess(""), 2500)

  } catch (error: any) {

    
    const detail = error?.response?.data?.detail

    let message = "Failed to mark attendance"

    if (Array.isArray(detail)) {
      message = detail[0]?.msg
    } else if (typeof detail === "string") {
      message = detail
    }

    setApiError(message)

  } finally {
    setLoading(false)
  }
}


  return (
    <form className="bg-white p-6 rounded-xl shadow-md space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold">Mark Attendance</h2>

      <ErrorAlert
        message={apiError}
        onClose={() => setApiError("")}
      />

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      {/* Employee Dropdown */}
      <div>
        <select
          name="employee_id"
          value={form.employee_id}
          onChange={handleChange}
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option value="">Select Employee</option>

          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.full_name}
            </option>
          ))}
        </select>

        {errors.employee_id && (
          <p className="text-red-500 text-sm">{errors.employee_id}</p>
        )}
      </div>

      {/* Date */}
      <div>
        <input
          type="date"
          name="date"
          value={form.date}
          
          onChange={handleChange}
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
        />

        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date}</p>
        )}
      </div>

      {/* Status */}
      <div>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option value="">Select Status</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>

        {errors.status && (
          <p className="text-red-500 text-sm">{errors.status}</p>
        )}
      </div>

      
      <button
        disabled={loading}
        className={`w-full py-2 rounded-lg text-white font-medium transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Submitting..." : "Mark Attendance"}
      </button>
    </form>
  )
}

export default AttendanceForm
