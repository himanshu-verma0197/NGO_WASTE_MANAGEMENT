import React from "react";

const SubmissionsTable = ({ submissions }) => (
    <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">All Submissions</h2>
        <table className="w-full border">
            <thead>
                <tr className="bg-gray-100 text-left">
                    <th className="p-2">User</th>
                    <th className="p-2">Caption</th>
                    <th className="p-2">Location</th>
                    <th className="p-2">Status</th>
                </tr>
            </thead>
            <tbody>
                {submissions.map((report) => (
                    <tr key={report.id} className="border-t">
                        <td className="p-2">{report.userId}</td>
                        <td className="p-2">{report.caption}</td>
                        <td className="p-2">{report.location}</td>
                        <td className="p-2">{report.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default SubmissionsTable;
