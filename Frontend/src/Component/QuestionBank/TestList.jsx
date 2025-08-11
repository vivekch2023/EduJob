import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ClockIcon } from "@heroicons/react/24/outline";

export default function TestList() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetch("/data/questions.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((c) => c.id === courseId);
        setCourse(found);
      });
  }, [courseId]);

  if (!course)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 text-lg animate-pulse">Loading tests...</p>
      </div>
    );

  // Format seconds into minutes only, round up if leftover seconds exist
  function formatDuration(seconds) {
    const mins = Math.ceil(seconds / 60);
    return `${mins} min`;
  }

  return (
    <>
      <Helmet>
        <title>{course.name} Tests - EduJobHub</title>
        <meta
          name="description"
          content={`Take timed tests for the ${course.name} course on EduJobHub. Manage your test time efficiently and improve your skills.`}
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://yourdomain.com/question-bank/${courseId}`} />

        {/* Open Graph */}
        <meta property="og:title" content={`${course.name} Tests - EduJobHub`} />
        <meta
          property="og:description"
          content={`Take timed tests for the ${course.name} course on EduJobHub. Manage your test time efficiently and improve your skills.`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://yourdomain.com/question-bank/${courseId}`} />
        {/* Replace with your own OG image URL */}
        <meta property="og:image" content="https://yourdomain.com/images/course-tests-og.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${course.name} Tests - EduJobHub`} />
        <meta
          name="twitter:description"
          content={`Take timed tests for the ${course.name} course on EduJobHub. Manage your test time efficiently and improve your skills.`}
        />
        <meta name="twitter:image" content="https://yourdomain.com/images/course-tests-og.png" />
      </Helmet>

      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-extrabold text-indigo-900 mb-12 border-b border-indigo-300 pb-5">
          {course.name} - Tests
        </h1>

        <div className="space-y-8">
          {course.tests.map((test) => (
            <Link
              key={test.id}
              to={`/question-bank/${courseId}/${test.id}`}
              className="flex items-center justify-between rounded-lg bg-white p-6 shadow-md
                transition-shadow duration-300 hover:shadow-xl border border-transparent hover:border-indigo-400"
            >
              <div>
                <h2 className="text-2xl font-semibold text-indigo-900">{test.name}</h2>
                <p className="mt-1 text-indigo-600 font-medium">
                  Duration: <span className="font-normal">{formatDuration(test.duration)}</span>
                </p>
              </div>
              <ClockIcon className="w-7 h-7 text-indigo-500" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
