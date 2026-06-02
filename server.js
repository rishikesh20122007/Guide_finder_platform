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
    aadhaar:String,
    role:String,
    location:String,

    languages:[String],

    verified:{
        type:Boolean,
        default:false
    },

    experience:{
        type:Number,
        default:0
    },

    rating:{
        type:Number,
        default:0
    },

    totalReviews:{
        type:Number,
        default:0
    }

});

const User = mongoose.model("User",UserSchema);


// =======================================
// BOOKING SCHEMA
// =======================================

const BookingSchema = new mongoose.Schema({

    guideId:String,

    guideName:String,

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

    amount:Number,

    status:{
        type:String,
        enum:[
            "Pending",
            "Approved",
            "Rejected",
            "Completed"
        ],
        default:"Pending"
    }

});





const ReviewSchema = new mongoose.Schema({

    guideId:String,

    touristName:String,

    rating:Number,

    review:String,

    createdAt:{
        type:Date,
        default:Date.now
    }

});

const Review =
mongoose.model("Review",ReviewSchema);

const NotificationSchema =
new mongoose.Schema({

    userId:String,

    message:String,

    isRead:{
        type:Boolean,
        default:false
    }

});

const Notification =
mongoose.model(
"Notification",
NotificationSchema
);

const Booking = mongoose.model("Booking",BookingSchema);
const GuideBooking =
mongoose.model(
"GuideBooking",
BookingSchema,
"guidebookings"
);
// =======================================
// FEEDBACK SCHEMA
// =======================================

const FeedbackSchema =
new mongoose.Schema({

    name:String,

    feedback:String,

    rating:Number

});

const Feedback =
mongoose.model(
"Feedback",
FeedbackSchema
);

app.post("/add-review",
async(req,res)=>{

try{

const {
guideId,
touristName,
rating,
review
} = req.body;

const newReview =
new Review({
guideId,
touristName,
rating,
review
});

await newReview.save();

res.json({
success:true
});

}

catch(err){

res.json({
success:false
});

}

});


app.get("/reviews/:guideId",
async(req,res)=>{

const reviews =
await Review.find({

guideId:
req.params.guideId

});

res.json(reviews);

});


app.put(
"/booking/:id/approve",
async(req,res)=>{

await Booking.findByIdAndUpdate(

req.params.id,

{
status:"Approved"
}

);

res.json({
success:true
});

});


app.put(
"/booking/:id/reject",
async(req,res)=>{

await Booking.findByIdAndUpdate(

req.params.id,

{
status:"Rejected"
}

);

res.json({
success:true
});

});


app.put(
"/booking/:id/complete",
async(req,res)=>{

await Booking.findByIdAndUpdate(

req.params.id,

{
status:"Completed"
}

);

res.json({
success:true
});

});


app.get(
"/guides/language/:language",

async(req,res)=>{

const guides =
await User.find({

role:"Guide",

languages:
req.params.language

});

res.json(guides);

});


app.put(
"/verify-guide/:id",

async(req,res)=>{

await User.findByIdAndUpdate(

req.params.id,

{
verified:true
}

);

res.json({
success:true
});

});





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
            aadhaar,
            role,
            location,
            languages
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
                aadhaar,
                role,
                location,
                languages
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
            guideId,
            guideName,
            placeName,
            totalMembers,
            members,
            date,
            time,
            bookedBy,
            amount
        } = req.body;

        const newBooking = new Booking({

            guideId,
            guideName,

            placeName,
            totalMembers,
            members,
            date,
            time,
            bookedBy,
            amount

        });

        await newBooking.save();

                const newGuideBooking =
                new GuideBooking({

                    guideId,
                    guideName,
                    placeName,
                    totalMembers,
                    members,
                    date,
                    time,
                    bookedBy,
                    amount

                });

                await newGuideBooking.save();

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
// SAVE FEEDBACK API
// =======================================

app.post(
"/feedback",
async(req,res)=>{

    try{

        const {

            name,
            feedback,
            rating

        } = req.body;

        const newFeedback =
        new Feedback({

            name,
            feedback,
            rating

        });

        await newFeedback.save();

        res.json({

            success:true,
            message:
            "Feedback Saved"

        });

    }

    catch(error){

        console.log(error);

        res.json({

            success:false,
            message:
            "Server Error"

        });

    }

});
// =======================================
// GET FEEDBACK API
// =======================================

app.get(
"/feedback",
async(req,res)=>{

    try{

        const feedbacks =
        await Feedback
        .find()
        .sort({
            rating:-1
        });

        res.json(
        feedbacks
        );

    }

    catch(error){

        console.log(error);

        res.json([]);

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