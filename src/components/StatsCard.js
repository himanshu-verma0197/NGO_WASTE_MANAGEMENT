import React from "react";

const StatsCard = ({ title, value, color }) => (
    <div className={`bg-${color}-100 p-6 rounded-xl shadow-md`}>
        <h2 className="text-sm font-medium text-gray-500">{title}</h2>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
);

export default StatsCard;
