import React, { useEffect, useState, useCallback } from "react";
import { CheckCircle, Trash2, Clock, LogOut, Leaf } from "lucide-react";

const AdminDashboard = ({ setCurrentScreen }) => {
    const [reports, setReports] = useState([]);
    const token = localStorage.getItem("token");

    // Fetch reports (wrapped with useCallback for stable dependency)
    const fetchReports = useCallback(async () => {
        try {
            const res = await fetch("http://localhost:5000/api/reports/all", {
                headers: { "auth-token": token },
            });
            const data = await res.json();
            setReports(data);
        } catch (err) {
            console.error("Error fetching reports:", err);
        }
    }, [token]);

    // Approve report and refresh list
    const handleApprove = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/reports/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
                body: JSON.stringify({ status: "Approved" }),
            });

            await fetchReports(); // Refresh data after update
        } catch (err) {
            console.error("Error approving report:", err);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    // Stats
    const total = reports.length;
    const pending = reports.filter((r) => r.status === "Pending").length;
    const approved = reports.filter((r) => r.status === "Approved").length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <Leaf className="text-green-700 w-8 h-8" />
                    <h1 className="text-3xl font-bold text-green-800">
                        EcoClean Admin Dashboard
                    </h1>
                </div>
                <button
                    onClick={setCurrentScreen}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow-md transition"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <div className="bg-white shadow-md rounded-2xl p-6 flex items-center justify-between border-l-4 border-blue-500">
                    <div>
                        <h3 className="text-gray-600 font-semibold">Total Reports</h3>
                        <p className="text-3xl font-bold text-blue-600">{total}</p>
                    </div>
                    <Trash2 className="text-blue-500 w-10 h-10 opacity-70" />
                </div>

                <div className="bg-white shadow-md rounded-2xl p-6 flex items-center justify-between border-l-4 border-yellow-400">
                    <div>
                        <h3 className="text-gray-600 font-semibold">Pending Reports</h3>
                        <p className="text-3xl font-bold text-yellow-500">{pending}</p>
                    </div>
                    <Clock className="text-yellow-400 w-10 h-10 opacity-70" />
                </div>

                <div className="bg-white shadow-md rounded-2xl p-6 flex items-center justify-between border-l-4 border-green-500">
                    <div>
                        <h3 className="text-gray-600 font-semibold">Approved Reports</h3>
                        <p className="text-3xl font-bold text-green-600">{approved}</p>
                    </div>
                    <CheckCircle className="text-green-500 w-10 h-10 opacity-70" />
                </div>
            </div>

            {/* Reports List */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-green-800 mb-4">
                    🗑️ Report Management
                </h2>
                {reports.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">
                        No reports yet — looks like the city is clean 🌱
                    </div>
                ) : (
                    <div className="space-y-4">
                        {reports.map((report) => (
                            <div
                                key={report._id}
                                className="border border-gray-200 bg-green-50 hover:bg-green-100 transition rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm"
                            >
                                <div className="flex-1">
                                    <p className="text-gray-800 mb-2">
                                        <strong>Description:</strong> {report.caption}
                                    </p>
                                    <p className="text-xs text-gray-600 mb-1">
                                        <strong>Date:</strong>{" "}
                                        {new Date(report.date).toLocaleString()}
                                    </p>
                                    <span
                                        className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${report.status === "Approved"
                                                ? "bg-green-200 text-green-700"
                                                : "bg-yellow-200 text-yellow-700"
                                            }`}
                                    >
                                        {report.status}
                                    </span>
                                </div>

                                {report.status === "Pending" && (
                                    <button
                                        onClick={() => handleApprove(report._id)}
                                        className="mt-4 md:mt-0 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
                                    >
                                        Approve
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="mt-10 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} EcoClean | Keep your city green 🌿
            </div>
        </div>
    );
};

export default AdminDashboard;
