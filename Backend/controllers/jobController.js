// // controllers/jobController.js
// const Job = require("../models/Job");

// // Get all jobs
// exports.getJobs = async (req, res) => {
//   const jobs = await Job.find().sort({ lastDate: 1 });
//   res.json(jobs);
// };

// // Add a job
// exports.addJob = async (req, res) => {
//   const newJob = new Job(req.body);
//   const saved = await newJob.save();
//   res.status(201).json(saved);
// };

// // Delete job
// exports.deleteJob = async (req, res) => {
//   await Job.findByIdAndDelete(req.params.id);
//   res.json({ message: "Job deleted" });
// };

const Job = require("../models/Job");

const getJobs = async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
};

const addJob = async (req, res) => {
  const newJob = new Job(req.body);
  await newJob.save();
  res.json(newJob);
};

const deleteJob = async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);
  res.json(job);
};

const updateJob = async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json(job);
};

module.exports = {
  getJobs,
  addJob,
  deleteJob,
  updateJob
};
