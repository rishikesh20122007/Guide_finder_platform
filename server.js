require("dotenv").config();

console.log(process.env.MONGO_URI);

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

app.use(express.urlencoded({
    extended: true
}));

app.use(cors());

app.use(express.static(
    path.join(__dirname, "Frontend")
));


// =======================================
// MONGODB CONNECTION
// =======================================

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

    mobile:String,

    password:String,

    role:String,

    location:String

});

const User = mongoose.model("User",UserSchema);


// =======================================
// BOOKING SCHEMA
// =======================================

const BookingSchema = new mongoose.Schema({

    placeName:String,

    totalMembers:Number,

    members:[

        {
            name:String,
            whatsapp:String
        }

    ],

    date:String,

    time:String,

    bookedBy:String,

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
                mobile,
                password,
                role,
                location

            } = req.body;


        // CHECK EXISTING USER

        const existingUser = await User.findOne({
    $or: [
        { email: email },
        { mobile: mobile }
    ]
});

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
                mobile,
                password: hashedPassword,
                aadhar,
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

      const { loginInput, password } = req.body;
      console.log(loginInput);


        // FIND USER

         const user = await User.findOne({
            $or: [
                { email: loginInput.trim() },
                { mobile: loginInput.trim() }
            ]
        });
        console.log("User Found:", user);

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
        console.log(user);

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

        const {

            placeName,
            totalMembers,
            members,
            date,
            time,
            bookedBy

        } = req.body;

        const newBooking = new Booking({

            placeName,
            totalMembers,
            members,
            date,
            time,
            bookedBy

        });

        await newBooking.save();

        res.json({

            success:true,
            message:"✅ Booking Successful"

        });

    }

    catch(error){

        console.log(error);

        res.json({

            success:false,
            message:"❌ Server Error"

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