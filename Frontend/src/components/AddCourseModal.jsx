/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

export default function AddCourseModal({ onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear old errors

    if (!name.trim()) {
      setError("Course name is required");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/courses", {
        name: name.trim(),
        free: [],
        premium: []
      });

      setName("");
      onSuccess();
      onClose(); // close only on success
    } catch (err) {
      console.error("Error adding course:", err);
      setError(err.response?.data?.error || "Failed to add course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Course</h2>

        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Course Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
