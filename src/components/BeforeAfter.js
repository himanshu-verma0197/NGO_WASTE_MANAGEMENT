import React from "react";

const BeforeAfter = ({ before, after }) => {
    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
                <h4 className="text-sm text-gray-600 mb-2">Before</h4>
                {before ? (
                    <img src={before} alt="Before" className="w-full h-60 object-cover rounded-lg border" />
                ) : (
                    <div className="w-full h-60 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                        No image
                    </div>
                )}
            </div>

            <div className="flex-1">
                <h4 className="text-sm text-gray-600 mb-2">After</h4>
                {after ? (
                    <img src={after} alt="After" className="w-full h-60 object-cover rounded-lg border" />
                ) : (
                    <div className="w-full h-60 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                        Not completed yet
                    </div>
                )}
            </div>
        </div>
    );
};

export default BeforeAfter;
