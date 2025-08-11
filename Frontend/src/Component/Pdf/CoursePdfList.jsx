import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FileText, Lock, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function CoursePdfList() {
  // ✅ If your route is "/pdfs/:id"
  const { id: pdfId } = useParams();

  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("free");

  useEffect(() => {
    if (!pdfId) {
      console.error("No PDF ID provided in route.");
      return;
    }

    fetch(`http://localhost:5000/api/pdfs/${pdfId}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then(data => setCourse(data))
      .catch(err => console.error("Failed to load course:", err));
  }, [pdfId]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg">
        Loading...
      </div>
    );
  }

  const renderPdfs = (list, isPremium = false) => {
    if (!list || list.length === 0) {
      return (
        <div className="text-center text-gray-400 text-sm mt-10">
          {isPremium ? "No premium PDFs available." : "No free PDFs available."}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {list.map((pdf, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className={`rounded-xl p-6 border border-white/20 shadow-md backdrop-blur-lg transition-all ${
              isPremium
                ? "bg-gradient-to-br from-yellow-100/40 to-yellow-50/20"
                : "bg-gradient-to-br from-indigo-100/30 to-white/20"
            }`}
          >
            <div className="flex items-start gap-3">
              {isPremium ? (
                <Lock className="text-yellow-600 w-5 h-5 mt-1" />
              ) : (
                <FileText className="text-indigo-600 w-5 h-5 mt-1" />
              )}
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{pdf.title}</h4>
                {isPremium && (
                  <p className="text-sm text-yellow-700 mt-1">
                    Price: ₹{pdf.price}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4">
              {isPremium ? (
                <button className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition text-sm">
                  Buy Now
                </button>
              ) : (
                <a
                  href={pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-indigo-600 hover:underline text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-white to-indigo-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-800"
          >
            {course.name} PDFs
          </motion.h1>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Explore curated learning resources for your course.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab("free")}
            className={`px-5 py-2 rounded-full text-sm font-medium shadow-sm transition-all ${
              activeTab === "free"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 border border-indigo-200"
            }`}
          >
            Free PDFs
          </button>
          <button
            onClick={() => setActiveTab("premium")}
            className={`px-5 py-2 rounded-full text-sm font-medium shadow-sm transition-all ${
              activeTab === "premium"
                ? "bg-yellow-500 text-white"
                : "bg-white text-gray-700 border border-yellow-200"
            }`}
          >
            Premium PDFs
          </button>
        </div>

        {/* PDF Content */}
        {activeTab === "free"
          ? renderPdfs(course.free)
          : renderPdfs(course.premium, true)}
      </div>
    </div>
  );
}
