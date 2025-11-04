// routes/auth.js
const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const router = express.Router();
const JWT_SECRET = "secretkey"; // change to process.env.JWT_SECRET in production

//-----------------------------------------------
// ROUTE 1: Create a new user (Signup) - POST /api/auth/createuser
//-----------------------------------------------
router.post(
    "/createuser",
    [
        body("name", "Enter a valid name").isLength({ min: 3 }),
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const { name, email, password, role } = req.body;

            // Check if user already exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ success: false, error: "User already exists" });
            }

            // Validate role
            const allowedRoles = ["user", "admin", "ngo"];
            const userRole = allowedRoles.includes(role) ? role : "user";

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(password, salt);

            // Create new user
            user = await User.create({
                name,
                email,
                password: secPass,
                role: userRole,
            });

            // Generate JWT Token
            const data = {
                user: {
                    id: user.id,
                    role: user.role,
                },
            };

            const authToken = jwt.sign(data, JWT_SECRET);

            res.json({
                success: true,
                authToken,
                role: user.role,
            });
        } catch (error) {
            console.error("Error in /createuser:", error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

//-----------------------------------------------
// ROUTE 2: Login existing user - POST /api/auth/login
//-----------------------------------------------
router.post(
    "/login",
    [
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password cannot be blank").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { email, password, role } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success: false, error: "Invalid credentials" });
            }

            // Check password
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success: false, error: "Invalid credentials" });
            }

            // Optional: match the role (if user selects wrong one)
            if (role && user.role !== role) {
                return res.status(403).json({
                    success: false,
                    error: `This account is registered as a '${user.role}'`,
                });
            }

            // Generate token
            const data = {
                user: {
                    id: user.id,
                    role: user.role,
                },
            };

            const authToken = jwt.sign(data, JWT_SECRET);

            res.json({
                success: true,
                authToken,
                role: user.role,
            });
        } catch (error) {
            console.error("Error in /login:", error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

//-----------------------------------------------
// ROUTE 3: Get logged-in user details - POST /api/auth/getuser
//-----------------------------------------------
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error("Error in /getuser:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
