const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'ThisIsTheWasteManagementApp';

// 🟢 ROUTE 1: Register user/admin
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "User with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            role: req.body.role || 'user'
        });

        const data = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ success: true, authtoken, role: user.role });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// 🟡 ROUTE 2: Login user
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success, error: "Invalid credentials" });

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) return res.status(400).json({ success, error: "Invalid credentials" });

        const data = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken, role: user.role });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// 🔵 ROUTE 3: Get logged-in user details
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
