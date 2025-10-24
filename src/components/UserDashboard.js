import React, { useState } from "react";
import UserCamera from "./UserCamera";
import StatsCard from "./StatsCard";

const UserDashboard = ({ reports, onAddReport, setCurrentScreen }) => {
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = () => {
        if (!description || !image) {
            alert("Please add a description and a photo!");
            return;
        }
        const newReport = {
            description,
            image,
            date: new Date().toLocaleString(),
        };
        onAddReport(newReport);
        setDescription("");
        setImage(null);
        alert("✅ Report submitted!");
    };

    const total = reports.length;
    const pending = reports.filter((r) => r.status === "pending").length;
    const approved = reports.filter((r) => r.status === "approved").length;

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">User Dashboard</h1>
            <div className="grid grid-cols-3 gap-4">
                <StatsCard title="Total Reports" value={total} color="blue" />
                <StatsCard title="Pending Reports" value={pending} color="yellow" />
                <StatsCard title="Approved Reports" value={approved} color="green" />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
                <h2 className="font-semibold">Submit a New Report</h2>
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
        </div>
    );
};

export default UserDashboard;
