const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const User = require("../models/User");

const JWT_SECRET = "secretkey";

// ✅ Create User
router.post("/createuser", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ success: false, error: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        user = await User.create({
            name,
            email,
            password: secPass,
            role: role || "user",
        });

        const data = {
            user: { id: user.id, role: user.role },
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ success: true, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ✅ Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, error: "Invalid credentials" });

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare)
            return res.status(400).json({ success: false, error: "Invalid credentials" });

        const data = {
            user: { id: user.id, role: user.role },
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ success: true, authToken, role: user.role });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ✅ Get User Details
router.get("/getuser", fetchuser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
