import express from "express";
import Course from "../models/Course.js";
import { upload } from "../cloudinary.js"; // multer storage

const router = express.Router();

// ---------------- Courses Routes ----------------

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses); // return empty [] if none
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Get course by id
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Add new course
router.post("/add", async (req, res) => {
  try {
    const { name, description, duration } = req.body;
    const newCourse = new Course({ name, description, duration });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (e) {
    res.status(500).json({ message: "Error creating course", error: e.message });
  }
});

// Update course
router.put("/:id", async (req, res) => {
  try {
    const { name, duration, description } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { name, duration, description },
      { new: true }
    );
    if (!updatedCourse) return res.status(404).json({ message: "Course not found" });
    res.json(updatedCourse);
  } catch (e) {
    res.status(500).json({ message: "Error updating course", error: e.message });
  }
});

// ---------------- Videos Routes ----------------

// Get all videos of a course
router.get("/:courseid/videos", async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseid);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course.videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Upload video to a course
router.post("/:courseid/addvideo", upload.single("video"), async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseid);
    if (!course) return res.status(404).json({ message: "Course not found" });
  console.log("Body received:", req.body);
  console.log("req.headers['content-type']:", req.headers['content-type']);
  console.log("File received:", req.file); // should NOT be undefined now
    const newVideo = {
      title: req.body.title,
    url: req.file?.path || req.file?.secure_url,
      duration: req.body.duration,
      quizzes: req.body.quizzes ? JSON.parse(req.body.quizzes) : [] // must match schema
    };

    course.videos.push(newVideo);
    await course.save();

    res.status(200).json({ message: "Video uploaded successfully", video: newVideo });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
