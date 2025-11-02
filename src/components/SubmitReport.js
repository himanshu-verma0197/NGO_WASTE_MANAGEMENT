import React, { useState } from "react";
import UserCamera from "./UserCamera";

const SubmitReport = () => {
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const token = localStorage.getItem("token");

    const handleSubmit = async () => {
        if (!description) return alert("Please enter a description.");

        let latitude = null;
        let longitude = null;
        let location = "";

        // 🛰️ Try to get GPS
        try {
            const pos = await new Promise((resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 5000,
                })
            );
            latitude = pos.coords.latitude;
            longitude = pos.coords.longitude;
            location = `Lat: ${latitude.toFixed(3)}, Lng: ${longitude.toFixed(3)}`;
        } catch {
            location = "Location not available";
        }

        // 📦 Prepare FormData
        const formData = new FormData();
        formData.append("caption", description);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("location", location);
        if (image) formData.append("image", image);

        try {
            const res = await fetch("http://localhost:5000/api/reports/add", {
                method: "POST",
                headers: { "auth-token": token },
                body: formData,
            });

            const data = await res.json();
            if (data && data._id) {
                alert("✅ Report submitted successfully!");
                setDescription("");
                setImage(null);
            } else {
                alert("❌ Failed to submit report.");
            }
        } catch (err) {
            console.error(err);
            alert("⚠️ Server error while submitting report.");
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="font-semibold text-lg text-gray-800">Submit New Report</h2>

            <textarea
                className="w-full border p-2 rounded"
                placeholder="Describe the issue..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            {/* 📸 Capture or upload photo */}
            <UserCamera onCapture={setImage} />

            <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
                Submit Report
            </button>
        </div>
    );
};

export default SubmitReport;
