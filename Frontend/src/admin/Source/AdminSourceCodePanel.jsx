import { useEffect, useState } from "react";
import axios from "axios";

const AdminSourceCodePanel = () => {
  const [codes, setCodes] = useState([]);
  const [form, setForm] = useState({ title: "", language: "", description: "", downloadLink: "" });
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState("list"); // 'upload' or 'list'

  // Fetch All Codes
  const fetchCodes = async () => {
    const res = await axios.get("http://localhost:5000/api/source-codes");
    setCodes(res.data);
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  // Add or Update Code
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:5000/api/source-codes/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post("http://localhost:5000/api/source-codes", form);
    }
    setForm({ title: "", language: "", description: "", downloadLink: "" });
    fetchCodes();
    setActiveTab("list");
  };

  // Delete
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/source-codes/${id}`);
    fetchCodes();
  };

  // Edit
  const handleEdit = (code) => {
    setForm(code);
    setEditingId(code._id);
    setActiveTab("upload");
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 font-sans">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-800">⚙️ Admin Panel - Source Code Manager</h1>

      {/* Tab Switch Buttons */}
      <div className="flex justify-center mb-8 space-x-4">
        <button
          onClick={() => setActiveTab("upload")}
          className={`px-6 py-2 rounded-full font-semibold ${activeTab === "upload" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
        >
          ➕ Upload Code
        </button>
        <button
          onClick={() => setActiveTab("list")}
          className={`px-6 py-2 rounded-full font-semibold ${activeTab === "list" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
        >
          📄 View Codes
        </button>
      </div>

      {/* Upload Section */}
      {activeTab === "upload" && (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-lg border mb-10">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border p-3 rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Language"
            value={form.language}
            onChange={(e) => setForm({ ...form, language: e.target.value })}
            className="w-full border p-3 rounded-md"
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border p-3 rounded-md"
            rows={4}
            required
          />
          <input
            type="text"
            placeholder="Download Link"
            value={form.downloadLink}
            onChange={(e) => setForm({ ...form, downloadLink: e.target.value })}
            className="w-full border p-3 rounded-md"
            required
          />
          <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition">
            {editingId ? "Update Code" : "Add Code"}
          </button>
        </form>
      )}

      {/* List Section */}
      {activeTab === "list" && (
        <div className="overflow-x-auto rounded-xl shadow border bg-white">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-indigo-100 text-indigo-800 uppercase">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Language</th>
                <th className="p-3">Description</th>
                <th className="p-3">Download</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {codes.map((code) => (
                <tr key={code._id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3">{code.title}</td>
                  <td className="p-3">{code.language}</td>
                  <td className="p-3">{code.description.slice(0, 40)}...</td>
                  <td className="p-3">
                    <a href={code.downloadLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      Download
                    </a>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(code)}
                      className="text-sm px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(code._id)}
                      className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {codes.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No source codes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminSourceCodePanel;
