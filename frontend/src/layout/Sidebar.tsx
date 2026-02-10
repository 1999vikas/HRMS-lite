import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-8">HRMS Lite</h1>

      <nav className="space-y-4">
        <Link to="/" className="block hover:text-gray-300">
          Employees
        </Link>
        <Link to="/attendance" className="block hover:text-gray-300">
          Attendance
        </Link>
      </nav>
    </aside>
  );
}
