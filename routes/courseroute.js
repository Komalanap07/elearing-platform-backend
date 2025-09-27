import mongoose from "mongoose";
import express, { Router } from "express";
import Course from "../models/Course.js";
const router = Router();

//get allcourses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    if (!courses) return res.status(400).json({ message: "Course not found" });
    res.status(201).json(courses);
  } catch (e) {
    console.log("error");
    res.status(500).json({ message: e.message });
  }
});

//get course by id
router.get("/:id", async (req, res) => {
  try {
    const course = await findById(req.params.id);
    if (!course) return res.status(400).json({ message: "Course not found" });
    res.json(course);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { name, description, duration } = req.body;
    const newcourse = new Course({
      name,
      description,
      duration,
    });
    await newcourse.save();
    res.status(201).json(newcourse);
  } catch (e) {
    return res.status(501).json({ message: "error creating course", e });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, duration, description } = req.body;
    const updatecourse = await Course.findByIdAndUpdate(
      req.params.id,
      { name, duration, description },
      { new: true }
    );
    if (!updatecourse) res.status(404).json({ message: "course not found" });
    res.json(updatecourse);
  } catch (e) {
    res.status(500).json({ message: "Error updating course", error });
  }
});
export default router;
