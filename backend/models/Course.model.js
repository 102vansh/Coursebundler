const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    
    lectures: [
{
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    video: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
}
    ],
    poster: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    views: {
        type: Number,
        default: 0,
    },
    numOfVideos: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
},{
    timestamps: true,});
module.exports = mongoose.model("Course", courseSchema);