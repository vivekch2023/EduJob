import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TechUpdates() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    // Replace with your real API endpoint
    fetch("http://localhost:5000/api/news")
      .then((res) => res.json())
      .then((data) => setUpdates(data))
      .catch((err) => console.error("Failed to load updates", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <h2 className="text-4xl font-bold text-center text-purple-700 mb-10">📢 Tech Updates</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {updates.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">No updates available.</p>
        ) : (
          updates.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-all"
            >
              <h3 className="text-xl font-semibold text-purple-700">{item.title}</h3>
              <p className="text-gray-600 text-sm mt-2 line-clamp-3">{item.summary}</p>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span>{new Date(item.date).toLocaleDateString()}</span>
                {item.sourceLink && (
                  <a
                    href={item.sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline"
                  >
                    Source ↗
                  </a>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
