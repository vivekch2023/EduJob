import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('data/questions.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load JSON');
        return res.json();
      })
      .then(data => {
        // Access the nested "courses" array inside the JSON
        if (data.courses && Array.isArray(data.courses)) {
          setCourses(data.courses);
        } else {
          console.error('Invalid JSON structure: missing "courses" array');
        }
      })
      .catch(err => console.error('Failed to fetch courses:', err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-slate-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-indigo-800 mb-10 tracking-tight">
        📚 Choose a Course to Start MCQs
      </h1>

      {courses.length === 0 ? (
        <p className="text-center text-slate-500 text-lg">No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <Link
              key={course._id || i}
              to={`/mcq/${course._id || i}`}
              className="group bg-white border border-slate-200 rounded-2xl shadow-sm p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 ease-in-out"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-indigo-100 text-indigo-700 rounded-full">
                  <AcademicCapIcon className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800 group-hover:text-indigo-700">
                  {course.name}
                </h2>
              </div>

              <p className="text-sm text-slate-500 mt-1">🔍 Explore tests for this course</p>

              <div className="mt-4">
                <span className="inline-block bg-gradient-to-r from-indigo-500 to-emerald-500 text-white text-sm font-medium px-4 py-2 rounded-full shadow hover:opacity-90 transition">
                  View Tests →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
