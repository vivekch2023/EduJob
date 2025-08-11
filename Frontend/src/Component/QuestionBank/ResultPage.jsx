import { useLocation, useNavigate } from "react-router-dom";

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  if (!state)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">No result found.</p>
      </div>
    );

  const { test, answers } = state;
  const score = test.questions.reduce(
    (acc, q) => acc + (answers[q.id] === q.answer ? 1 : 0),
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900">
        Test Result
      </h1>

      <div className="text-center mb-12">
        <p className="text-2xl font-semibold text-gray-800">
          Your Score:{" "}
          <span className="text-blue-600">
            {score} / {test.questions.length}
          </span>
        </p>
        <p className="mt-1 text-gray-500 italic">
          ({((score / test.questions.length) * 100).toFixed(2)}%)
        </p>
      </div>

      <div className="space-y-8">
        {test.questions.map((q, index) => {
          const isCorrect = answers[q.id] === q.answer;
          return (
            <div
              key={q.id}
              className={`p-6 rounded-3xl shadow-lg border ${
                isCorrect
                  ? "border-green-400 bg-green-50"
                  : "border-red-400 bg-red-50"
              }`}
            >
              <p className="font-semibold text-lg text-gray-900 mb-3">
                {index + 1}. {q.question}
              </p>

              <div className="space-y-1">
                <p
                  className={`font-medium ${
                    isCorrect ? "text-green-700" : "text-red-700"
                  }`}
                >
                  Your Answer:{" "}
                  <span className="font-normal">
                    {answers[q.id] || "Not answered"}
                  </span>
                </p>
                {!isCorrect && (
                  <p className="text-blue-700 font-medium">
                    Correct Answer: <span className="font-normal">{q.answer}</span>
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 flex justify-center">
        <button
          onClick={() => navigate("/question-bank")}
          className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-8 py-3 rounded-full shadow-lg"
        >
          Back to Courses
        </button>
      </div>
    </div>
  );
}
