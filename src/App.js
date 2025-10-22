import React, { useState } from "react";
import Login from "./components/login";
import Signup from "./components/signup";
import LoginScreen from "./components/LoginScreen";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [currentScreen, setCurrentScreen] = useState("login");
  // eslint-disable-next-line no-unused-vars
  const [currentUser, setCurrentUser] = useState("currentUser");

  return (
    <div className="bg-slate-300">
      {currentScreen === "login" && (
        <LoginScreen setCurrentScreen={setCurrentScreen} />
      )}
      {currentScreen === "user" && (
        <UserDashboard
          currentUser={currentUser}
          setCurrentScreen={setCurrentScreen}
        />
      )}
      {currentScreen === "admin" && (
        <AdminDashboard
          // eslint-disable-next-line no-unused-vars
          currentUser={currentUser}

          setCurrentScreen={setCurrentScreen}
        />
      )}
    </div>
  );
}

export default App;
