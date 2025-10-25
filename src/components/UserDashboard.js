import React, { useEffect, useState } from "react";
import UserCamera from "./UserCamera";
import StatsCard from "./StatsCard";

const UserDashboard = ({ setCurrentScreen }) => {
    // ✅ Initialize reports as an empty array to prevent .length crash
    const [reports, setReports] = useState([]);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [selectedView, setSelectedView] = useState(null);
    const token = localStorage.getItem("token");

    // ✅ Fetch all reports for logged-in user
    const fetchReports = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/reports/user", {
                headers: { "auth-token": token },
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                setReports(data);
            } else {
                console.error("Unexpected response:", data);
                setReports([]);
            }
        } catch (error) {
            console.error("Failed to fetch reports:", error);
            setReports([]);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    // ✅ Submit a new report
    const handleSubmit = async () => {
        if (!description) {
            alert("Please add a description!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/reports/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
                body: JSON.stringify({
                    caption: description,
                    location: "User Report Location", // You can replace with GPS or input field
                }),
            });

            const newReport = await response.json();
            if (newReport && newReport._id) {
                setReports([...reports, newReport]);
                setDescription("");
                setImage(null);
                alert("✅ Report submitted successfully!");
            } else {
                alert("❌ Failed to submit report");
            }
        } catch (error) {
            console.error("Error submitting report:", error);
        }
    };

    // ✅ Delete report locally (you can add backend delete later)
    const handleDelete = (id) => {
        const updated = reports.filter((r) => r._id !== id);
        setReports(updated);
    };

    // ✅ Calculate stats safely
    const total = reports?.length || 0;
    const pending = reports?.filter((r) => r.status === "Pending").length || 0;
    const approved = reports?.filter((r) => r.status === "Approved").length || 0;

    // ✅ Filter reports for list view
    const filteredReports =
        selectedView === "pending"
            ? reports.filter((r) => r.status === "Pending")
            : selectedView === "approved"
                ? reports.filter((r) => r.status === "Approved")
                : selectedView === "total"
                    ? reports
                    : [];

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">User Dashboard</h1>
                <button
                    onClick={() => {
                        localStorage.clear();
                        setCurrentScreen("login");
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                    Logout
                </button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4">
                <div onClick={() => setSelectedView("total")} className="cursor-pointer">
                    <StatsCard title="Total Reports" value={total} color="blue" />
                </div>
                <div
                    onClick={() => setSelectedView("pending")}
                    className="cursor-pointer"
                >
                    <StatsCard title="Pending Reports" value={pending} color="yellow" />
                </div>
                <div
                    onClick={() => setSelectedView("approved")}
                    className="cursor-pointer"
                >
                    <StatsCard title="Approved Reports" value={approved} color="green" />
                </div>
            </div>

            {/* Submit or View Reports */}
            {!selectedView ? (
                // 📝 Submit Report Section
                <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                    <h2 className="font-semibold text-lg text-gray-800">
                        Submit a New Report
                    </h2>
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
                <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
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
                                key={r._id}
                                className="border p-4 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between space-y-3 md:space-y-0 md:space-x-6"
                            >
                                <div className="flex-1">
                                    <p className="text-sm text-gray-700 mb-2">
                                        <strong>Description:</strong> {r.caption}
                                    </p>
                                    <p className="text-xs text-gray-500 mb-1">
                                        <strong>Date:</strong>{" "}
                                        {new Date(r.date).toLocaleString()}
                                    </p>
                                    <p
                                        className={`text-xs font-semibold ${r.status === "Approved"
                                                ? "text-green-600"
                                                : "text-yellow-600"
                                            }`}
                                    >
                                        Status: {r.status}
                                    </p>
                                </div>

                                {/* Optional photo preview */}
                                {r.image && (
                                    <img
                                        src={r.image}
                                        alt="Report"
                                        className="w-40 h-28 object-cover rounded-lg border shadow"
                                    />
                                )}

                                {/* Delete pending reports */}
                                {selectedView === "pending" && (
                                    <button
                                        onClick={() => handleDelete(r._id)}
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
