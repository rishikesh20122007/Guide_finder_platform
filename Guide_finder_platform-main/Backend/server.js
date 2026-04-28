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

// ✅ Get all guides
app.get("/guides", async (req, res) => {
  try {
    const guides = await Guide.find();
    res.json(guides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Add new guide
app.post("/guides", async (req, res) => {
  try {
    const guide = new Guide(req.body);
    const savedGuide = await guide.save();
    res.status(201).json(savedGuide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ Booking Schema
const Booking = mongoose.model("Booking", {
  guide: String,
  user: String,
  date: String,
  time: String
});

// ✅ Booking API
app.post("/book", async (req, res) => {
  const { guide, date, time } = req.body;

  try {
    const exists = await Booking.findOne({ guide, date, time });

    if (exists) {
      return res.json({ message: "❌ Slot already booked!" });
    }

    const booking = new Booking(req.body);
    await booking.save();

    res.json({ message: "✅ Booking successful!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/guidefinder")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// ✅ Start server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});