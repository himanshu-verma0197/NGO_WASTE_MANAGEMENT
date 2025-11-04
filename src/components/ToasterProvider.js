import React from "react";
import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
    return (
        <Toaster
            position="top-right"
            gutter={8}
            toastOptions={{
                // Default options
                duration: 4000,
                style: {
                    borderRadius: '10px',
                    background: '#fff',
                    color: '#0f172a',
                    boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)',
                },
            }}
        />
    );
};

export default ToasterProvider;
