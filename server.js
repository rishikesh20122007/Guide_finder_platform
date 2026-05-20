const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const path = require("path");

const app = express();


// =======================================
// MIDDLEWARE
// =======================================

app.use(express.json());

app.use(express.urlencoded({ extended:true }));

app.use(cors());

app.use(express.static(path.join(__dirname,"Frontend")));


// =======================================
// MONGODB CONNECTION
// =======================================

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)

.then(() => {

    console.log("MongoDB Connected");

})

.catch((err) => {

    console.log(err);

});


// =======================================
// USER SCHEMA
// =======================================

const UserSchema = new mongoose.Schema({

    name:String,

    email:String,

    password:String,

    role:String,

    location:String

});

const User = mongoose.model("User",UserSchema);


// =======================================
// BOOKING SCHEMA
// =======================================

const BookingSchema = new mongoose.Schema({

    touristName:String,

    guideName:String,

    date:String,

    time:String,

    status:{
        type:String,
        default:"Pending"
    }

});

const Booking = mongoose.model("Booking",BookingSchema);


// =======================================
// HOME ROUTE
// =======================================

app.get("/",(req,res)=>{

    res.sendFile(path.join(__dirname,"Frontend","index.html"));

});


// =======================================
// REGISTER API
// =======================================

app.post("/register", async(req,res)=>{

    try{

        console.log(req.body);

        const {

            name,
            email,
            password,
            role,
            location

        } = req.body;


        // CHECK EXISTING USER

        const existingUser = await User.findOne({ email });

        if(existingUser){

            return res.json({

                success:false,
                message:"User already exists"

            });

        }


        // HASH PASSWORD

        const hashedPassword =
        await bcrypt.hash(password,10);


        // CREATE USER

        const newUser = new User({

            name,
            email,
            password:hashedPassword,
            role,
            location

        });


        // SAVE USER

        await newUser.save();

        console.log("User Saved");


        res.json({

            success:true,
            message:"Registration Successful"

        });

    }

    catch(error){

        console.log(error);

        res.json({

            success:false,
            message:"Server Error"

        });

    }

});


// =======================================
// LOGIN API
// =======================================

app.post("/login", async(req,res)=>{

    try{

        const {

            email,
            password

        } = req.body;


        // FIND USER

        const user = await User.findOne({ email });

        if(!user){

            return res.json({

                success:false,
                message:"User Not Found"

            });

        }


        // CHECK PASSWORD

        const isMatch =
        await bcrypt.compare(password,user.password);


        if(!isMatch){

            return res.json({

                success:false,
                message:"Wrong Password"

            });

        }


        // LOGIN SUCCESS

        res.json({

            success:true,
            message:"Login Successful",
            user:user

        });

    }

    catch(error){

        console.log(error);

        res.json({

            success:false,
            message:"Server Error"

        });

    }

});


// =======================================
// BOOK GUIDE API
// =======================================

app.post("/book-guide", async(req,res)=>{

    try{

        console.log(req.body);

        const {

            touristName,
            guideName,
            date,
            time

        } = req.body;


        // CREATE BOOKING

        const newBooking = new Booking({

            touristName,
            guideName,
            date,
            time

        });


        // SAVE BOOKING

        await newBooking.save();

        console.log("Booking Saved");


        res.json({

            success:true,
            message:"Booking Successful"

        });

    }

    catch(error){

        console.log(error);

        res.json({

            success:false,
            message:"Server Error"

        });

    }

});


// =======================================
// GET ALL GUIDES
// =======================================

app.get("/guides", async(req,res)=>{

    try{

        const guides = await User.find({

            role:"Guide"

        });

        res.json(guides);

    }

    catch(error){

        console.log(error);

        res.json([]);

    }

});


// =======================================
// GET ALL BOOKINGS
// =======================================

app.get("/bookings", async(req,res)=>{

    try{

        const bookings =
        await Booking.find();

        res.json(bookings);

    }

    catch(error){

        console.log(error);

        res.json([]);

    }

});


// =======================================
// START SERVER
// =======================================

const PORT = 5000;

app.listen(PORT,()=>{

    console.log(`Server Running On Port ${PORT}`);

});