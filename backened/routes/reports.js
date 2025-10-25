const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Report = require("../models/Report");
const User = require("../models/User");

// 🟢 User: Add new report
router.post("/add", fetchuser, async (req, res) => {
    try {
        const { caption, location } = req.body;

        const newReport = new Report({
            user: req.user.id,
            caption,
            location,
            status: "Pending"
        });

        const savedReport = await newReport.save();
        res.json(savedReport);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// 🟡 User: Get user's reports
router.get("/user", fetchuser, async (req, res) => {
    try {
        const reports = await Report.find({ user: req.user.id }).sort({ date: -1 });
        res.json(reports);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// 🔴 Admin: Get all reports
router.get("/all", fetchuser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== "admin") return res.status(403).json({ error: "Access denied" });

        const reports = await Report.find().populate("user", "name email");
        res.json(reports);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// 🟢 Admin: Update report status
router.put("/update/:id", fetchuser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== "admin") return res.status(403).json({ error: "Access denied" });

        const { status } = req.body;
        if (!["Pending", "Approved", "Rejected"].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        const report = await Report.findById(req.params.id);
        if (!report) return res.status(404).json({ error: "Report not found" });

        report.status = status;
        await report.save();

        res.json({ message: "Status updated successfully", report });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
