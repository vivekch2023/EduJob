import { Routes, Route } from "react-router-dom";
import HomePage from "./Component/HomePage";
import Jobs from "./Component/Jobs/Jobs";
import Navbaar from "./Component/Navbaar/Navbaar";
import Footer from "./Component/Footer/Footer";
import SourceCodePage from "./Component/SourceCode/Source";
import CoursePdfList from "./Component/Pdf/CoursePdfList";
import AdminSourceCodePanel from "./admin/Source/AdminSourceCodePanel";
import AdminJobsPanel from "./admin/Job/AdminJobsPanel";
import QuestionBank from "./Component/QuestionBank/QuestionBank";

function App() {
  return (
    
    <div>
      <Navbaar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/SourceCode" element={<SourceCodePage />} />
       
        <Route path="/pdf" element={<CoursePdfList />} /> 
        <Route path="/admin/source-codes" element={<AdminSourceCodePanel />} />
        <Route path="/admin/jobs" element={<AdminJobsPanel />} />
        <Route path="/question-bank/*" element={<QuestionBank />} />
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

