import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 py-10 gap-8 bg-gray-50 min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<Employees />} />
            <Route path="/attendance" element={<Attendance />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
