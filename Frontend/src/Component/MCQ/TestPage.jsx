// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// const TestPage = () => {
//   const { courseId, testId } = useParams();
//   const [questions, setQuestions] = useState([]);
//   const [testTitle, setTestTitle] = useState("");
//   const [answers, setAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [score, setScore] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:5000/api/courses/${courseId}/tests/${testId}/questions`
//         );
//         const data = await res.json();

//         if (!res.ok) {
//           throw new Error(data.message || "Failed to fetch questions");
//         }

//         setQuestions(data.questions || []);
//         setTestTitle(data.testTitle || "Untitled Test");
//       } catch (err) {
//         console.error("Fetch Error:", err.message);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, [courseId, testId]);

//   useEffect(() => {
//     if (loading || submitted) return;

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleSubmit();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [loading, submitted]);

//   const formatTime = (sec) => {
//     const min = Math.floor(sec / 60);
//     const secRemain = sec % 60;
//     return `${min.toString().padStart(2, "0")}:${secRemain
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   const handleAnswerChange = (qIdx, option) => {
//     if (!submitted) {
//       setAnswers((prev) => ({ ...prev, [qIdx]: option }));
//     }
//   };

//   const handleSubmit = () => {
//     let correct = 0;
//     questions.forEach((q, idx) => {
//       if (answers[idx] === q.answer) correct++;
//     });
//     setScore(correct);
//     setSubmitted(true);
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10 bg-slate-50 min-h-screen">
//       {loading ? (
//         <p className="text-center text-gray-500 text-lg">⏳ Loading test...</p>
//       ) : error ? (
//         <p className="text-center text-red-600 text-lg">{error}</p>
//       ) : (
//         <>
//           <div className="flex justify-between items-center mb-8">
//             <h1 className="text-3xl font-bold text-indigo-700">{testTitle}</h1>
//             {!submitted && (
//               <div className="text-xl font-semibold bg-yellow-200 text-yellow-800 px-4 py-1 rounded-full shadow-inner">
//                 ⏳ {formatTime(timeLeft)}
//               </div>
//             )}
//           </div>

//           {questions.length === 0 ? (
//             <p className="text-red-500">❌ No questions available for this test.</p>
//           ) : (
//             questions.map((q, idx) => (
//               <div
//                 key={q._id}
//                 className="mb-6 p-6 border border-gray-200 bg-white rounded-xl shadow hover:shadow-md transition"
//               >
//                 <p className="font-bold text-gray-800 mb-4">
//                   <span className="text-indigo-600 font-bold">{idx + 1}.</span>{" "}
//                   {q.question}
//                 </p>
//                 <ul className="space-y-3">
//                   {q.options.map((opt, i) => {
//                     const isCorrect = submitted && opt === q.answer;
//                     const isSelected = submitted && answers[idx] === opt;

//                     let optionClass = "text-gray-700";
//                     if (submitted) {
//                       optionClass = isCorrect
//                         ? "text-green-600 font-semibold"
//                         : isSelected
//                         ? "text-red-600 line-through"
//                         : "text-gray-500";
//                     }

//                     return (
//                       <li key={i}>
//                         <label className="flex items-center gap-3 cursor-pointer">
//                           <input
//                             type="radio"
//                             name={`q${idx}`}
//                             value={opt}
//                             disabled={submitted}
//                             checked={answers[idx] === opt}
//                             onChange={() => handleAnswerChange(idx, opt)}
//                             className="accent-indigo-600"
//                           />
//                           <span className={optionClass}>{opt}</span>
//                         </label>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </div>
//             ))
//           )}

//           {!submitted ? (
//             <div className="text-center mt-10">
//               <button
//                 onClick={handleSubmit}
//                 className="bg-gradient-to-r from-indigo-600 to-emerald-500 hover:opacity-90 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition"
//               >
//                 🚀 Submit Test
//               </button>
//             </div>
//           ) : (
//             <div className="text-center mt-8">
//               <h2 className="text-2xl font-bold text-emerald-600">
//                 ✅ Your Score: {score} / {questions.length}
//               </h2>
//               <p className="text-slate-500 mt-2">Well done!</p>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default TestPage;



// ✅ Works if file is in public/data/questions.json
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const TestPage = () => {
  const { courseId, testId } = useParams();
  const [test, setTest] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/questions.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load JSON");
        return res.json();
      })
      .then((data) => {
        const course = data.courses.find((c) => c.id === courseId);
        if (!course) throw new Error("Course not found");

        const selectedTest = course.tests.find((t) => t.id === testId);
        if (!selectedTest) throw new Error("Test not found");

        setTest(selectedTest);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [courseId, testId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>{test.title}</h1>
      <ul>
        {test.questions.map((q, i) => (
          <li key={i}>{q.question}</li>
        ))}
      </ul>
    </div>
  );
};

export default TestPage;
