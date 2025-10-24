import React from "react";
import Header from "./Header";
import StatsCard from "./StatsCard";
import SubmissionsTable from "./SubmissionsTable";

const AdminDashboard = ({ reports, onApprove, setCurrentScreen }) => {
    const total = reports.length;
    const approved = reports.filter((r) => r.status === "approved").length;
    const pending = reports.filter((r) => r.status === "pending").length;

    return (
        <div>
            <Header title="Admin Dashboard" setCurrentScreen={setCurrentScreen} />

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard title="Total Reports" value={total} color="blue" />
                <StatsCard title="Approved Reports" value={approved} color="green" />
                <StatsCard title="Pending Reports" value={pending} color="yellow" />
            </div>

            <div className="p-6">
                <SubmissionsTable submissions={reports} onApprove={onApprove} />
            </div>
        </div>
    );
};

export default AdminDashboard;
