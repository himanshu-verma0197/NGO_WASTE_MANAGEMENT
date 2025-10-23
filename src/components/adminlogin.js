import React, { useState } from "react";

const AdminLogin = ({ setCurrentScreen, showAlert }) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/adminlogin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        const json = await response.json();

        if (json.success) {
            localStorage.setItem("adminToken", json.authToken || json.authtoken);
            showAlert("Admin logged in successfully", "success");

            // Redirect to admin dashboard
            setCurrentScreen("adminDashboard");
        } else {
            showAlert("Invalid Credentials", "danger");
        }
    };

    const onChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-semibold text-center mb-6">Admin Login</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">Email address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={credentials.email}
                        onChange={onChange}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="admin@example.com"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={credentials.password}
                        onChange={onChange}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
                    Login
                </button>

                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Don’t have an account?{" "}
                        <button
                            type="button"
                            onClick={() => setCurrentScreen("adminSignup")}
                            className="text-blue-600 hover:underline font-semibold"
                        >
                            Create one here
                        </button>
                    </p>
                </div>

                <div className="text-center mt-2">
                    <button
                        type="button"
                        onClick={() => setCurrentScreen("loginScreen")}
                        className="text-gray-500 hover:underline text-sm"
                    >
                        ← Back
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminLogin;
