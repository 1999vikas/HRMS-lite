import axios from "./axios"


export const fetchAttendance = async (date?: string) => {
  const url = date
    ? `/attendance/all/?date=${date}`
    : "/attendance/all"

  const res = await axios.get(url)
  return res.data
}
