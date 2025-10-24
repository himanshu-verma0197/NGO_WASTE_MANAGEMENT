import React, { useEffect, useState } from "react";
import LoginScreen from "./components/LoginScreen";
import Login from "./components/login";
import Signup from "./components/signup";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";

function App() {
  const [currentScreen, setCurrentScreen] = useState("loginScreen");
  const [reports, setReports] = useState(() => {
    // Load reports from localStorage when app starts
    const saved = localStorage.getItem("reports");
    return saved ? JSON.parse(saved) : [];
  });

  // Sync with localStorage every time reports change
  useEffect(() => {
    localStorage.setItem("reports", JSON.stringify(reports));
  }, [reports]);

  // ✅ Add new report from UserDashboard
  const handleAddReport = (newReport) => {
    const updated = [
      ...reports,
      { id: Date.now(), status: "pending", ...newReport },
    ];
    setReports(updated);
  };

  // ✅ Approve report in AdminDashboard
  const handleApproveReport = (id) => {
    const updated = reports.map((r) =>
      r.id === id ? { ...r, status: "approved" } : r
    );
    setReports(updated);
  };

  return (
    <div className="bg-slate-300 min-h-screen">
      {/* Login Selection Screen */}
      {currentScreen === "loginScreen" && (
        <LoginScreen setCurrentScreen={setCurrentScreen} />
      )}

      {/* User Login / Signup */}
      {currentScreen === "userLogin" && (
        <Login role="user" setCurrentScreen={setCurrentScreen} />
      )}
      {currentScreen === "signup" && (
        <Signup role="user" setCurrentScreen={setCurrentScreen} />
      )}

      {/* Admin Login / Signup */}
      {currentScreen === "adminLogin" && (
        <Login role="admin" setCurrentScreen={setCurrentScreen} />
      )}
      {currentScreen === "adminSignup" && (
        <Signup role="admin" setCurrentScreen={setCurrentScreen} />
      )}

      {/* User Dashboard */}
      {currentScreen === "userDashboard" && (
        <UserDashboard
          reports={reports}
          onAddReport={handleAddReport}
          setCurrentScreen={setCurrentScreen}
        />
      )}

      {/* Admin Dashboard */}
      {currentScreen === "adminDashboard" && (
        <AdminDashboard
          reports={reports}
          onApprove={handleApproveReport}
          setCurrentScreen={setCurrentScreen}
        />
      )}
    </div>
  );
}

export default App;
