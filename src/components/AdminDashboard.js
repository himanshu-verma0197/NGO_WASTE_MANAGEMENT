import React, { useEffect, useState, useCallback } from "react";
import { CheckCircle, Clock, LogOut, Leaf, Upload } from "lucide-react";
import Loader from "./Loader";
import ConfirmationModal from "./ConfirmationModal";
import toast from "react-hot-toast";

const AdminDashboard = ({ setCurrentScreen }) => {
    const [reports, setReports] = useState([]);
    const [selectedView, setSelectedView] = useState(null);
    const [loading, setLoading] = useState(false);
    const [logoutOpen, setLogoutOpen] = useState(false);
    const token = localStorage.getItem("token");

    // ✅ Fetch all reports
    const fetchReports = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:5000/api/reports/all", {
                headers: { "auth-token": token },
            });
            const data = await res.json();
            setReports(data);
        } catch (err) {
            toast.error("Error fetching reports");
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    // ✅ Approve report
    const handleApprove = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/reports/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
                body: JSON.stringify({ action: "approve" }),
            });
            if (res.ok) {
                toast.success("Report approved ✅");
                fetchReports();
            } else {
                toast.error("Failed to approve");
            }
        } catch (err) {
            toast.error("Error approving report");
        }
    };

    // ✅ Mark report completed (upload NGO completion image)
    const handleComplete = async (id, file) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/reports/update/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                    body: JSON.stringify({
                        action: "complete",
                        completedImage: reader.result,
                    }),
                });
                if (res.ok) {
                    toast.success("Report marked as completed 🎉");
                    fetchReports();
                } else toast.error("Failed to complete");
            } catch {
                toast.error("Upload failed");
            }
        };
        reader.readAsDataURL(file);
    };

    // ✅ Stats
    const total = reports.length;
    const pending = reports.filter(
        (r) => r.status === "Approved" && r.workStatus === "Pending"
    ).length;
    const inProgress = reports.filter((r) => r.workStatus === "In Progress").length;
    const completed = reports.filter((r) => r.workStatus === "Completed").length;

    // ✅ Filtered Reports
    const filteredReports =
        selectedView === "pending"
            ? reports.filter(
                (r) => r.status === "Approved" && r.workStatus === "Pending"
            )
            : selectedView === "inProgress"
                ? reports.filter((r) => r.workStatus === "In Progress")
                : selectedView === "completed"
                    ? reports.filter((r) => r.workStatus === "Completed")
                    : selectedView === "total"
                        ? reports
                        : [];

    // ✅ Reports to show by default (new unapproved)
    const defaultReports = reports.filter((r) => r.status === "Pending");

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
            {/* ✅ Logout confirmation */}
            <ConfirmationModal
                open={logoutOpen}
                title="Confirm Logout"
                message="Are you sure you want to logout?"
                onCancel={() => setLogoutOpen(false)}
                onConfirm={() => {
                    localStorage.clear();
                    setLogoutOpen(false);
                    toast.success("Logged out successfully");
                    setCurrentScreen("loginScreen");
                }}
            />

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <Leaf className="text-green-700 w-8 h-8" />
                    <h1 className="text-3xl font-bold text-green-800">
                        EcoClean Admin Dashboard
                    </h1>
                </div>
                <button
                    onClick={() => setLogoutOpen(true)}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow-md transition"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>

            {/* ✅ Loader */}
            {loading ? (
                <Loader />
            ) : (
                <>
                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
                        <StatCard
                            label="Total Reports"
                            value={total}
                            color="blue"
                            icon={<Leaf />}
                            onClick={() => setSelectedView("total")}
                        />
                        <StatCard
                            label="Pending"
                            value={pending}
                            color="yellow"
                            icon={<Clock />}
                            onClick={() => setSelectedView("pending")}
                        />
                        <StatCard
                            label="In Progress"
                            value={inProgress}
                            color="orange"
                            icon={<Clock />}
                            onClick={() => setSelectedView("inProgress")}
                        />
                        <StatCard
                            label="Completed"
                            value={completed}
                            color="green"
                            icon={<CheckCircle />}
                            onClick={() => setSelectedView("completed")}
                        />
                    </div>

                    {/* Report Section */}
                    {selectedView ? (
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-green-800">
                                    {selectedView === "total"
                                        ? "All Reports"
                                        : selectedView === "pending"
                                            ? "Pending Reports"
                                            : selectedView === "inProgress"
                                                ? "In Progress Reports"
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
                                <p className="text-gray-500 text-center py-8">
                                    No reports found 🌱
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {filteredReports.map((report) => (
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
                                                    className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${report.workStatus === "Completed"
                                                            ? "bg-green-200 text-green-700"
                                                            : report.workStatus === "In Progress"
                                                                ? "bg-yellow-200 text-yellow-700"
                                                                : "bg-blue-200 text-blue-700"
                                                        }`}
                                                >
                                                    {report.status} → {report.workStatus || "Pending"}
                                                </span>
                                            </div>

                                            {/* Report Image */}
                                            {report.image && (
                                                <img
                                                    src={report.image}
                                                    alt="Report"
                                                    className="w-32 h-24 rounded-lg border shadow mt-4 md:mt-0"
                                                />
                                            )}

                                            {/* Actions */}
                                            {selectedView === "pending" && (
                                                <button
                                                    onClick={() => handleApprove(report._id)}
                                                    className="mt-4 md:mt-0 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
                                                >
                                                    Approve
                                                </button>
                                            )}

                                            {selectedView === "inProgress" && (
                                                <label className="mt-4 md:mt-0 bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 transition flex items-center gap-2 cursor-pointer">
                                                    <Upload className="w-4 h-4" /> Upload Completion
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) =>
                                                            handleComplete(report._id, e.target.files[0])
                                                        }
                                                    />
                                                </label>
                                            )}

                                            {report.workStatus === "Completed" &&
                                                report.completedImage && (
                                                    <img
                                                        src={report.completedImage}
                                                        alt="Completed"
                                                        className="w-32 h-24 rounded-lg border shadow mt-4 md:mt-0"
                                                    />
                                                )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        // ✅ Default: Show new (unapproved) reports
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-semibold text-green-800 mb-4">
                                New Reports Awaiting Approval
                            </h2>
                            {defaultReports.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">
                                    No new reports pending approval 🌿
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {defaultReports.map((report) => (
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
                                            </div>

                                            {report.image && (
                                                <img
                                                    src={report.image}
                                                    alt="Report"
                                                    className="w-32 h-24 rounded-lg border shadow mt-4 md:mt-0"
                                                />
                                            )}

                                            <button
                                                onClick={() => handleApprove(report._id)}
                                                className="mt-4 md:mt-0 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
                                            >
                                                Approve
                                            </button>
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
                © {new Date().getFullYear()} EcoClean | NGO Admin Portal 🌿
            </div>
        </div>
    );
};

// ✅ StatCard
const StatCard = ({ label, value, color, icon, onClick }) => (
    <div
        onClick={onClick}
        className={`cursor-pointer bg-white shadow-md rounded-2xl p-6 flex items-center justify-between border-l-4 border-${color}-500 hover:bg-${color}-50 transition`}
    >
        <div>
            <h3 className="text-gray-600 font-semibold">{label}</h3>
            <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
        </div>
        <div className={`text-${color}-500 w-10 h-10 opacity-70`}>{icon}</div>
    </div>
);

export default AdminDashboard;
