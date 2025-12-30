import mongoose from 'mongoose';

let courseSchema = new mongoose.Schema({
    courseCode:{
        type: String,
        unique: true,
        required: true
    },
    courseName:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    duration:{
        type: Number,
        required: true
    }
})

export default courseSchema = mongoose.model('Course', courseSchema);