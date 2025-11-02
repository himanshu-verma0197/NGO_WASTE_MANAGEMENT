const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
    data: {
        type: String, // base64 image data
        required: true,
    },
    contentType: {
        type: String,
        default: "image/png",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("media", MediaSchema);
