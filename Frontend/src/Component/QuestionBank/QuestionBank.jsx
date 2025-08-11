import { Routes, Route } from "react-router-dom";
import CourseList from "./CourseList";
import TestList from "./TestList";
import TestPage from "./TestPage";
import ResultPage from "./ResultPage";

export default function QuestionBank() {
  return (
    <Routes>
      <Route path="/" element={<CourseList />} />
      <Route path="/:courseId" element={<TestList />} />
      <Route path="/:courseId/:testId" element={<TestPage />} />
      <Route path="/:courseId/:testId/result" element={<ResultPage />} />
    </Routes>
  );
}
