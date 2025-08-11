import { useEffect, useState } from "react";
import { Briefcase, Calendar, ExternalLink } from "lucide-react";
import URL_API from "../../api"; // axios instance file

export default function JobsSection() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await URL_API.get("/api/jobs");
        setJobs(res.data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <section className="py-12 px-4 md:px-10 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <h2 className="text-4xl font-bold text-center text-purple-700 mb-10 tracking-wide">
        💼 Job Opportunities
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2">
              <Briefcase size={18} className="text-purple-600" />
              {job.title}
            </h3>

            <p className="text-sm text-gray-600 mb-2">
              Company: <span className="font-medium text-black">{job.company}</span>
            </p>

            <p className="text-sm text-red-600 mb-6 flex items-center gap-1">
              <Calendar size={16} /> Last Date: {job.lastDate}
            </p>

            <a
              href={job.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 w-full bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
            >
              <ExternalLink size={16} /> Apply Now
            </a>
          </div>
        ))}

        {jobs.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            No jobs found.
          </p>
        )}
      </div>
    </section>
  );
}
