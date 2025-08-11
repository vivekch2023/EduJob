// const express = require("express");
// const router = express.Router();
// const { getCourses, getCourseById, addCourse } = require("../controllers/pdfController");

// router.get("/pdfs", getCourses);
// router.get("/pdfs/:id", getCourseById);
// router.post("/pdfs", addCourse); // For adding data manually

// module.exports = router;



const express = require("express");
const router = express.Router();
const {
  getCourses,
  getCourseById,
  getFreePdfs,
  getPremiumPdfs,
  addCourse,
} = require("../controllers/pdfController");

router.get("/pdfs", getCourses);                     // all courses
router.get("/pdfs/:id", getCourseById);              // one course
router.get("/pdfs/:id/free", getFreePdfs);           // only free PDFs
router.get("/pdfs/:id/premium", getPremiumPdfs);     // only premium PDFs
router.post("/pdfs", addCourse);                     // add new course

module.exports = router;
