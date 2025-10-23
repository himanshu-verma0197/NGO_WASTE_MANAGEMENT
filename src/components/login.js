import React, { useState } from "react";

const Login = ({ setCurrentScreen, showAlert }) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        const json = await response.json();

        if (json.success) {
            localStorage.setItem("token", json.authToken || json.authtoken);
            showAlert("Logged in successfully", "success");
            setCurrentScreen("user"); // you can add a dashboard later
        } else {
            showAlert("Invalid Credentials", "danger");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold text-center mb-6">User Login</h2>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={onChange}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="name@example.com"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={onChange}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    Login
                </button>

                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        Don’t have an account?{" "}
                        <button
                            type="button"
                            onClick={() => setCurrentScreen("signup")}
                            className="text-blue-600 hover:underline font-semibold"
                        >
                            Create one here
                        </button>
                    </p>
                </div>

                <div className="text-center mt-4">
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

export default Login;
