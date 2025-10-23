import React, { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import Login from "./components/login"
import Signup from "./components/signup"
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [currentScreen, setCurrentScreen] = useState("loginScreen"); // initial screen

  const showAlert = (msg, type) => {
    alert(`${type.toUpperCase()}: ${msg}`);
  };

  return (
    <div className="bg-slate-300 min-h-screen">
      {currentScreen === "loginScreen" && (
        <LoginScreen setCurrentScreen={setCurrentScreen} />
      )}

      {currentScreen === "userLogin" && (
        <Login showAlert={showAlert} setCurrentScreen={setCurrentScreen} />
      )}

      {currentScreen === "signup" && (
        <Signup showAlert={showAlert} setCurrentScreen={setCurrentScreen} />
      )}

      {currentScreen === "admin" && (
        <AdminDashboard setCurrentScreen={setCurrentScreen} />
      )}
    </div>
  );
}

export default App;
