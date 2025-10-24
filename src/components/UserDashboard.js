import React, { useState } from "react";
import UserCamera from "./UserCamera";
import StatsCard from "./StatsCard";

const UserDashboard = ({ reports, onAddReport, setCurrentScreen }) => {
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [selectedView, setSelectedView] = useState(null); // null = show submit form

    // 📩 Submit a new report
    const handleSubmit = () => {
        if (!description || !image) {
            alert("Please add a description and a photo!");
            return;
        }

        const newReport = {
            id: Date.now(),
            description,
            image,
            date: new Date().toLocaleString(),
            status: "pending",
        };

        onAddReport(newReport);
        setDescription("");
        setImage(null);
        alert("✅ Report submitted!");
    };

    // ❌ Delete pending report
    const handleDelete = (id) => {
        const updated = reports.filter((r) => r.id !== id);
        localStorage.setItem("reports", JSON.stringify(updated));
        window.location.reload();
    };

    // 📊 Stats
    const total = reports.length;
    const pending = reports.filter((r) => r.status === "pending").length;
    const approved = reports.filter((r) => r.status === "approved").length;

    // 📁 Filtered reports for display
    const filteredReports =
        selectedView === "pending"
            ? reports.filter((r) => r.status === "pending")
            : selectedView === "approved"
                ? reports.filter((r) => r.status === "approved")
                : selectedView === "total"
                    ? reports
                    : [];

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">User Dashboard</h1>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4">
                <div onClick={() => setSelectedView("total")} className="cursor-pointer">
                    <StatsCard title="Total Reports" value={total} color="blue" />
                </div>
                <div onClick={() => setSelectedView("pending")} className="cursor-pointer">
                    <StatsCard title="Pending Reports" value={pending} color="yellow" />
                </div>
                <div onClick={() => setSelectedView("approved")} className="cursor-pointer">
                    <StatsCard title="Approved Reports" value={approved} color="green" />
                </div>
            </div>

            {/* Toggle between Submit Form and Reports List */}
            {!selectedView ? (
                // 📝 Submit Report Section
                <div className="bg-white p-6 rounded-lg shadow-md space-y-4 transition-all duration-300">
                    <h2 className="font-semibold text-lg text-gray-800">Submit a New Report</h2>
                    <textarea
                        className="w-full border p-2 rounded"
                        placeholder="Enter report details..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <UserCamera onCapture={setImage} />
                    <button
                        onClick={handleSubmit}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                        Submit Report
                    </button>
                </div>
            ) : (
                // 📋 Reports List Section
                <div className="bg-white p-6 rounded-lg shadow-md space-y-4 transition-all duration-300">
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-lg text-gray-800">
                            {selectedView === "total"
                                ? "All Reports"
                                : selectedView === "pending"
                                    ? "Pending Reports"
                                    : "Approved Reports"}
                        </h2>
                        <button
                            onClick={() => setSelectedView(null)}
                            className="text-sm bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                        >
                            Close
                        </button>
                    </div>

                    {filteredReports.length === 0 ? (
                        <p className="text-gray-500">No reports found.</p>
                    ) : (
                        filteredReports.map((r) => (
                            <div
                                key={r.id}
                                className="border p-4 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between space-y-3 md:space-y-0 md:space-x-6"
                            >
                                <div className="flex-1">
                                    <p className="text-sm text-gray-700 mb-2">
                                        <strong>Description:</strong> {r.description}
                                    </p>
                                    <p className="text-xs text-gray-500 mb-1">
                                        <strong>Date:</strong> {r.date}
                                    </p>
                                    <p
                                        className={`text-xs font-semibold ${r.status === "approved"
                                                ? "text-green-600"
                                                : "text-yellow-600"
                                            }`}
                                    >
                                        Status: {r.status}
                                    </p>
                                </div>

                                {r.image && (
                                    <img
                                        src={r.image}
                                        alt="Report"
                                        className="w-40 h-28 object-cover rounded-lg border shadow"
                                    />
                                )}

                                {/* Delete only for pending reports */}
                                {selectedView === "pending" && (
                                    <button
                                        onClick={() => handleDelete(r.id)}
                                        className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
