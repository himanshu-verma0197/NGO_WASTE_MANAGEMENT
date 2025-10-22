import React from "react";

const Header = ({ title, setCurrentScreen }) => (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        <button
            onClick={() => setCurrentScreen("login")}
            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
        >
            Logout
        </button>
    </header>
);

export default Header;
