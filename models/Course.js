import mongoose from 'mongoose';

// Quiz schema for each video
const quizSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true }
});

// Video schema
const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },   // Cloudinary URL
    duration: { type: String },
    quizzes: [quizSchema]  // optional quiz
});

// Updated Course schema
const CourseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    duration: { type: String },
    videos: [videoSchema],  // array of videos
    createdAt: { type: Date, default: Date.now }
});

const Course = mongoose.model("Course", CourseSchema);
export default Course;
