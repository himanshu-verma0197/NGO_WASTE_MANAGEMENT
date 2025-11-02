const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Report = require("../models/Report");

// ✅ Add a new report (only for users)
router.post("/add", fetchuser, async (req, res) => {
    try {
        if (req.user.role === "admin") {
            return res.status(403).json({ error: "Admins cannot submit reports" });
        }

        console.log("📩 Incoming Body:", req.body); // <-- Add this
        const { caption, location, image } = req.body;

        const report = new Report({
            user: req.user.id,
            caption,
            location,
            image, // store image directly here
            status: "Pending",
        });

        const savedReport = await report.save();
        res.json(savedReport);
    } catch (error) {
        console.error("Error saving report:", error);
        res.status(500).send("Internal Server Error");
    }
});

// ✅ Get all reports (Admin only)
router.get("/all", fetchuser, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "Access denied: Admins only" });
        }

        const reports = await Report.find()
            .populate("user", "name email")
            .sort({ date: -1 });

        res.json(reports);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ✅ Get all reports of logged-in user
router.get("/user", fetchuser, async (req, res) => {
    try {
        const reports = await Report.find({ user: req.user.id }).sort({ date: -1 });
        res.json(reports);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ✅ Update report status (Admin only)
router.put("/update/:id", fetchuser, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "Access denied: Admins only" });
        }

        const { status } = req.body;
        const updatedReport = await Report.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(updatedReport);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
