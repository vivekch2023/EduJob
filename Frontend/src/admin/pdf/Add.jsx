import { useEffect, useState } from "react";
import axios from "axios";
import {  Trash2 } from "lucide-react";

export default function AdminPdfPanel() {
  const [activeTab, setActiveTab] = useState("course");
  const [courses, setCourses] = useState([]);
  const [courseForm, setCourseForm] = useState({ id: "", name: "" });
  const [selectedCourse, setSelectedCourse] = useState("");
  const [freePdf, setFreePdf] = useState({ title: "", url: "" });
  const [premiumPdf, setPremiumPdf] = useState({ title: "", url: "", price: "" });
  const [popup, setPopup] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/pdfs");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  const showPopup = (message) => {
    setPopup(message);
    setTimeout(() => setPopup(""), 3000);
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/pdfs", courseForm);
      fetchCourses();
      showPopup("Course added successfully!");
      setCourseForm({ id: "", name: "" });
    } catch (err) {
      console.error("Error adding course:", err);
    }
  };

  const handlePdfSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/pdfs/${selectedCourse}`, {
        free: [freePdf],
        premium: [premiumPdf],
      });
      fetchCourses();
      showPopup("PDFs added successfully!");
      setFreePdf({ title: "", url: "" });
      setPremiumPdf({ title: "", url: "", price: "" });
    } catch (err) {
      console.error("Error adding PDFs:", err);
    }
  };

  const handleDelete = async (courseId, type, pdfId) => {
    try {
      await axios.delete(`http://localhost:5000/api/pdfs/${courseId}/${type}/${pdfId}`);
      fetchCourses();
      showPopup("PDF deleted successfully!");
    } catch (err) {
      console.error("Error deleting PDF:", err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Panel - Manage PDFs</h1>

      <div className="flex justify-center mb-6 gap-4">
        <button onClick={() => setActiveTab("course")} className="px-4 py-2 bg-indigo-600 text-white rounded">Add Course</button>
        <button onClick={() => setActiveTab("pdf")} className="px-4 py-2 bg-purple-600 text-white rounded">Add PDFs</button>
        <button onClick={() => setActiveTab("view")} className="px-4 py-2 bg-teal-600 text-white rounded">View Courses</button>
      </div>

      {popup && <div className="text-center mb-4 text-green-600 font-semibold">{popup}</div>}

      {/* Add Course Section */}
      {activeTab === "course" && (
        <form onSubmit={handleCourseSubmit} className="space-y-4 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
          <input
            type="text"
            placeholder="Course ID"
            value={courseForm.id}
            onChange={(e) => setCourseForm({ ...courseForm, id: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Course Name"
            value={courseForm.name}
            onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Add Course</button>
        </form>
      )}

      {/* Add PDFs Section */}
      {activeTab === "pdf" && (
        <form onSubmit={handlePdfSubmit} className="space-y-4 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Add Free & Premium PDFs</h2>

          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>{course.name}</option>
            ))}
          </select>

          <div>
            <h3 className="font-bold">Free PDF</h3>
            <input
              type="text"
              placeholder="Free PDF Title"
              value={freePdf.title}
              onChange={(e) => setFreePdf({ ...freePdf, title: e.target.value })}
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Free PDF URL"
              value={freePdf.url}
              onChange={(e) => setFreePdf({ ...freePdf, url: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <h3 className="font-bold">Premium PDF</h3>
            <input
              type="text"
              placeholder="Premium PDF Title"
              value={premiumPdf.title}
              onChange={(e) => setPremiumPdf({ ...premiumPdf, title: e.target.value })}
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Premium PDF URL"
              value={premiumPdf.url}
              onChange={(e) => setPremiumPdf({ ...premiumPdf, url: e.target.value })}
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="number"
              placeholder="Price"
              value={premiumPdf.price}
              onChange={(e) => setPremiumPdf({ ...premiumPdf, price: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>

          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">Add PDFs</button>
        </form>
      )}

      {/* View Courses Section */}
      {activeTab === "view" && (
        <div className="space-y-6">
          {courses.map((course) => (
            <div key={course._id} className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">{course.name} ({course.id})</h2>

              <div className="mb-4">
                <h3 className="font-bold text-gray-700">Free PDFs</h3>
                {course.free?.map((pdf) => (
                  <div key={pdf._id} className="flex items-center justify-between border p-2 rounded my-1">
                    <span>{pdf.title}</span>
                    <button onClick={() => handleDelete(course._id, "free", pdf._id)}>
                      <Trash2 className="text-red-500" size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-bold text-gray-700">Premium PDFs</h3>
                {course.premium?.map((pdf) => (
                  <div key={pdf._id} className="flex items-center justify-between border p-2 rounded my-1">
                    <span>{pdf.title} - ₹{pdf.price}</span>
                    <button onClick={() => handleDelete(course._id, "premium", pdf._id)}>
                      <Trash2 className="text-red-500" size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
