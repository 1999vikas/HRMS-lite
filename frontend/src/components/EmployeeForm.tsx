interface Props {
  onSuccess: () => void
}

const AttendanceForm: React.FC<Props> = ({ onSuccess }) => {
  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "",
  })
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApiError("")
    setSuccess("")

    // basic frontend validation
    if (!form.employee_id || !form.date || !form.status) {
      setApiError("All fields are required")
      return
    }

    try {
      setLoading(true)

      await api.post("/attendance", {
        ...form,
        employee_id: Number(form.employee_id),
      })

      setSuccess("Attendance marked successfully!")

      // clear form
      setForm({ employee_id: "", date: "", status: "" })

      // ✅ Auto refresh table
      onSuccess()

      setTimeout(() => setSuccess(""), 2500)
    } catch (error: any) {
      setApiError(
        error?.response?.data?.detail || "Failed to mark attendance"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow space-y-4"
    >
      {apiError && (
        <div className="bg-red-50 text-red-600 p-2 rounded">{apiError}</div>
      )}
      {success && (
        <div className="bg-green-50 text-green-700 p-2 rounded">{success}</div>
      )}

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Employee ID"
          value={form.employee_id}
          onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
          className="border p-2 rounded flex-1"
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border p-2 rounded flex-1"
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="border p-2 rounded flex-1"
        >
          <option value="">Select Status</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Marking..." : "Mark Attendance"}
      </button>
    </form>
  )
}

export default AttendanceForm
