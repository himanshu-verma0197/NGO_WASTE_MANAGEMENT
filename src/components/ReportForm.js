import React, { useState } from "react";

const ReportForm = ({ onSubmit }) => {
    const [caption, setCaption] = useState("");
    const [location, setLocation] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (caption && location) {
            onSubmit(caption, location);
            setCaption("");
            setLocation("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Submit Waste Report</h2>
            <input
                type="text"
                placeholder="Enter caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full p-3 border rounded-lg mb-4"
            />
            <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 border rounded-lg mb-4"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
            >
                Submit Report
            </button>
        </form>
    );
};

export default ReportForm;
