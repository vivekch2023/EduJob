import { useEffect, useState } from "react";
import axios from "axios";

export default function MCQAdminPanel() {
  const [courses, setCourses] = useState([]);
  const [tests, setTests] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedTest, setSelectedTest] = useState("");

  const [courseName, setCourseName] = useState("");
  const [testTitle, setTestTitle] = useState("");
  const [questionData, setQuestionData] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: "",
  });

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  // Fetch tests for selected course
  const fetchTests = async (courseId) => {
    if (!courseId) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/courses/${courseId}/tests`);
      setTests(res.data || []); // ✅ fixed
    } catch (err) {
      console.error("Error fetching tests:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchTests(selectedCourse);
    } else {
      setTests([]);
      setSelectedTest("");
    }
  }, [selectedCourse]);

  const handleAddCourse = async () => {
    if (!courseName.trim()) return alert("Enter a course name");
    try {
      await axios.post("http://localhost:5000/api/courses", { name: courseName });
      setCourseName("");
      fetchCourses();
      alert("✅ Course added");
    } catch (err) {
      console.error("Error adding course:", err);
      alert("❌ Failed to add course");
    }
  };

  const handleAddTest = async () => {
    if (!selectedCourse) return alert("Select a course first");
    if (!testTitle.trim()) return alert("Enter test title");
    try {
      await axios.post(`http://localhost:5000/api/courses/${selectedCourse}/tests`, {
        title: testTitle,
      });
      setTestTitle("");
      fetchTests(selectedCourse);
      alert("✅ Test added");
    } catch (err) {
      console.error("Error adding test:", err);
      alert("❌ Failed to add test");
    }
  };

  const handleAddQuestion = async () => {
    if (!selectedCourse || !selectedTest) return alert("Select both course and test");
    if (!questionData.question.trim()) return alert("Enter the question");
    if (questionData.options.some((o) => !o.trim())) return alert("Fill all options");
    if (!questionData.answer.trim()) return alert("Enter the correct answer");

    try {
      await axios.post(
        `http://localhost:5000/api/courses/${selectedCourse}/tests/${selectedTest}/questions`,
        questionData
      );
      setQuestionData({ question: "", options: ["", "", "", ""], answer: "" });
      alert("✅ Question added");
    } catch (err) {
      console.error("Error adding question:", err);
      alert("❌ Failed to add question");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-12">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        📘 MCQ Admin Panel
      </h1>

      {/* Step 1: Add Course */}
      <section className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">➕ Add Course</h2>
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="border px-4 py-2 rounded w-full mb-3"
        />
        <button
          onClick={handleAddCourse}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add Course
        </button>
      </section>

      {/* Step 2: Add Test */}
      {courses.length > 0 && (
        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">📚 Add Test</h2>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="border px-4 py-2 rounded w-full mb-3"
          >
            <option value="">-- Select Course --</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Test Title"
            value={testTitle}
            onChange={(e) => setTestTitle(e.target.value)}
            className="border px-4 py-2 rounded w-full mb-3"
          />
          <button
            onClick={handleAddTest}
            className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
            disabled={!selectedCourse}
          >
            Add Test
          </button>
        </section>
      )}

      {/* Step 3: Add Question */}
      {selectedCourse && tests.length > 0 && (
        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">❓ Add Question</h2>
          <select
            value={selectedTest}
            onChange={(e) => setSelectedTest(e.target.value)}
            className="border px-4 py-2 rounded w-full mb-3"
          >
            <option value="">-- Select Test --</option>
            {tests.map((t) => (
              <option key={t._id} value={t._id}>
                {t.title}
              </option>
            ))}
          </select>

          {selectedTest && (
            <>
              <input
                type="text"
                placeholder="Question"
                value={questionData.question}
                onChange={(e) =>
                  setQuestionData({ ...questionData, question: e.target.value })
                }
                className="border px-4 py-2 rounded w-full mb-3"
              />

              {questionData.options.map((opt, idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`Option ${idx + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [...questionData.options];
                    newOptions[idx] = e.target.value;
                    setQuestionData({ ...questionData, options: newOptions });
                  }}
                  className="border px-4 py-2 rounded w-full mb-2"
                />
              ))}

              <input
                type="text"
                placeholder="Correct Answer"
                value={questionData.answer}
                onChange={(e) =>
                  setQuestionData({ ...questionData, answer: e.target.value })
                }
                className="border px-4 py-2 rounded w-full mb-3"
              />

              <button
                onClick={handleAddQuestion}
                className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
              >
                Add Question
              </button>
            </>
          )}
        </section>
      )}
    </div>
  );
}
