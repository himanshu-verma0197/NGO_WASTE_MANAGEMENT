const jwt = require("jsonwebtoken");
const JWT_SECRET = "secretkey"; // must match auth.js

const fetchuser = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).json({ error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user; // includes id + role
        next();
    } catch (error) {
        res.status(401).json({ error: "Please authenticate using a valid token" });
    }
};

module.exports = fetchuser;
