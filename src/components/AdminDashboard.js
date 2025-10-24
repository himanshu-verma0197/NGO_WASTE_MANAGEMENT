import React from "react";
import StatsCard from "./StatsCard";

const AdminDashboard = ({ reports, onApprove, setCurrentScreen }) => {
    const total = reports.length;
    const pending = reports.filter((r) => r.status === "pending").length;
    const approved = reports.filter((r) => r.status === "approved").length;

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
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
                            key={report.id}
                            className="border p-4 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between space-y-3 md:space-y-0 md:space-x-6"
                        >
                            <div className="flex-1">
                                <p className="text-sm text-gray-700 mb-2">
                                    <strong>Description:</strong> {report.description}
                                </p>
                                <p className="text-xs text-gray-500">
                                    <strong>Date:</strong> {report.date}
                                </p>
                                <p
                                    className={`text-xs font-semibold mt-1 ${report.status === "approved"
                                            ? "text-green-600"
                                            : "text-yellow-600"
                                        }`}
                                >
                                    Status: {report.status}
                                </p>
                            </div>

                            {report.image && (
                                <img
                                    src={report.image}
                                    alt="Report"
                                    className="w-40 h-28 object-cover rounded-lg border shadow"
                                />
                            )}

                            {report.status === "pending" && (
                                <button
                                    onClick={() => onApprove(report.id)}
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
