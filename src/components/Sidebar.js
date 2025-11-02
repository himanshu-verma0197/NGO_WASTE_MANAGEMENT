// src/components/Sidebar.js
import React from "react";
import { LayoutDashboard, Camera, BarChart2, Users } from "lucide-react";

const Sidebar = () => {
    return (
        <aside className="w-64 bg-white shadow-xl border-r flex flex-col">
            <div className="px-6 py-5 border-b">
                <h2 className="text-2xl font-bold text-green-600">EcoReport</h2>
                <p className="text-xs text-gray-400">Waste Management</p>
            </div>

            <nav className="mt-6 flex-1 px-2 space-y-1">
                <NavItem icon={<LayoutDashboard />} label="Dashboard" />
                <NavItem icon={<Camera />} label="Reports" />
                <NavItem icon={<BarChart2 />} label="Analytics" />
                <NavItem icon={<Users />} label="NGOs" />
            </nav>

            <div className="p-4 border-t text-sm text-gray-500">© {new Date().getFullYear()} EcoReport</div>
        </aside>
    );
};

const NavItem = ({ icon, label }) => (
    <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-gray-700">
        <div className="text-lg">{icon}</div>
        <div>{label}</div>
    </div>
);

export default Sidebar;
