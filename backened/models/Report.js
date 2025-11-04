const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
    caption: { type: String, required: true },
    location: { type: String },
    image: { type: String }, // original user image
    status: {
        type: String,
        enum: ["Pending", "Approved"],
        default: "Pending",
    },
    workStatus: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending",
    },
    completedImage: {
        type: String,
        default: "",
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // the admin/NGO who approved
        default: null,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("report", ReportSchema);
