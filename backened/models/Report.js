const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    caption: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    image: {
        type: String, // store Base64 image data here directly
        required: false,
    },
    status: {
        type: String,
        default: "Pending",
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("report", ReportSchema);
