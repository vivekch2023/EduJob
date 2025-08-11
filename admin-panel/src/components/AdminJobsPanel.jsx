import { useEffect, useState } from "react";
import axios from "axios";
import {
  Pencil,
  Trash2,
  Briefcase,
  Link2,
  Calendar,
  Building2
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminJobsPanel() {
  const [form, setForm] = useState({
    company: "",
    title: "",
    applyLink: "",
    lastDate: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("add");

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/jobs`);
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/api/jobs/${editingId}`, form);
        toast.success("✅ Job updated successfully");
        setEditingId(null);
      } else {
        await axios.post(`${API_BASE}/api/jobs`, form);
        toast.success("🎉 Job added successfully");
      }
      setForm({ company: "", title: "", applyLink: "", lastDate: "" });
      fetchJobs();
      setActiveTab("list");
    } catch (err) {
      console.error("Error submitting job:", err);
      toast.error("❌ Failed to submit job");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`${API_BASE}/api/jobs/${id}`);
      toast.success("🗑️ Job deleted successfully");
      fetchJobs();
    } catch (err) {
      console.error("Error deleting job:", err);
      toast.error("❌ Failed to delete job");
    }
  };

  const handleEdit = (job) => {
    setForm(job);
    setEditingId(job._id);
    setActiveTab("add");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-14 font-sans">
      <ToastContainer position="top-right" autoClose={2500} />

      <h1 className="text-4xl font-bold text-center text-purple-700 mb-12">
        Admin – Job Management 💼
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-10 gap-6">
        <button
          onClick={() => setActiveTab("add")}
          className={`px-6 py-2 rounded-full shadow transition-all duration-300 ${
            activeTab === "add"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-purple-100"
          }`}
        >
          ➕ Add New Job
        </button>
        <button
          onClick={() => setActiveTab("list")}
          className={`px-6 py-2 rounded-full shadow transition-all duration-300 ${
            activeTab === "list"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-purple-100"
          }`}
        >
          📋 View All Jobs
        </button>
      </div>

      {/* Form Section */}
      {activeTab === "add" && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border shadow-lg rounded-xl p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <Building2 className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Company Name"
                value={form.company}
                onChange={(e) =>
                  setForm({ ...form, company: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-purple-500"
                required
              />
            </div>

            <div className="relative">
              <Briefcase className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Job Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-purple-500"
                required
              />
            </div>

            <div className="relative">
              <Link2 className="absolute top-3 left-3 text-gray-400" />
              <input
                type="url"
                placeholder="Apply Link"
                value={form.applyLink}
                onChange={(e) =>
                  setForm({ ...form, applyLink: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-purple-500"
                required
              />
            </div>

            <div className="relative">
              <Calendar className="absolute top-3 left-3 text-gray-400" />
              <input
                type="date"
                value={form.lastDate}
                onChange={(e) =>
                  setForm({ ...form, lastDate: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-purple-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition"
          >
            {editingId ? "✅ Update Job" : "➕ Add Job"}
          </button>
        </form>
      )}

      {/* Job List Section */}
      {activeTab === "list" && (
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="min-w-full bg-white text-left border border-gray-200">
            <thead className="bg-gray-100 text-sm uppercase tracking-wider text-gray-700">
              <tr>
                <th className="p-4">Company</th>
                <th className="p-4">Title</th>
                <th className="p-4">Deadline</th>
                <th className="p-4">Apply Link</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{job.company}</td>
                  <td className="p-4">{job.title}</td>
                  <td className="p-4 text-red-600 font-medium">
                    {job.lastDate}
                  </td>
                  <td className="p-4 text-blue-600 max-w-xs truncate">
                    <a
                      href={job.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {job.applyLink}
                    </a>
                  </td>
                  <td className="p-4 text-center space-x-3">
                    <button
                      onClick={() => handleEdit(job)}
                      className="text-indigo-600 hover:text-indigo-800 transition"
                      title="Edit"
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    No jobs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
