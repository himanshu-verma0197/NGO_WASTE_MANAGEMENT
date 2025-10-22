import React, { useState, useRef } from "react";
import Header from "./Header";
import StatsCard from "./StatsCard";
import ReportForm from "./ReportForm";
import RecentReports from "./RecentReports";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 400,
    height: 300,
    facingMode: "user", // use "environment" for back camera on mobile
};

const UserDashboard = ({ currentUser, setCurrentScreen }) => {
    const [submissions, setSubmissions] = useState([
        {
            id: 1,
            userId: "currentUser",
            image: "https://via.placeholder.com/300x200",
            caption: "Plastic bottles scattered in park area",
            location: "Central Park, Delhi",
            status: "pending",
        },
    ]);

    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);

    // 📸 Capture from camera
    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
    };

    // 📂 Upload from gallery/files
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCapturedImage(reader.result); // Base64 string
            };
            reader.readAsDataURL(file);
        }
    };

    // 📝 Submit report
    const handleSubmit = (caption, location) => {
        const newReport = {
            id: submissions.length + 1,
            userId: currentUser,
            image: capturedImage || "https://via.placeholder.com/300x200",
            caption,
            location,
            status: "pending",
        };
        setSubmissions([newReport, ...submissions]);
        setCapturedImage(null); // reset image after submit
    };

    // ❌ Delete report
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this report?")) {
            setSubmissions(submissions.filter((report) => report.id !== id));
        }
    };

    return (
        <div>
            <Header title="User Dashboard" setCurrentScreen={setCurrentScreen} />

            {/* Stats */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard title="Reports Submitted" value={submissions.length} color="blue" />
                <StatsCard
                    title="Reports Approved"
                    value={submissions.filter((s) => s.status === "approved").length}
                    color="green"
                />
                <StatsCard
                    title="Pending Reports"
                    value={submissions.filter((s) => s.status === "pending").length}
                    color="yellow"
                />
            </div>

            {/* Camera + Upload + Report Form + Recent Reports */}
            <div className="p-6 space-y-6">
                {!capturedImage ? (
                    <div className="flex flex-col items-center space-y-4">
                        {/* Webcam preview */}
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            className="rounded-lg shadow-lg"
                        />
                        <div className="flex space-x-4">
                            <button
                                onClick={capture}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Capture Photo
                            </button>

                            {/* File upload */}
                            <label className="bg-gray-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700">
                                Upload from Gallery
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center space-y-4">
                        <img
                            src={capturedImage}
                            alt="Captured"
                            className="rounded-lg shadow-lg w-[400px] h-[300px] object-cover"
                        />
                        <button
                            onClick={() => setCapturedImage(null)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                        >
                            Retake / Choose Again
                        </button>
                    </div>
                )}

                {/* Report Form */}
                <ReportForm onSubmit={handleSubmit} />

                {/* Recent Reports with delete option */}
                <RecentReports submissions={submissions} onDelete={handleDelete} />
            </div>
        </div>
    );
};

export default UserDashboard;
