import React, { useState } from "react";
import Header from "./Header";
import StatsCard from "./StatsCard";
import SubmissionsTable from "./SubmissionsTable";

const AdminDashboard = ({ setCurrentScreen }) => {
    const [submissions] = useState([
        {
            id: 1,
            userId: "user123",
            image: "https://via.placeholder.com/300x200",
            caption: "Garbage dump near road",
            location: "Sector 15, Ghaziabad",
            status: "pending",
        },
        {
            id: 2,
            userId: "user456",
            image: "https://via.placeholder.com/300x200",
            caption: "Overflowing bin at market",
            location: "Delhi Market",
            status: "approved",
        },
    ]);

    return (
        <div>
            <Header title="Admin Dashboard" setCurrentScreen={setCurrentScreen} />
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard title="Total Submissions" value={submissions.length} color="blue" />
                <StatsCard
                    title="Approved Reports"
                    value={submissions.filter((s) => s.status === "approved").length}
                    color="green"
                />
                <StatsCard
                    title="Pending Reports"
                    value={submissions.filter((s) => s.status === "pending").length}
                    color="yellow"
                />
            </div>
            <div className="p-6">
                <SubmissionsTable submissions={submissions} />
            </div>
        </div>
    );
};

export default AdminDashboard;
