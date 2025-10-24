import React, { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import Login from "./components/login";
import Signup from "./components/signup";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";

function App() {
  const [currentScreen, setCurrentScreen] = useState("loginScreen");

  return (
    <div className="bg-slate-300 min-h-screen">
      {currentScreen === "loginScreen" && (
        <LoginScreen setCurrentScreen={setCurrentScreen} />
      )}

      {/* User Login */}
      {currentScreen === "userLogin" && (
        <Login role="user" setCurrentScreen={setCurrentScreen} />
      )}

      {/* User Signup */}
      {currentScreen === "signup" && (
        <Signup role="user" setCurrentScreen={setCurrentScreen} />
      )}

      {/* Admin Login */}
      {currentScreen === "adminLogin" && (
        <Login role="admin" setCurrentScreen={setCurrentScreen} />
      )}

      {/* Admin Signup */}
      {currentScreen === "adminSignup" && (
        <Signup role="admin" setCurrentScreen={setCurrentScreen} />
      )}

      {/* Admin Dashboard */}
      {currentScreen === "adminDashboard" && (
        <AdminDashboard setCurrentScreen={setCurrentScreen} />
      )}

      {/* User Dashboard */}
      {currentScreen === "userDashboard" && (
        <UserDashboard setCurrentScreen={setCurrentScreen} />
      )}
    </div>
  );
}

export default App;
