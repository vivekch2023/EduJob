const mongoose = require("mongoose");
const Course = require("../models/Course");

// --- COURSE ---
exports.createCourse = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Course name is required" });

    const course = new Course({ name });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.courseId,
      req.body,
      { new: true }
    );
    if (!updatedCourse) return res.status(404).json({ message: "Course not found" });
    res.json(updatedCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.courseId);
    if (!deleted) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- TEST ---
exports.addTest = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Test title is required" });

    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Only push title — MongoDB will auto-generate _id
    course.tests.push({ title });
    await course.save();
    res.status(201).json(course.tests[course.tests.length - 1]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTests = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json(course.tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTest = async (req, res) => {
  try {
    const { title } = req.body;
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const test = course.tests.id(req.params.testId);
    if (!test) return res.status(404).json({ message: "Test not found" });

    test.title = title || test.title;
    await course.save();
    res.json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTest = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const test = course.tests.id(req.params.testId);
    if (!test) return res.status(404).json({ message: "Test not found" });

    test.remove();
    await course.save();
    res.json({ message: "Test deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- QUESTION ---
exports.addQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer } = req.body;
    if (!question || !options || !correctAnswer) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const test = course.tests.id(req.params.testId);
    if (!test) return res.status(404).json({ message: "Test not found" });

    // Only push question data — MongoDB will auto-generate _id
    test.questions.push({ question, options, correctAnswer });
    await course.save();
    res.status(201).json(test.questions[test.questions.length - 1]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const test = course.tests.id(req.params.testId);
    if (!test) return res.status(404).json({ message: "Test not found" });

    res.json(test.questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer } = req.body;
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const test = course.tests.id(req.params.testId);
    if (!test) return res.status(404).json({ message: "Test not found" });

    const ques = test.questions.id(req.params.questionId);
    if (!ques) return res.status(404).json({ message: "Question not found" });

    ques.question = question || ques.question;
    ques.options = options || ques.options;
    ques.correctAnswer = correctAnswer || ques.correctAnswer;
    await course.save();
    res.json(ques);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const test = course.tests.id(req.params.testId);
    if (!test) return res.status(404).json({ message: "Test not found" });

    const ques = test.questions.id(req.params.questionId);
    if (!ques) return res.status(404).json({ message: "Question not found" });

    ques.remove();
    await course.save();
    res.json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
