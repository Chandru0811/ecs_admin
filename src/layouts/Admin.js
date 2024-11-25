import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import "../styles/admin.css";
import "../styles/adminCDN.css";
import Sidebar from "../components/admin/Sidebar";
import AdminHeader from "../components/admin/AdminHeader";
import AdminFooter from "../components/admin/AdminFooter";
import Employee from "../pages/admin/Employee/Employee";

function Admin({ handleLogout }) {
  return (
    <div>
      <BrowserRouter>
        <div className="d-flex flex-column flex-lg-row bg-surface-secondary ">
          <Sidebar handleLogout={handleLogout} />
          <div className="flex-grow-1 h-screen overflow-y-lg-auto">
            <AdminHeader />
            <main className="pt-2" style={{ backgroundColor: "#f2f2f2" }}>
              <div style={{ minHeight: "80vh" }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="*" element={<Dashboard />} />
                  <Route path="/employee" element={<Employee />} />
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