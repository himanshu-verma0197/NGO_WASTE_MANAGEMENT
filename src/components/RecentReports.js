import React from "react";

const RecentReports = ({ submissions, onDelete }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
            {submissions.length === 0 ? (
                <div className="p-6 border rounded-lg bg-gray-100 text-center shadow-sm">
                    <p className="text-gray-500">No reports submitted yet.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {submissions.map((report) => (
                        <div
                            key={report.id}
                            className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white"
                        >
                            {/* Left: Report Image + Info */}
                            <div className="flex items-center space-x-4">
                                <img
                                    src={report.image}
                                    alt="Report"
                                    className="w-24 h-16 object-cover rounded"
                                />
                                <div>
                                    <p className="font-medium">{report.caption}</p>
                                    <p className="text-sm text-gray-500">{report.location}</p>
                                    <span
                                        className={`px-2 py-1 text-xs rounded ${report.status === "approved"
                                                ? "bg-green-200 text-green-800"
                                                : "bg-yellow-200 text-yellow-800"
                                            }`}
                                    >
                                        {report.status}
                                    </span>
                                </div>
                            </div>

                            {/* Right: Delete button */}
                            <button
                                onClick={() => onDelete(report.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecentReports;
