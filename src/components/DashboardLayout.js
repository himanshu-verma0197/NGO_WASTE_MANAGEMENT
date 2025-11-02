// src/components/DashboardLayout.js
import React from "react";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";

const DashboardLayout = ({ title, children, onLogout }) => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 p-8 bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <div>
                        <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg">Logout</button>
                    </div>
                </div>
                {children}
            </motion.main>
        </div>
    );
};

export default DashboardLayout;
