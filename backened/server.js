const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" })); // or 20mb if needed
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/reports", require("./routes/reports"));

// Default route
app.get("/", (req, res) => {
    res.send("🚮 Waste Management Backend Running Successfully!");
});

app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
