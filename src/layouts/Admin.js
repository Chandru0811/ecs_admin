import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import "../styles/admin.css";
import "../styles/adminCDN.css";
import Sidebar from "../components/admin/Sidebar";
import AdminHeader from "../components/admin/AdminHeader";
import AdminFooter from "../components/admin/AdminFooter";
import Employee from "../pages/admin/Employee/Employee";
import EmployeeAdd from "../pages/admin/Employee/EmployeeAdd";
import EmployeeEdit from "../pages/admin/Employee/EmployeeEdit";
import EmployeeView from "../pages/admin/Employee/EmployeeView";
import Attendance from "../pages/admin/Attendance/Attendance";
import AttendanceAdd from "../pages/admin/Attendance/AttendanceAdd";
import AttendanceEdit from "../pages/admin/Attendance/AttendanceEdit";
import AttendanceView from "../pages/admin/Attendance/AttendanceView";

function Admin({ handleLogout }) {
  return (
    <div>
      <BrowserRouter basename="/admin">
        <div className="d-flex flex-column flex-lg-row bg-surface-secondary ">
          <Sidebar handleLogout={handleLogout} />
          <div className="flex-grow-1 h-screen overflow-y-lg-auto">
            <AdminHeader />
            <main className="pt-2" style={{ backgroundColor: "#f2f2f2" }}>
              <div style={{ minHeight: "80vh" }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="*" element={<Dashboard />} />

                  {/* Employeee */}
                  <Route path="/employee" element={<Employee />} />
                  <Route path="/employee/add" element={<EmployeeAdd />} />
                  <Route path="/employee/edit" element={<EmployeeEdit />} />
                  <Route path="/employee/view" element={<EmployeeView />} />

                  {/* Attendance */}
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/attendance/add" element={<AttendanceAdd />} />
                  <Route path="/attendance/edit/:id" element={<AttendanceEdit />} />
                  <Route path="/attendance/view" element={<AttendanceView />} />
                </Routes>
              </div>
              <AdminFooter />
            </main>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default Admin;