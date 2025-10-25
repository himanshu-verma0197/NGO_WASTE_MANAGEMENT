const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReportSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("report", ReportSchema);
