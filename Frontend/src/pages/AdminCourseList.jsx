import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, PlusCircle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import AddCourseModal from "../components/AddCourseModal";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/courses");
      // Ensure every course has free & premium arrays
      const safeCourses = res.data.map((course) => ({
        ...course,
        free: Array.isArray(course.free) ? course.free : [],
        premium: Array.isArray(course.premium) ? course.premium : [],
      }));
      setCourses(safeCourses);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await axios.delete(`http://localhost:5000/api/courses/${id}`);
    fetchCourses();
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BookOpen className="text-blue-500" /> Manage Courses
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <PlusCircle /> Add Course
        </button>
      </div>

      <table className="w-full bg-white rounded-lg shadow">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
          <tr>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Free PDFs</th>
            <th className="py-3 px-4 text-left">Premium PDFs</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c._id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">{c.name}</td>
              <td className="py-3 px-4">
                <Link to={`/admin/courses/${c._id}/free`} className="text-blue-500 underline">
                  {c.free?.length ?? 0} PDFs
                </Link>
              </td>
              <td className="py-3 px-4">
                <Link to={`/admin/courses/${c._id}/premium`} className="text-purple-500 underline">
                  {c.premium?.length ?? 0} PDFs
                </Link>
              </td>
              <td className="py-3 px-4 flex gap-2 justify-center">
                <button className="p-2 bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200">
                  <Pencil />
                </button>
                <button
                  onClick={() => deleteCourse(c._id)}
                  className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                >
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <AddCourseModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            fetchCourses();
          }}
        />
      )}
    </div>
  );
}
