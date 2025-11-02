const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user", // default role for normal users
    },
});

module.exports = mongoose.model("user", UserSchema);
