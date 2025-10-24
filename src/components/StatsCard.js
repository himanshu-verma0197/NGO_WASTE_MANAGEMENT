import React from "react";

const colorClasses = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    red: "bg-red-100 text-red-800",
    gray: "bg-gray-100 text-gray-800",
};

const StatsCard = ({ title, value, color = "gray" }) => {
    const colorClass = colorClasses[color] || colorClasses.gray;
    return (
        <div className={`p-6 rounded-xl shadow-md ${colorClass}`}>
            <h2 className="text-sm font-medium text-gray-600">{title}</h2>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
};

export default StatsCard;
