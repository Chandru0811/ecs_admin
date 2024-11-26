import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/client/auth/Login";
import "../styles/client.css";
function Client({
  handleLogout,
  handleLogin,
  handleClientLogin,
  isClientLogin,
}) {
  return (
    <div>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login handleLogin={handleLogin} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default Client;
