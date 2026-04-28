const mongoose = require("mongoose");

const GuideSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

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