import React, { useEffect, useState, useCallback } from "react";
import UserCamera from "./UserCamera";
import { Leaf, Trash2, LogOut } from "lucide-react";
import Loader from "./Loader";
import toast from "react-hot-toast";
import ConfirmationModal from "./ConfirmationModal";
import BeforeAfter from "./BeforeAfter";

const UserDashboard = ({ setCurrentScreen }) => {
    const [reports, setReports] = useState([]);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [selectedView, setSelectedView] = useState(null);
    const [loading, setLoading] = useState(false);
    const [logoutOpen, setLogoutOpen] = useState(false);
    const token = localStorage.getItem("token");

    // ✅ Fetch reports of this user
    const fetchReports = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:5000/api/reports/user", {
                headers: { "auth-token": token },
            });
            const data = await res.json();
            if (Array.isArray(data)) setReports(data);
            else setReports([]);
        } catch (err) {
            toast.error("Error fetching reports");
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (token) fetchReports();
    }, [fetchReports, token]);

    // ✅ Submit new report
    const handleSubmit = async () => {
        if (!description.trim()) {
            toast.error("Please add a description!");
            return;
        }

        if (!image) {
            toast.error("Please capture or upload an image first!");
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
                    location: "User Report Location",
                    image,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || "Failed to submit report");
                return;
            }

            setReports((prev) => [data, ...prev]);
            setDescription("");
            setImage(null);
            toast.success("Report submitted successfully ✅");
        } catch (error) {
            toast.error("Something went wrong while submitting");
        }
    };

    // ✅ Delete report locally
    const handleDelete = (id) => {
        const updated = reports.filter((r) => r._id !== id);
        setReports(updated);
        toast.success("Report deleted locally");
    };

    // ✅ Stats
    const total = reports.length;
    const pending = reports.filter((r) => r.status === "Pending").length;
    const inProgress = reports.filter((r) => r.workStatus === "In Progress").length;
    const completed = reports.filter((r) => r.workStatus === "Completed").length;

    // ✅ Filter view logic
    const filteredReports =
        selectedView === "pending"
            ? reports.filter((r) => r.status === "Pending")
            : selectedView === "inProgress"
                ? reports.filter((r) => r.workStatus === "In Progress")
                : selectedView === "completed"
                    ? reports.filter((r) => r.workStatus === "Completed")
                    : selectedView === "total"
                        ? reports
                        : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
            {/* ✅ Logout Modal */}
            <ConfirmationModal
                open={logoutOpen}
                title="Confirm Logout"
                message="Are you sure you want to logout?"
                onCancel={() => setLogoutOpen(false)}
                onConfirm={() => {
                    localStorage.clear();
                    toast.success("Logged out successfully");
                    setLogoutOpen(false);
                    setCurrentScreen("loginScreen");
                }}
            />

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <Leaf className="text-green-700 w-8 h-8" />
                    <h1 className="text-3xl font-bold text-green-800">
                        EcoClean User Dashboard
                    </h1>
                </div>
                <button
                    onClick={() => setLogoutOpen(true)}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow-md transition"
                >
                    <LogOut className="w-4 h-4" /> Logout
                </button>
            </div>

            {/* ✅ Loader while fetching */}
            {loading ? (
                <Loader />
            ) : (
                <>
                    {/* Stats Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
                        <StatCard
                            label="Total Reports"
                            count={total}
                            color="blue"
                            onClick={() => setSelectedView("total")}
                        />
                        <StatCard
                            label="Pending"
                            count={pending}
                            color="yellow"
                            onClick={() => setSelectedView("pending")}
                        />
                        <StatCard
                            label="In Progress"
                            count={inProgress}
                            color="orange"
                            onClick={() => setSelectedView("inProgress")}
                        />
                        <StatCard
                            label="Completed"
                            count={completed}
                            color="green"
                            onClick={() => setSelectedView("completed")}
                        />
                    </div>

                    {/* Submit or View Reports */}
                    {!selectedView ? (
                        <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6 border border-green-100">
                            <h2 className="font-semibold text-2xl text-green-800">
                                🗑️ Submit a New Cleanliness Report
                            </h2>
                            <p className="text-sm text-gray-600">
                                Help us keep your area clean! Describe the issue and attach a photo.
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
                                            : selectedView === "inProgress"
                                                ? "Reports In Progress"
                                                : "Completed Reports"}
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
                                    No reports found 🌱
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {filteredReports.map((r) => (
                                        <div
                                            key={r._id}
                                            className="border border-gray-200 bg-green-50 hover:bg-green-100 transition rounded-xl p-5 shadow-sm"
                                        >
                                            <p className="text-gray-800 mb-2">
                                                <strong>Description:</strong> {r.caption}
                                            </p>
                                            <p className="text-xs text-gray-600 mb-3">
                                                <strong>Date:</strong>{" "}
                                                {new Date(r.date).toLocaleString()}
                                            </p>

                                            {/* ✅ Only show Before/After in Completed view */}
                                            {selectedView === "completed" && (
                                                <BeforeAfter before={r.image} after={r.completedImage} />
                                            )}

                                            <span
                                                className={`inline-block mt-4 px-3 py-1 text-xs font-semibold rounded-full ${r.workStatus === "Completed"
                                                        ? "bg-green-200 text-green-700"
                                                        : r.workStatus === "In Progress"
                                                            ? "bg-yellow-200 text-yellow-700"
                                                            : "bg-blue-200 text-blue-700"
                                                    }`}
                                            >
                                                {r.status} → {r.workStatus || "Pending"}
                                            </span>

                                            {selectedView === "pending" && (
                                                <button
                                                    onClick={() => handleDelete(r._id)}
                                                    className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition mt-4"
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
                </>
            )}

            {/* Footer */}
            <div className="mt-10 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} EcoClean | Together for a cleaner city 🌿
            </div>
        </div>
    );
};

// 🌿 Simple reusable stat card
const StatCard = ({ label, count, color, onClick }) => (
    <div
        onClick={onClick}
        className={`cursor-pointer bg-white shadow-md rounded-2xl p-6 flex items-center justify-between border-l-4 border-${color}-500 hover:bg-${color}-50 transition`}
    >
        <div>
            <h3 className="text-gray-600 font-semibold">{label}</h3>
            <p className={`text-3xl font-bold text-${color}-600`}>{count}</p>
        </div>
        <Trash2 className={`text-${color}-500 w-10 h-10 opacity-70`} />
    </div>
);

export default UserDashboard;
