const SourceCode = require("../models/SourceCode");

// Get all source codes
exports.getAllSourceCodes = async (req, res) => {
  const codes = await SourceCode.find();
  res.json(codes);
};

// Get single source code by ID
exports.getSourceCodeById = async (req, res) => {
  const code = await SourceCode.findById(req.params.id);
  if (!code) return res.status(404).json({ error: "Not found" });
  res.json(code);
};

// Add new source code
exports.addSourceCode = async (req, res) => {
  const newCode = new SourceCode(req.body);
  const saved = await newCode.save();
  res.status(201).json(saved);
};

// Update source code
exports.updateSourceCode = async (req, res) => {
  const updated = await SourceCode.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// Delete source code
exports.deleteSourceCode = async (req, res) => {
  await SourceCode.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};
