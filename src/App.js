import React, { useEffect, useState } from "react";
import LoginScreen from "./components/LoginScreen";
import Login from "./components/login";
import Signup from "./components/signup";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";

function App() {
  const [currentScreen, setCurrentScreen] = useState("loginScreen");

  // 🧠 Persistent shared state
  const [reports, setReports] = useState(() => {
    // Load existing reports from localStorage when app starts
    const saved = localStorage.getItem("reports");
    return saved ? JSON.parse(saved) : [];
  });

  // 💾 Save to localStorage whenever reports change
  useEffect(() => {
    localStorage.setItem("reports", JSON.stringify(reports));
  }, [reports]);

  // 🧍 User submits a new report
  const handleAddReport = (newReport) => {
    const updatedReports = [
      ...reports,
      { id: Date.now(), status: "pending", ...newReport },
    ];
    setReports(updatedReports);
  };

  // 👨‍💼 Admin approves a report
  const handleApproveReport = (id) => {
    const updatedReports = reports.map((r) =>
      r.id === id ? { ...r, status: "approved" } : r
    );
    setReports(updatedReports);
  };

  return (
    <div className="bg-slate-300 min-h-screen">
      {currentScreen === "loginScreen" && (
        <LoginScreen setCurrentScreen={setCurrentScreen} />
      )}

      {currentScreen === "userLogin" && (
        <Login role="user" setCurrentScreen={setCurrentScreen} />
      )}

      {currentScreen === "signup" && (
        <Signup role="user" setCurrentScreen={setCurrentScreen} />
      )}

      {currentScreen === "adminLogin" && (
        <Login role="admin" setCurrentScreen={setCurrentScreen} />
      )}

      {currentScreen === "adminSignup" && (
        <Signup role="admin" setCurrentScreen={setCurrentScreen} />
      )}

      {currentScreen === "userDashboard" && (
        <UserDashboard
          reports={reports}
          onAddReport={handleAddReport}
          setCurrentScreen={setCurrentScreen}
        />
      )}

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
