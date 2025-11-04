import React, { useState } from "react";

const Signup = ({ setCurrentScreen, role = "user" }) => {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials;

        if (!name || !email || !password || !cpassword) {
            alert("⚠️ Please fill all the fields!");
            return;
        }

        if (password !== cpassword) {
            alert("⚠️ Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, role }),
            });

            const json = await response.json();
            console.log("🧾 Signup Response:", json);

            if (json.authToken || json.authtoken) {
                const token = json.authToken || json.authtoken;
                localStorage.setItem("token", token);
                localStorage.setItem("role", json.role || role);

                // ✅ Redirect based on role
                if (json.role === "admin" || role === "admin") {
                    setCurrentScreen("adminDashboard");
                } else if (json.role === "ngo" || role === "ngo") {
                    setCurrentScreen("ngoDashboard");
                } else {
                    setCurrentScreen("userDashboard");
                }

                alert("✅ Account created successfully!");
            } else {
                alert(json.error || "❌ Signup failed. Try again.");
            }
        } catch (error) {
            console.error("🔥 Signup error:", error);
            alert("⚠️ Server error. Please try again later.");
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
                <h2 className="text-2xl font-semibold text-center mb-6 text-green-700">
                    {role === "admin"
                        ? "Admin Signup"
                        : role === "ngo"
                            ? "NGO Signup"
                            : "User Signup"}
                </h2>

                {/* Name */}
                <div className="mb-3">
                    <label htmlFor="name" className="block text-gray-700 mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={onChange}
                        value={credentials.name}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                        placeholder="Enter your name"
                    />
                </div>

                {/* Email */}
                <div className="mb-3">
                    <label htmlFor="email" className="block text-gray-700 mb-2">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={onChange}
                        value={credentials.email}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                        placeholder="name@example.com"
                    />
                </div>

                {/* Password */}
                <div className="mb-3">
                    <label htmlFor="password" className="block text-gray-700 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        minLength={5}
                        required
                        onChange={onChange}
                        value={credentials.password}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                        placeholder="Enter your password"
                    />
                </div>

                {/* Confirm Password */}
                <div className="mb-5">
                    <label htmlFor="cpassword" className="block text-gray-700 mb-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="cpassword"
                        name="cpassword"
                        onChange={onChange}
                        value={credentials.cpassword}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                        placeholder="Confirm your password"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                >
                    Sign Up
                </button>

                {/* Login & Back Buttons */}
                <div className="text-center mt-4">
                    <button
                        type="button"
                        onClick={() =>
                            setCurrentScreen(
                                role === "admin"
                                    ? "adminLogin"
                                    : role === "ngo"
                                        ? "ngoLogin"
                                        : "userLogin"
                            )
                        }
                        className="text-blue-600 hover:underline text-sm"
                    >
                        Already have an account? Login
                    </button>
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

export default Signup;
