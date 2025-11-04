import React from "react";
import { motion } from "framer-motion";

const Backdrop = ({ children, onClose }) => (
    <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
        {children}
    </div>
);

const ConfirmationModal = ({ open, title, message, onConfirm, onCancel }) => {
    if (!open) return null;
    return (
        <Backdrop onClose={onCancel}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md"
            >
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-sm text-gray-600 mb-6">{message}</p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                    >
                        Confirm
                    </button>
                </div>
            </motion.div>
        </Backdrop>
    );
};

export default ConfirmationModal;
