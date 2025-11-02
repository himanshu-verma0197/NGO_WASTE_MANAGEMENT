import React, { useEffect, useState } from "react";
import UserCamera from "./UserCamera";
import { Leaf, Trash2, LogOut } from "lucide-react";

const UserDashboard = ({ setCurrentScreen }) => {
    const [reports, setReports] = useState([]);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [selectedView, setSelectedView] = useState(null);
    const token = localStorage.getItem("token");

    // ✅ Fetch reports
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/reports/user", {
                    headers: { "auth-token": token },
                });
                const data = await response.json();

                if (Array.isArray(data)) setReports(data);
                else setReports([]);
            } catch (error) {
                console.error("Failed to fetch reports:", error);
                setReports([]);
            }
        };

        if (token) fetchReports();
    }, [token]);

    // ✅ Submit new report
    const handleSubmit = async () => {
        if (!description.trim()) {
            alert("⚠️ Please add a description!");
            return;
        }

        if (!image) {
            alert("⚠️ Please add or capture an image before submitting!");
            return;
        }

        try {
            console.log("🧠 Sending report to backend...", {
                caption: description,
                location: "User Report Location",
                hasImage: !!image,
            });

            const response = await fetch("http://localhost:5000/api/reports/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
                body: JSON.stringify({
                    caption: description,
                    location: "User Report Location",
                    image: image, // Base64 string
                }),
            });

            const data = await response.json();
            console.log("📦 Backend Response:", data);

            if (!response.ok) {
                alert(`❌ Failed to submit report: ${data.error || "Unknown error"}`);
                return;
            }

            // ✅ Success
            setReports((prev) => [...prev, data]);
            setDescription("");
            setImage(null);
            alert("✅ Report submitted successfully!");
        } catch (error) {
            console.error("🔥 Error submitting report:", error);
            alert("❌ Something went wrong while submitting report.");
        }
    };

    // ✅ Delete report locally
    const handleDelete = (id) => {
        const updated = reports.filter((r) => r._id !== id);
        setReports(updated);
    };

    // ✅ Stats
    const total = reports.length;
    const pending = reports.filter((r) => r.status === "Pending").length;
    const approved = reports.filter((r) => r.status === "Approved").length;

    // ✅ Filtered reports
    const filteredReports =
        selectedView === "pending"
            ? reports.filter((r) => r.status === "Pending")
            : selectedView === "approved"
                ? reports.filter((r) => r.status === "Approved")
                : selectedView === "total"
                    ? reports
                    : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <Leaf className="text-green-700 w-8 h-8" />
                    <h1 className="text-3xl font-bold text-green-800">
                        EcoClean User Dashboard
                    </h1>
                </div>
                <button
                    onClick={() => {
                        localStorage.clear();
                        setCurrentScreen("login");
                    }}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow-md transition"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <div
                    onClick={() => setSelectedView("total")}
                    className="cursor-pointer bg-white shadow-md rounded-2xl p-6 flex items-center justify-between border-l-4 border-blue-500 hover:bg-blue-50 transition"
                >
                    <div>
                        <h3 className="text-gray-600 font-semibold">Total Reports</h3>
                        <p className="text-3xl font-bold text-blue-600">{total}</p>
                    </div>
                    <Trash2 className="text-blue-500 w-10 h-10 opacity-70" />
                </div>

                <div
                    onClick={() => setSelectedView("pending")}
                    className="cursor-pointer bg-white shadow-md rounded-2xl p-6 flex items-center justify-between border-l-4 border-yellow-400 hover:bg-yellow-50 transition"
                >
                    <div>
                        <h3 className="text-gray-600 font-semibold">Pending Reports</h3>
                        <p className="text-3xl font-bold text-yellow-500">{pending}</p>
                    </div>
                    <Trash2 className="text-yellow-400 w-10 h-10 opacity-70" />
                </div>

                <div
                    onClick={() => setSelectedView("approved")}
                    className="cursor-pointer bg-white shadow-md rounded-2xl p-6 flex items-center justify-between border-l-4 border-green-500 hover:bg-green-50 transition"
                >
                    <div>
                        <h3 className="text-gray-600 font-semibold">Approved Reports</h3>
                        <p className="text-3xl font-bold text-green-600">{approved}</p>
                    </div>
                    <Trash2 className="text-green-500 w-10 h-10 opacity-70" />
                </div>
            </div>

            {/* Submit or View Reports */}
            {!selectedView ? (
                <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6 border border-green-100">
                    <h2 className="font-semibold text-2xl text-green-800">
                        🗑️ Submit a New Cleanliness Report
                    </h2>
                    <p className="text-sm text-gray-600">
                        Help us keep your area clean! Describe the garbage issue you found
                        and attach a photo.
                    </p>

                    <textarea
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                        placeholder="Enter report details..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <UserCamera onCapture={setImage} />

                    <button
                        onClick={handleSubmit}
                        className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition shadow-md"
                    >
                        Submit Report
                    </button>
                </div>
            ) : (
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-100">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-2xl text-green-800">
                            {selectedView === "total"
                                ? "All Reports"
                                : selectedView === "pending"
                                    ? "Pending Reports"
                                    : "Approved Reports"}
                        </h2>
                        <button
                            onClick={() => setSelectedView(null)}
                            className="text-sm bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition"
                        >
                            Close
                        </button>
                    </div>

                    {filteredReports.length === 0 ? (
                        <p className="text-gray-500 text-center py-6">
                            No reports found. 🌱
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {filteredReports.map((r) => (
                                <div
                                    key={r._id}
                                    className="border border-gray-200 bg-green-50 hover:bg-green-100 transition rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm"
                                >
                                    <div className="flex-1">
                                        <p className="text-gray-800 mb-2">
                                            <strong>Description:</strong> {r.caption}
                                        </p>
                                        <p className="text-xs text-gray-600 mb-1">
                                            <strong>Date:</strong>{" "}
                                            {new Date(r.date).toLocaleString()}
                                        </p>
                                        <span
                                            className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${r.status === "Approved"
                                                    ? "bg-green-200 text-green-700"
                                                    : "bg-yellow-200 text-yellow-700"
                                                }`}
                                        >
                                            {r.status}
                                        </span>
                                    </div>

                                    {r.image && (
                                        <img
                                            src={r.image}
                                            alt="Report"
                                            className="w-32 h-24 object-cover rounded-lg border shadow"
                                        />
                                    )}

                                    {selectedView === "pending" && (
                                        <button
                                            onClick={() => handleDelete(r._id)}
                                            className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Footer */}
            <div className="mt-10 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} EcoClean | Together for a cleaner city 🌿
            </div>
        </div>
    );
};

export default UserDashboard;
