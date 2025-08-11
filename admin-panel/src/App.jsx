import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminJobsPanel from "./components/AdminJobsPanel";
import AdminSourceCodePanel from "./components/AdminSourceCodePanel";

export default function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <nav className="bg-purple-700 text-white p-4 flex justify-center gap-6">
          <Link to="/jobs" className="hover:underline">Jobs Admin</Link>
          <Link to="/source-codes" className="hover:underline">Source Codes Admin</Link>
        </nav>
        <Routes>
          <Route path="/jobs" element={<AdminJobsPanel />} />
          <Route path="/source-codes" element={<AdminSourceCodePanel />} />
        </Routes>
      </div>
    </Router>
  );
}
