import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AppNavbar from "./components/Navbar/Navbar";
import Properties from "./components/Properties/Properties";
import Appointments from "./components/Appointment/Appointments";
import { AuthProvider } from "./context/AuthContext";
import SuperAdminDashboard from "./components/SuperAdminPanel/SuperAdminDashboard";
import AddProperty from "./components/SuperAdminPanel/AddProperty";
import EditProperty from "./components/SuperAdminPanel/EditProperty";
import DeleteProperty from "./components/SuperAdminPanel/DeleteProperty";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/appointments" element={<Appointments />} />
          {/* Super Admin Routes */}
          <Route path="/super-admin" element={<SuperAdminDashboard />} />
          <Route path="/super-admin/add-property" element={<AddProperty />} />
          <Route path="/super-admin/edit-property" element={<EditProperty />} />
          <Route
            path="/super-admin/delete-property"
            element={<DeleteProperty />}
          />
        </Routes>
      </AuthProvider>
      <ToastContainer />
    </Router>
  );
};

export default App;
