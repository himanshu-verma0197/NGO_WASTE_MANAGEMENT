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

    // 📸 Capture photo
    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);

        // send image to parent (UserDashboard)
        if (onCapture) {
            onCapture(imageSrc);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4 p-4">
            {!image ? (
                <>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        className="rounded-lg shadow-lg"
                    />
                    <button
                        onClick={capture}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Capture Photo
                    </button>
                </>
            ) : (
                <>
                    <img src={image} alt="Captured" className="rounded-lg shadow-lg" />
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setImage(null)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                        >
                            Retake
                        </button>
                        <button
                            onClick={() => alert("📤 Sent to NGO (connect API here)")}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        >
                            Send
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserCamera;
