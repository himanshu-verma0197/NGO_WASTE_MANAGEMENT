const express = require("express");
const Report = require("../models/Report");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();

// 📍 Get reports for Admin (NGO)
router.get("/all", fetchuser, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "Access denied" });
        }

        const adminId = req.user.id;
        const reports = await Report.find({
            $or: [
                { status: "Pending" }, // unapproved reports
                { approvedBy: adminId }, // reports approved by this admin
            ],
        })
            .populate("user", "name email")
            .sort({ date: -1 });

        res.json(reports);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});

// 🧾 Get reports for User
router.get("/user", fetchuser, async (req, res) => {
    try {
        const reports = await Report.find({ user: req.user.id }).sort({ date: -1 });
        res.json(reports);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});

// ✍️ User adds a report
router.post("/add", fetchuser, async (req, res) => {
    try {
        const { caption, location, image } = req.body;
        const report = new Report({
            caption,
            location,
            image,
            user: req.user.id,
        });
        const saved = await report.save();
        res.json(saved);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});

// ✅ Admin (NGO) updates a report (Approve / Work Status / Completed Image)
router.put("/update/:id", fetchuser, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "Access denied" });
        }

        const { action, completedImage } = req.body;
        const update = {};

        if (action === "approve") {
            update.status = "Approved";
            update.workStatus = "In Progress";
            update.approvedBy = req.user.id;
        } else if (action === "complete") {
            update.workStatus = "Completed";
            if (completedImage) update.completedImage = completedImage;
        }

        const updatedReport = await Report.findByIdAndUpdate(
            req.params.id,
            { $set: update },
            { new: true }
        );

        res.json(updatedReport);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
