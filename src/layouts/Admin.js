import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";

function Admin({ handleLogout }) {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard handleLogout={handleLogout} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Admin;