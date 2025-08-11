
const express = require("express");
const router = express.Router();
const {
  getJobs,
  addJob,
  deleteJob,
  updateJob, // ← Add this
} = require("../controllers/jobController");

router.get("/", getJobs);
router.post("/", addJob);
router.put("/:id", updateJob);   // ✅ ADD THIS LINE
router.delete("/:id", deleteJob);

module.exports = router;
