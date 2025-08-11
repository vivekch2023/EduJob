// models/Job.js
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  company: String,
  title: String,
  applyLink: String,
  lastDate: String,
});

module.exports = mongoose.model("Job", jobSchema);
