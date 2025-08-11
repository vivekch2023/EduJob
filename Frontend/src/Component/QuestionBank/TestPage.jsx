import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Timer from "./Timer";

export default function TestPage() {
  const { courseId, testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetch("/data/questions.json")
      .then((res) => res.json())
      .then((data) => {
        const course = data.find((c) => c.id === courseId);
        const foundTest = course?.tests.find((t) => t.id === testId);
        setTest(foundTest);
      });
  }, [courseId, testId]);

  const handleSelect = (qId, option) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const submitTest = () => {
    navigate(`/question-bank/${courseId}/${testId}/result`, {
      state: { test, answers },
    });
  };

  if (!test)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg animate-pulse">Loading test...</p>
      </div>
    );

  return (
    <>
      {/* Fixed Timer Bar at top center */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md border-b border-gray-200 z-50 flex justify-center py-3 px-4">
        <div className="flex items-center space-x-3 max-w-4xl w-full">
          <svg
            className="w-6 h-6 text-blue-600 animate-pulse"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6l4 2m5-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-center">
            <p className="text-sm text-gray-500 font-medium">Time Remaining</p>
            <Timer duration={test.duration} onTimeUp={submitTest} />
          </div>
        </div>
      </div>

      {/* Main content with padding top for fixed timer */}
      <div className="pt-20 pb-12 min-h-screen bg-gray-50 max-w-4xl mx-auto px-6 md:px-12">
        {/* Test Title & Info */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">{test.name}</h1>
          <p className="text-gray-600 mt-2 text-lg">
            Total Questions: {test.questions.length} | Duration: {test.duration} minutes
          </p>
        </header>

        {/* Questions Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitTest();
          }}
          className="space-y-10"
        >
          {test.questions.map((q, index) => (
            <div
              key={q.id}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-300 hover:shadow-2xl transition-shadow duration-300"
            >
              <p className="text-xl font-semibold text-gray-900 mb-6">
                {index + 1}. {q.question}
              </p>
              <div className="space-y-5">
                {q.options.map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center cursor-pointer select-none text-gray-800 hover:text-blue-600 transition-colors duration-200"
                  >
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      value={opt}
                      checked={answers[q.id] === opt}
                      onChange={() => handleSelect(q.id, opt)}
                      className="form-radio text-blue-600 focus:ring-blue-500"
                      required
                    />
                    <span className="ml-4 text-lg">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Submit button inside form at the bottom */}
          <div className="flex justify-center pt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white font-bold px-10 py-4 rounded-full shadow-2xl hover:bg-blue-700 transition"
              aria-label="Submit Test"
            >
              Submit Test
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
