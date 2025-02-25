import { Route, Routes, Link, useLocation, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Homepage from "./pages/homepage";
import Patientspage from "./pages/Patientspage";
import Treatmentspage from "./pages/Treatmentspage";
import LogPage from "./pages/Logpage";
import AddPat from "./pages/Addpat";
import DelPat from "./pages/Delpat";
import DocsPage from "./pages/Docs";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import RoleBasedRoute from "./components/RoleBasedRoute";
import DoctorDashboard from "./pages/DoctorDashboard";
import Assign from "./pages/Assign";
import PatientRegister from "./pages/PatientRegister";

function App() {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  const toggleNavbar = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  useEffect(() => {
    setIsNavbarCollapsed(true);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Don't show navbar on login page
  if (
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/patient-register"
  ) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patient-register" element={<PatientRegister />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Hide navbar for patients
  const showNavbar = userRole !== "patient";

  // Create a simplified header for patients
  const PatientHeader = () => (
    <nav
      style={{
        backgroundColor: "#007bff",
        padding: "1rem",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "1.5rem" }}>Patient Dashboard</span>
        <button
          onClick={handleLogout}
          style={{
            background: "none",
            border: "1px solid white",
            color: "white",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );

  // Helper function to render navigation links based on role
  const renderNavLinks = (userRole) => {
    if (userRole === "admin") {
      return (
        <>
          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
              margin: "0.5rem 0",
              fontWeight: location.pathname === "/" ? "bold" : "normal",
            }}
          >
            Home
          </Link>
          <Link
            to="/patients"
            style={{
              color: "white",
              textDecoration: "none",
              margin: "0.5rem 0",
              fontWeight: location.pathname === "/patients" ? "bold" : "normal",
            }}
          >
            Patients
          </Link>
          <Link
            to="/treatments"
            style={{
              color: "white",
              textDecoration: "none",
              margin: "0.5rem 0",
              fontWeight:
                location.pathname === "/treatments" ? "bold" : "normal",
            }}
          >
            Treatments
          </Link>
          <Link
            to="/log"
            style={{
              color: "white",
              textDecoration: "none",
              margin: "0.5rem 0",
              fontWeight: location.pathname === "/log" ? "bold" : "normal",
            }}
          >
            Log
          </Link>
          <Link
            to="/add"
            style={{
              color: "white",
              textDecoration: "none",
              margin: "0.5rem 0",
              fontWeight: location.pathname === "/add" ? "bold" : "normal",
            }}
          >
            Add
          </Link>
          <Link
            to="/del"
            style={{
              color: "white",
              textDecoration: "none",
              margin: "0.5rem 0",
              fontWeight: location.pathname === "/del" ? "bold" : "normal",
            }}
          >
            Del
          </Link>
          <Link
            to="/all"
            style={{
              color: "white",
              textDecoration: "none",
              margin: "0.5rem 0",
              fontWeight: location.pathname === "/all" ? "bold" : "normal",
            }}
          >
            All Patients
          </Link>
          <Link
            to="/assign"
            style={{
              color: "white",
              textDecoration: "none",
              margin: "0.5rem 0",
              fontWeight: location.pathname === "/assign" ? "bold" : "normal",
            }}
          >
            Assign Doctors
          </Link>
        </>
      );
    } else if (userRole === "doctor") {
      return (
        <>
          <Link
            to="/doctor-dashboard"
            style={{
              color: "white",
              textDecoration: "none",
              margin: "0.5rem 0",
              fontWeight:
                location.pathname === "/doctor-dashboard" ? "bold" : "normal",
            }}
          >
            Dashboard
          </Link>
          <Link
            to="/patients"
            style={{
              color: "white",
              textDecoration: "none",
              margin: "0.5rem 0",
              fontWeight: location.pathname === "/patients" ? "bold" : "normal",
            }}
          >
            Patients
          </Link>
          <Link
            to="/treatments"
            style={{
              color: "white",
              textDecoration: "none",
              margin: "0.5rem 0",
              fontWeight:
                location.pathname === "/treatments" ? "bold" : "normal",
            }}
          >
            Treatments
          </Link>
        </>
      );
    }
    return null;
  };

  return (
    <div className="App">
      {userRole === "patient" ? (
        <PatientHeader />
      ) : (
        showNavbar && (
          <nav
            style={{
              backgroundColor: "#007bff",
              padding: "1rem",
              color: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Link
                to={userRole === "doctor" ? "/doctor-dashboard" : "/"}
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "1.5rem",
                }}
              >
                {userRole === "doctor" ? "Doctor Portal" : "Admin Portal"}
              </Link>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button
                  onClick={handleLogout}
                  style={{
                    background: "none",
                    border: "1px solid white",
                    color: "white",
                    padding: "0.5rem 1rem",
                    marginRight: "1rem",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                >
                  Logout
                </button>
                <button
                  onClick={toggleNavbar}
                  style={{
                    background: "none",
                    border: "none",
                    color: "white",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                  }}
                  aria-expanded={!isNavbarCollapsed}
                  aria-label="Toggle navigation"
                >
                  ☰
                </button>
              </div>
            </div>
            <div
              style={{
                display: isNavbarCollapsed ? "none" : "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginTop: "1rem",
              }}
            >
              {renderNavLinks(userRole)}
            </div>
          </nav>
        )
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <RoleBasedRoute allowedRoles={["admin"]}>
              <Homepage />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/patients"
          element={
            <RoleBasedRoute allowedRoles={["admin", "doctor"]}>
              <Patientspage />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/treatments"
          element={
            <RoleBasedRoute allowedRoles={["admin", "doctor"]}>
              <Treatmentspage />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/log"
          element={
            <RoleBasedRoute allowedRoles={["admin"]}>
              <LogPage />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <RoleBasedRoute allowedRoles={["admin", "doctor"]}>
              <AddPat />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/del"
          element={
            <RoleBasedRoute allowedRoles={["admin"]}>
              <DelPat />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/all"
          element={
            <RoleBasedRoute allowedRoles={["admin", "doctor"]}>
              <DocsPage />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/patient-dashboard"
          element={
            <RoleBasedRoute allowedRoles={["patient"]}>
              <PatientDashboard />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/doctor-dashboard"
          element={
            <RoleBasedRoute allowedRoles={["doctor"]}>
              <DoctorDashboard />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/assign"
          element={
            <RoleBasedRoute allowedRoles={["admin"]}>
              <Assign />
            </RoleBasedRoute>
          }
        />
        <Route
          path="*"
          element={
            userRole === "patient" ? (
              <Navigate to="/patient-dashboard" replace />
            ) : userRole === "doctor" ? (
              <Navigate to="/doctor-dashboard" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
