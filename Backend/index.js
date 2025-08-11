const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pdfRoutes = require("./routes/pdfRoutes");
const sourceCodeRoutes = require("./routes/sourceCodeRoutes");
const jobRoutes = require("./routes/jobRoutes");
const courseRoutes = require('./routes/courseRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", pdfRoutes);
app.use('/api', courseRoutes);
app.use("/api/source-codes", sourceCodeRoutes);
app.use("/api/jobs", jobRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(process.env.PORT, () =>
      console.log(`Server running at http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection failed ❌", err));
