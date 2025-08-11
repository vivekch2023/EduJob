import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Trash2, PlusCircle, ArrowLeft } from "lucide-react";

export default function PremiumPdfManager() {
  const { id } = useParams();
  const [pdfs, setPdfs] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState("");

  const fetchPdfs = async () => {
    const res = await axios.get(`http://localhost:5000/api/courses/${id}/premium`);
    setPdfs(res.data);
  };

  const addPdf = async (e) => {
    e.preventDefault();
    const courseRes = await axios.get(`http://localhost:5000/api/courses/${id}`);
    const updatedCourse = {
      ...courseRes.data,
      premium: [...courseRes.data.premium, { title, url, price }],
    };
    await axios.put(`http://localhost:5000/api/courses/${id}`, updatedCourse);
    setTitle("");
    setUrl("");
    setPrice("");
    fetchPdfs();
  };

  const deletePdf = async (index) => {
    if (!window.confirm("Delete this PDF?")) return;
    const courseRes = await axios.get(`http://localhost:5000/api/courses/${id}`);
    const updatedCourse = { ...courseRes.data };
    updatedCourse.premium.splice(index, 1);
    await axios.put(`http://localhost:5000/api/courses/${id}`, updatedCourse);
    fetchPdfs();
  };

  useEffect(() => {
    fetchPdfs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <Link to="/admin/courses" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
          <ArrowLeft /> Back
        </Link>
        <h1 className="text-2xl font-bold">Manage Premium PDFs</h1>
      </div>

      <form onSubmit={addPdf} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="PDF Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-3 py-2 rounded w-1/4"
          required
        />
        <input
          type="url"
          placeholder="PDF URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border px-3 py-2 rounded w-1/4"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border px-3 py-2 rounded w-1/4"
          required
        />
        <button type="submit" className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded">
          <PlusCircle /> Add
        </button>
      </form>

      <table className="w-full bg-white rounded-lg shadow">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
          <tr>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-left">URL</th>
            <th className="py-3 px-4 text-left">Price</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pdfs.map((p, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">{p.title}</td>
              <td className="py-3 px-4">
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  View
                </a>
              </td>
              <td className="py-3 px-4">₹{p.price}</td>
              <td className="py-3 px-4 text-center">
                <button
                  onClick={() => deletePdf(i)}
                  className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                >
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
