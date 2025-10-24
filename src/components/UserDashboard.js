import React, { useState } from "react";
import Header from "./Header";
import StatsCard from "./StatsCard";
import ReportForm from "./ReportForm";
import UserCamera from "./UserCamera";

const UserDashboard = ({ reports, onAddReport, setCurrentScreen }) => {
    const [capturedImage, setCapturedImage] = useState(null);

    const total = reports.length;
    const approved = reports.filter((r) => r.status === "approved").length;
    const pending = reports.filter((r) => r.status === "pending").length;

    const handleSubmitReport = (caption, location) => {
        const newReport = {
            userId: "user123",
            caption,
            location,
            image: capturedImage || "https://via.placeholder.com/300x200",
        };
        onAddReport(newReport);
        alert("✅ Report submitted successfully!");
        setCapturedImage(null);
    };

    return (
        <div>
            <Header title="User Dashboard" setCurrentScreen={setCurrentScreen} />

            {/* Stats */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard title="Total Reports" value={total} color="blue" />
                <StatsCard title="Approved" value={approved} color="green" />
                <StatsCard title="Pending" value={pending} color="yellow" />
            </div>

            {/* Camera + Form */}
            <div className="p-6 space-y-6">
                <UserCamera onCapture={setCapturedImage} />
                <ReportForm onSubmit={handleSubmitReport} />
            </div>
        </div>
    );
};

export default UserDashboard;
