const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/wastemanagement"; // ✅ Change DB name

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("✅ Connected to Mongo Successfully!");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectToMongo;
