import React, { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import Login from "./components/login"; // single component for both roles
import Signup from "./components/signup"; // single component for both roles
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [currentScreen, setCurrentScreen] = useState("loginScreen");

  const showAlert = (msg, type) => alert(`${type.toUpperCase()}: ${msg}`);

  return (
    <div className="bg-slate-300 min-h-screen">
      {currentScreen === "loginScreen" && (
        <LoginScreen setCurrentScreen={setCurrentScreen} />
      )}

      {/* User Login */}
      {currentScreen === "userLogin" && (
        <Login
          role="user"
          showAlert={showAlert}
          setCurrentScreen={setCurrentScreen}
        />
      )}

      {/* User Signup */}
      {currentScreen === "signup" && (
        <Signup
          role="user"
          showAlert={showAlert}
          setCurrentScreen={setCurrentScreen}
        />
      )}

      {/* Admin Login */}
      {currentScreen === "adminLogin" && (
        <Login
          role="admin"
          showAlert={showAlert}
          setCurrentScreen={setCurrentScreen}
        />
      )}

      {/* Admin Signup */}
      {currentScreen === "adminSignup" && (
        <Signup
          role="admin"
          showAlert={showAlert}
          setCurrentScreen={setCurrentScreen}
        />
      )}

      {/* Admin Dashboard */}
      {currentScreen === "adminDashboard" && (
        <AdminDashboard setCurrentScreen={setCurrentScreen} />
      )}
    </div>
  );
}

export default App;
