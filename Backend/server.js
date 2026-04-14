const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Import Guide Model
const Guide = require("./models/Guide");

// Home route
app.get("/", (req, res) => {
  res.send("Guide Finder Backend Running");
});

// Guides Route
app.get("/guides", async (req, res) => {
  try {
    const guides = await Guide.find();
    res.json(guides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/guidefinder")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});