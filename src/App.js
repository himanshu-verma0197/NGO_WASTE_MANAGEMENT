import React, { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import Login from "./components/login";
import Signup from "./components/signup";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";

function App() {
  const [currentScreen, setCurrentScreen] = useState("loginScreen");

  const handleLogout = () => {
    localStorage.clear();
    setCurrentScreen("loginScreen");
  };

  const role = localStorage.getItem("role");

  if (role === "user" && currentScreen !== "userDashboard")
    setCurrentScreen("userDashboard");
  if (role === "admin" && currentScreen !== "adminDashboard")
    setCurrentScreen("adminDashboard");

  return (
    <div className="bg-gray-50 min-h-screen">
      {currentScreen === "loginScreen" && (
        <LoginScreen setCurrentScreen={setCurrentScreen} />
      )}
      {currentScreen === "userLogin" && (
        <Login role="user" setCurrentScreen={setCurrentScreen} />
      )}
      {currentScreen === "adminLogin" && (
        <Login role="admin" setCurrentScreen={setCurrentScreen} />
      )}
      {currentScreen === "signup" && (
        <Signup role="user" setCurrentScreen={setCurrentScreen} />
      )}
      {currentScreen === "adminSignup" && (
        <Signup role="admin" setCurrentScreen={setCurrentScreen} />
      )}
      {currentScreen === "userDashboard" && (
        <UserDashboard setCurrentScreen={handleLogout} />
      )}
      {currentScreen === "adminDashboard" && (
        <AdminDashboard setCurrentScreen={handleLogout} />
      )}
    </div>
  );
}

export default App;
