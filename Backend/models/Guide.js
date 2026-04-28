const mongoose = require("mongoose");

const GuideSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
<<<<<<< HEAD
=======

>>>>>>> a7c299abe72d9d85a77bb8a0295d4516d3711fea
    location: {
        type: String,
        required: true
    },

    languages: {
        type: [String],
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    rating: {
        type: Number,
        default: 0
    },

    description: {
        type: String
    },

    availability: {
        type: Boolean,
        default: true
    },

    photo: {
        type: String
    }

});

module.exports = mongoose.model("Guide", GuideSchema);