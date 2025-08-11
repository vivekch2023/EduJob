const mongoose = require("mongoose");

const sourceCodeSchema = new mongoose.Schema({
  title: String,
  language: String,
  description: String,
  downloadLink: String,
}, { timestamps: true });

module.exports = mongoose.model("SourceCode", sourceCodeSchema);
