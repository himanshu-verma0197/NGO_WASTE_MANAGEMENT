import React from "react";

const Loader = ({ size = 48 }) => {
    const style = { width: size, height: size };
    return (
        <div className="flex items-center justify-center">
            <svg style={style} viewBox="0 0 50 50" className="animate-spin">
                <circle cx="25" cy="25" r="20" strokeWidth="5" stroke="#d1fae5" fill="none" />
                <path d="M49 25a24 24 0 0 1-24 24" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" fill="none" />
            </svg>
        </div>
    );
};

export default Loader;
