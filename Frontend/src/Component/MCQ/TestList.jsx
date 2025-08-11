// import { useParams, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { BookOpenIcon } from "@heroicons/react/24/outline";

// const TestList = () => {
//   const { courseId } = useParams(); // ✅ courseId from URL
//   const [tests, setTests] = useState([]);
//   const [courseName, setCourseName] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     console.log("Fetching course with ID:", courseId);

//     fetch(`http://localhost:5000/api/courses/${courseId}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch");
//         return res.json();
//       })
//       .then((data) => {
//         console.log("API response:", data);

//         // ✅ Deduplicate tests by _id if necessary
//         const uniqueTests = [];
//         const seen = new Set();
//         for (const test of data.tests || []) {
//           if (!seen.has(test._id)) {
//             seen.add(test._id);
//             uniqueTests.push(test);
//           }
//         }

//         setTests(uniqueTests);
//         setCourseName(data.name || "Unnamed Course");
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching tests:", error);
//         setError("Failed to load course data.");
//         setLoading(false);
//       });
//   }, [courseId]);

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12 bg-slate-50 min-h-screen">
//       <h1 className="text-4xl font-bold text-center text-emerald-700 mb-12">
//         {loading ? "Loading..." : `🧠 Tests in ${courseName}`}
//       </h1>

//       {loading ? (
//         <p className="text-center text-gray-500">Please wait...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : tests.length === 0 ? (
//         <p className="text-center text-slate-500 text-lg">
//           No tests available.
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {tests.map((test, index) => (
//             <Link
//               // ✅ Pass courseId along with testId in URL
//               to={`/course/${courseId}/test/${test._id}`}
//               key={test._id || `test-${index}-${Math.random()}`}
//               className="group block bg-white border border-slate-200 rounded-2xl shadow-md p-6 hover:shadow-lg hover:scale-[1.015] transition-all duration-200 ease-in-out"
//             >
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="p-2 bg-emerald-100 text-emerald-700 rounded-full">
//                   <BookOpenIcon className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <h2 className="text-lg font-semibold text-slate-800 group-hover:text-emerald-700">
//                     {test.title}
//                   </h2>
//                   <p className="text-sm text-slate-500 mt-1">
//                     {test.questions?.length || 0} Questions • ~5 mins
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <span className="inline-block bg-gradient-to-r from-emerald-500 to-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-full shadow-md hover:opacity-90 transition">
//                   Start Test →
//                 </span>
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TestList;

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BookOpenIcon } from "@heroicons/react/24/outline";

const TestList = () => {
  const { courseId } = useParams();
  const [tests, setTests] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/data/questions.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load JSON");
        return res.json();
      })
      .then((data) => {
        if (!data.courses || !Array.isArray(data.courses)) {
          throw new Error("Invalid JSON format: 'courses' must be an array");
        }

        let course;

        // Agar courseId number hai → index ke hisaab se lo
        if (!isNaN(courseId)) {
          const index = parseInt(courseId, 10) - 1; // 1-based index
          course = data.courses[index];
        } else {
          // Warna string match karo
          course = data.courses.find((c) => c.id === courseId);
        }

        if (!course) {
          setError("Course not found");
        } else {
          setCourseName(course.name);
          setTests(course.tests || []);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [courseId]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-slate-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-12">
        {loading ? "Loading..." : `🧠 Tests in ${courseName}`}
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Please wait...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : tests.length === 0 ? (
        <p className="text-center text-slate-500 text-lg">No tests available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tests.map((test) => (
            <Link
              to={`/course/${courseId}/test/${test.id}`}
              key={test.id}
              className="group block bg-white border border-slate-200 rounded-2xl shadow-md p-6 hover:shadow-lg hover:scale-[1.015] transition-all duration-200 ease-in-out"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-full">
                  <BookOpenIcon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800 group-hover:text-emerald-700">
                    {test.title}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    {test.questions?.length || 0} Questions • ~5 mins
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <span className="inline-block bg-gradient-to-r from-emerald-500 to-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-full shadow-md hover:opacity-90 transition">
                  Start Test →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestList;
