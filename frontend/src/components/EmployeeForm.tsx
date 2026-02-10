import { useState } from "react"
import api from "../api/axios"

interface Errors {
  employee_id?: string
  full_name?: string
  email?: string
  department?: string
}

const EmployeeForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  })

  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)

  // ✅ Validate Function
  const validate = () => {
    const newErrors: Errors = {}

    if (!form.employee_id.trim())
      newErrors.employee_id = "Employee ID is required"

    if (!form.full_name.trim())
      newErrors.full_name = "Full name is required"

    if (!form.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!form.department.trim())
      newErrors.department = "Department is required"

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })

    // remove error as user types
    setErrors({
      ...errors,
      [e.target.name]: "",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    try {
      setLoading(true)

      await api.post("/employees", form)

      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      })

      onSuccess()
    } catch (error: any) {
      alert(error?.response?.data?.detail || "Failed to add employee")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-semibold">Add Employee</h2>

      {/* Employee ID */}
      <div>
        <input
          name="employee_id"
          placeholder="Employee ID"
          value={form.employee_id}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.employee_id && (
          <p className="text-red-500 text-sm">{errors.employee_id}</p>
        )}
      </div>

      {/* Full Name */}
      <div>
        <input
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.full_name && (
          <p className="text-red-500 text-sm">{errors.full_name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
      </div>

      {/* Department */}
      <div>
        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.department && (
          <p className="text-red-500 text-sm">{errors.department}</p>
        )}
      </div>

      <button
        disabled={loading}
        className={`w-full py-2 rounded text-white font-medium ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Adding..." : "Add Employee"}
      </button>
    </form>
  )
}

export default EmployeeForm
