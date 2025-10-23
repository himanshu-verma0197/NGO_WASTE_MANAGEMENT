// import React, { useState } from "react";

// const AdminSignup = ({ setCurrentScreen, showAlert }) => {
//     const [credentials, setCredentials] = useState({
//         name: "",
//         email: "",
//         password: "",
//         cpassword: "",
//     });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const { name, email, password, cpassword } = credentials;

//         if (password !== cpassword) {
//             showAlert("Passwords do not match", "danger");
//             return;
//         }

//         const response = await fetch("http://localhost:5000/api/auth/adminsignup", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ name, email, password }),
//         });

//         const json = await response.json();

//         if (json.authtoken) {
//             localStorage.setItem("adminToken", json.authtoken);
//             showAlert("Admin account created successfully!", "success");

//             // Redirect to admin dashboard
//             setCurrentScreen("adminDashboard");
//         } else {
//             showAlert("Signup failed. Try again.", "danger");
//         }
//     };

//     const onChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-50">
//             <form className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
//                 <h2 className="text-2xl font-semibold text-center mb-6">Admin Signup</h2>

//                 <div className="mb-3">
//                     <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
//                     <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         onChange={onChange}
//                         className="w-full border rounded-lg px-3 py-2"
//                         placeholder="Enter your name"
//                         required
//                     />
//                 </div>

//                 <div className="mb-3">
//                     <label htmlFor="email" className="block text-gray-700 mb-2">Email address</label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         onChange={onChange}
//                         className="w-full border rounded-lg px-3 py-2"
//                         placeholder="admin@example.com"
//                         required
//                     />
//                 </div>

//                 <div className="mb-3">
//                     <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
//                     <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         minLength={5}
//                         required
//                         onChange={onChange}
//                         className="w-full border rounded-lg px-3 py-2"
//                         placeholder="Enter your password"
//                     />
//                 </div>

//                 <div className="mb-3">
//                     <label htmlFor="cpassword" className="block text-gray-700 mb-2">Confirm Password</label>
//                     <input
//                         type="password"
//                         id="cpassword"
//                         name="cpassword"
//                         onChange={onChange}
//                         className="w-full border rounded-lg px-3 py-2"
//                         placeholder="Confirm your password"
//                         required
//                     />
//                 </div>

//                 <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
//                     Sign Up
//                 </button>

//                 <div className="text-center mt-4">
//                     <button
//                         type="button"
//                         onClick={() => setCurrentScreen("adminLogin")}
//                         className="text-blue-600 hover:underline text-sm"
//                     >
//                         Already have an account? Login
//                     </button>
//                 </div>

//                 <div className="text-center mt-2">
//                     <button
//                         type="button"
//                         onClick={() => setCurrentScreen("loginScreen")}
//                         className="text-gray-500 hover:underline text-sm"
//                     >
//                         ← Back
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AdminSignup;
