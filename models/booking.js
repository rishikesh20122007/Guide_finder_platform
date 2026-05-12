const mongoose = require("mongoose");

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

module.exports = mongoose.model("Booking", BookingSchema);