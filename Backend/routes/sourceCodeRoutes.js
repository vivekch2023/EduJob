const express = require("express");
const router = express.Router();
const {
  getAllSourceCodes,
  getSourceCodeById,
  addSourceCode,
  updateSourceCode,
  deleteSourceCode,
} = require("../controllers/sourceCodeController");

// Get all source codes
router.get("/", getAllSourceCodes);

// Get a single source code by ID
router.get("/:id", getSourceCodeById);

// Create a new source code
router.post("/", addSourceCode);

// Update an existing source code by ID
router.put("/:id", updateSourceCode);

// Delete a source code by ID
router.delete("/:id", deleteSourceCode);

module.exports = router;
