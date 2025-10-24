import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 400,
    height: 300,
    facingMode: "user", // use "environment" for back camera on mobile
};

const UserCamera = ({ onCapture }) => {
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);

    // Capture from camera
    const handleUseCamera = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        if (onCapture) onCapture(imageSrc);
    };

    // Upload from device
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                if (onCapture) onCapture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-5 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Add a Photo</h2>

            {!image ? (
                <>
                    {/* Webcam Preview */}
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        className="rounded-lg shadow-md border border-gray-300"
                    />

                    <div className="flex space-x-4">
                        {/* Use Camera */}
                        <button
                            onClick={handleUseCamera}
                            className="bg-teal-600 text-white px-5 py-2 rounded-lg shadow hover:bg-teal-700 transition"
                        >
                            Use Camera
                        </button>

                        {/* Upload from Device */}
                        <label className="bg-amber-500 text-white px-5 py-2 rounded-lg cursor-pointer shadow hover:bg-amber-600 transition">
                            Upload from Device
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                        </label>
                    </div>
                </>
            ) : (
                <>
                    {/* Preview Image */}
                    <img
                        src={image}
                        alt="Selected"
                        className="rounded-lg shadow-lg w-[400px] h-[300px] object-cover border border-gray-300"
                    />

                    <button
                        onClick={() => {
                            setImage(null);
                            if (onCapture) onCapture(null);
                        }}
                        className="bg-rose-500 text-white px-5 py-2 rounded-lg hover:bg-rose-600 transition"
                    >
                        Retake / Choose Again
                    </button>
                </>
            )}
        </div>
    );
};

export default UserCamera;
