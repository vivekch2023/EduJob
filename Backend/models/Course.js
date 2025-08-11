// models/Course.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true },
});

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [questionSchema],
});

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tests: [testSchema],
});

module.exports = mongoose.model("Course", courseSchema);
