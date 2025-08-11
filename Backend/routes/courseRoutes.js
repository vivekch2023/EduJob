const express = require("express");
const router = express.Router();
const controller = require("../controllers/courseController");

// --- COURSE ROUTES ---
router.post("/courses", controller.createCourse);
router.get("/courses", controller.getCourses);
router.get("/courses/:courseId", controller.getCourseById); // ✅ changed to :courseId
router.put("/courses/:courseId", controller.updateCourse);
router.delete("/courses/:courseId", controller.deleteCourse);

// --- TEST ROUTES ---
router.post("/courses/:courseId/tests", controller.addTest);
router.get("/courses/:courseId/tests", controller.getTests);
router.put("/courses/:courseId/tests/:testId", controller.updateTest);
router.delete("/courses/:courseId/tests/:testId", controller.deleteTest);

// --- QUESTION ROUTES ---
router.post("/courses/:courseId/tests/:testId/questions", controller.addQuestion);
router.get("/courses/:courseId/tests/:testId/questions", controller.getQuestions);
router.put("/courses/:courseId/tests/:testId/questions/:questionId", controller.updateQuestion);
router.delete("/courses/:courseId/tests/:testId/questions/:questionId", controller.deleteQuestion);


module.exports = router;
