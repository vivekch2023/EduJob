// controllers/courseController.js
const mongoose = require("mongoose");
const Course = require("../models/PDF"); // keep your model path

// GET all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    // ensure safe shape for frontend
    const safe = courses.map((c) => ({
      ...c.toObject(),
      free: Array.isArray(c.free) ? c.free : [],
      premium: Array.isArray(c.premium) ? c.premium : [],
    }));
    res.json(safe);
  } catch (err) {
    console.error("getCourses error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET one course by ID
const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId || req.params.id;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    const safe = {
      ...course.toObject(),
      free: Array.isArray(course.free) ? course.free : [],
      premium: Array.isArray(course.premium) ? course.premium : [],
    };

    res.json(safe);
  } catch (err) {
    console.error("getCourseById error:", err);
    res.status(500).json({ error: "Invalid ID or server error" });
  }
};

// GET free PDFs only
const getFreePdfs = async (req, res) => {
  try {
    const courseId = req.params.courseId || req.params.id;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    res.json(Array.isArray(course.free) ? course.free : []);
  } catch (err) {
    console.error("getFreePdfs error:", err);
    res.status(500).json({ error: "Invalid ID or server error" });
  }
};

// GET premium PDFs only
const getPremiumPdfs = async (req, res) => {
  try {
    const courseId = req.params.courseId || req.params.id;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    res.json(Array.isArray(course.premium) ? course.premium : []);
  } catch (err) {
    console.error("getPremiumPdfs error:", err);
    res.status(500).json({ error: "Invalid ID or server error" });
  }
};

// POST add course manually
const addCourse = async (req, res) => {
  try {
    const { name, free = [], premium = [] } = req.body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "Course name is required" });
    }

    const newCourse = new Course({
      name: name.trim(),
      free: Array.isArray(free) ? free : [],
      premium: Array.isArray(premium) ? premium : [],
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error("addCourse error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  getFreePdfs,
  getPremiumPdfs,
  addCourse,
};
