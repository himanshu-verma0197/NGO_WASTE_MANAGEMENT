import React, { useEffect, useState } from "react";
import StatsCard from "./StatsCard";

const AdminDashboard = ({ setCurrentScreen }) => {
    const [reports, setReports] = useState([]);
    const token = localStorage.getItem("token");

    const fetchReports = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/reports/all", {
                headers: { "auth-token": token },
            });
            const data = await res.json();
            setReports(data);
        } catch (err) {
            console.error("Error fetching reports:", err);
        }
    };

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
            setReports((prev) =>
                prev.map((r) => (r._id === id ? { ...r, status: "Approved" } : r))
            );
        } catch (err) {
            console.error("Error approving report:", err);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const total = reports.length;
    const pending = reports.filter((r) => r.status === "Pending").length;
    const approved = reports.filter((r) => r.status === "Approved").length;

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <button
                    onClick={setCurrentScreen}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                    Logout
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <StatsCard title="Total Reports" value={total} color="blue" />
                <StatsCard title="Pending Reports" value={pending} color="yellow" />
                <StatsCard title="Approved Reports" value={approved} color="green" />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
                <h2 className="font-semibold">All Reports</h2>
                {reports.length === 0 ? (
                    <p>No reports yet.</p>
                ) : (
                    reports.map((report) => (
                        <div
                            key={report._id}
                            className="border p-4 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between space-y-3 md:space-y-0 md:space-x-6"
                        >
                            <div className="flex-1">
                                <p className="text-sm text-gray-700 mb-2">
                                    <strong>Description:</strong> {report.caption}
                                </p>
                                <p className="text-xs text-gray-500">
                                    <strong>Date:</strong>{" "}
                                    {new Date(report.date).toLocaleString()}
                                </p>
                                <p
                                    className={`text-xs font-semibold mt-1 ${report.status === "Approved"
                                        ? "text-green-600"
                                        : "text-yellow-600"
                                        }`}
                                >
                                    Status: {report.status}
                                </p>
                            </div>

                            {report.status === "Pending" && (
                                <button
                                    onClick={() => handleApprove(report._id)}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                                >
                                    Approve
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
