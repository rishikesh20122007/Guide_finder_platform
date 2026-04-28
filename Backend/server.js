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

<<<<<<< HEAD
// Get all guides
=======
// Guides Route
>>>>>>> a7c299abe72d9d85a77bb8a0295d4516d3711fea
app.get("/guides", async (req, res) => {
  try {
    const guides = await Guide.find();
    res.json(guides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

<<<<<<< HEAD
// Add new guide
=======
// ✅ ADD THIS HERE 👇
>>>>>>> a7c299abe72d9d85a77bb8a0295d4516d3711fea
app.post("/guides", async (req, res) => {
  try {
    const guide = new Guide(req.body);
    const savedGuide = await guide.save();
    res.status(201).json(savedGuide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/guidefinder")
<<<<<<< HEAD
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
=======
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const Guide = require("./models/Guide");

app.get("/guides", async (req,res)=>{

try{

const guides = await Guide.find();

res.json(guides);

}catch(error){

res.status(500).json({error:error.message})

}

>>>>>>> a7c299abe72d9d85a77bb8a0295d4516d3711fea
});