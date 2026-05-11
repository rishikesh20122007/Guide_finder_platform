const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const bodyParser = require("body-parser");

const User = require("./models/User");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(express.static("Frontend"));

// MONGODB CONNECTION

mongoose.connect("mongodb://127.0.0.1:27017/guidefinder")

.then(() => {
    console.log("MongoDB Connected");
})

.catch((err) => {
    console.log(err);
});
// REGISTER
app.post("/register", async(req,res)=>{
    try{
        const {
            name,
            email,
            password,
            role,
            location
        } = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.json({
                success:false,
                message:"User Already Exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            role,
            location
        });
        await newUser.save();
        res.json({
            success:true,
            message:"Registration Successful"
        });
    }
    catch(error){
        res.json({
            success:false,
            message:"Server Error"
        });
    }
});
// LOGIN
app.post("/login", async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                success:false,
                message:"User Not Found"
            });
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({
                success:false,
                message:"Wrong Password"
            });
        }
        res.json({
            success:true,
            message:"Login Successful",
            user:user
        });
    }
    catch(error){
        res.json({
            success:false,
            message:"Server Error"
        });
    }
});
// FETCH GUIDES

app.get("/guides/:location", async(req,res)=>{
    const location = req.params.location;
    const guides = await User.find({
        role:"guide",
        location:location
    });
    res.json(guides);
});

app.listen(5000,()=>{

    console.log("Server Running On Port 5000");

});