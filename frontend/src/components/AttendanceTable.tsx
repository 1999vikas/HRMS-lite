import { useEffect, useState } from "react"
import { fetchAttendance } from "../api/attendance"

interface Attendance {
  id: number
  date: string
  status: "present" | "absent"
  employee: {
    employee_id: string
    full_name: string
    department: string
  }
}

const AttendanceTable = () => {
  const [data, setData] = useState<Attendance[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedDate, setSelectedDate] = useState("")

  useEffect(() => {
    loadAttendance()
  }, [selectedDate])

  const loadAttendance = async () => {
    try {
      setLoading(true)
      setError("")

      const res = await fetchAttendance(selectedDate)

      // Sort latest first (looks professional)
      const sorted = res.sort(
        (a: Attendance, b: Attendance) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      )

      setData(sorted)

    } catch (err: any) {
      setError("Failed to load attendance records.")
    } finally {
      setLoading(false)
    }
  }

  const clearFilter = () => {
    setSelectedDate("")
  }

  return (
    <div className="bg-white rounded-xl mt-10 shadow p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Attendance Records
        </h2>
      </div>

      {/* FILTER UI */}
      <div className="flex gap-3 mb-5">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={clearFilter}
          disabled={loading}
          className="border px-4 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
        >
          Clear
        </button>
      </div>

      {/* Showing label */}
      {selectedDate && (
        <p className="text-sm text-gray-500 mb-2">
          Showing attendance for <b>{selectedDate}</b>
        </p>
      )}

      {/* ERROR UI */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* LOADING */}
      {loading ? (
        <div className="text-gray-500">
          Loading attendance...
        </div>
      ) : data.length === 0 ? (

        /* EMPTY STATE */
        <div className="bg-yellow-50 text-yellow-700 p-3 rounded-lg">
          No attendance records found.
        </div>

      ) : (

        /* TABLE */
        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-3">Employee</th>
                <th className="p-3">Department</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {data.map((att) => (
                <tr
                  key={att.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium">
                    {att.employee.full_name}
                    <div className="text-xs text-gray-400">
                      {att.employee.employee_id}
                    </div>
                  </td>

                  <td className="p-3">
                    {att.employee.department}
                  </td>

                  <td className="p-3">
                    {new Date(att.date).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        att.status === "present"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {att.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  )
}

export default AttendanceTable
