import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Component/HomePage";
import Jobs from "./Component/Jobs/Jobs";
import Navbaar from "./Component/Navbaar/Navbaar";
import Footer from "./Component/Footer/Footer";
import SourceCodePage from "./Component/SourceCode/Source";
import PdfCourseList from "./Component/Pdf/PdfCourseList";
import CoursePdfList from "./Component/Pdf/CoursePdfList";
import AdminSourceCodePanel from "./admin/Source/AdminSourceCodePanel";
import AdminJobsPanel from "./admin/Job/AdminJobsPanel";
import Add from "./admin/pdf/Add";
import MCQAdminPanel from "./admin/MCQ/MCQAdminPanel";
import FreePdfManager from "./pages/FreePdfManager";
import PremiumPdfManager from "./pages/PremiumPdfManager";
import AdminCourseList from "./pages/AdminCourseList"
import QuestionBank from "./Component/QuestionBank/QuestionBank";

function App() {
  return (
    
    <div>
      <Navbaar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/SourceCode" element={<SourceCodePage />} />
        <Route path="/pdf" element={<PdfCourseList />} />
        <Route path="/pdf/:id" element={<CoursePdfList />} />

        <Route path="/admin/source-codes" element={<AdminSourceCodePanel />} />
        <Route path="/admin/jobs" element={<AdminJobsPanel />} />
        <Route path="/admin/p" element={<Add />} />
        <Route path="/admin/mcq" element={<MCQAdminPanel />} />

        {/* PDF admin */}
         <Route path="/" element={<Navigate to="/admin/courses" />} />
        <Route path="/admin/courses" element={<AdminCourseList/>} />
        <Route path="/admin/courses/:id/free" element={<FreePdfManager />} />
        <Route path="/admin/courses/:id/premium" element={<PremiumPdfManager />} />
          <Route path="/question-bank/*" element={<QuestionBank />} />
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

