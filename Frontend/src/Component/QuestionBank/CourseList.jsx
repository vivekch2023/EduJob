import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AcademicCapIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/questions.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch courses");
        return res.json();
      })
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load courses. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-indigo-700 text-xl font-semibold">
        Loading courses...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg font-semibold px-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Question Bank - EduJobHub</title>
        <meta
          name="description"
          content="Explore our extensive Question Bank for various courses on EduJobHub. Prepare efficiently with our categorized tests and improve your skills."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourdomain.com/question-bank" />

        {/* Open Graph */}
        <meta property="og:title" content="Question Bank - EduJobHub" />
        <meta
          property="og:description"
          content="Explore our extensive Question Bank for various courses on EduJobHub. Prepare efficiently with our categorized tests and improve your skills."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/question-bank" />
        {/* Replace with your own OG image URL */}
        <meta property="og:image" content="https://yourdomain.com/images/question-bank-og.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Question Bank - EduJobHub" />
        <meta
          name="twitter:description"
          content="Explore our extensive Question Bank for various courses on EduJobHub. Prepare efficiently with our categorized tests and improve your skills."
        />
        <meta name="twitter:image" content="https://yourdomain.com/images/question-bank-og.png" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-50 py-16 px-6">
        <h1 className="text-3xl font-extrabold text-center mb-10 text-indigo-900 tracking-wide">
          Question Bank
        </h1>

        <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.id}
              to={`/question-bank/${course.id}`}
              className="group relative block rounded-2xl bg-white/30 backdrop-blur-md border border-white/30
                shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 cursor-pointer
                ring-1 ring-transparent hover:ring-indigo-400"
              aria-label={`Go to ${course.name} tests`}
            >
              {/* Icon with frosted glass circle */}
              <div
                className="flex items-center justify-center mb-4 w-14 h-14 rounded-full bg-indigo-600/50
                group-hover:bg-purple-600/70 shadow-lg transition-colors duration-300"
                aria-hidden="true"
              >
                <AcademicCapIcon className="w-7 h-7 text-white" />
              </div>

              {/* Course Name */}
              <h2 className="text-xl font-semibold text-indigo-900 group-hover:text-purple-700 mb-2 truncate drop-shadow-sm">
                {course.name}
              </h2>

              {/* Test count */}
              <p className="text-indigo-700 font-medium mb-6 text-sm drop-shadow-sm">
                {course.tests.length} {course.tests.length === 1 ? "Test" : "Tests"}
              </p>

              {/* Explore button style */}
              <div
                className="inline-flex items-center text-white bg-indigo-700/80 group-hover:bg-purple-700/90
                font-semibold rounded-full px-4 py-1 text-sm shadow-md transition-colors duration-300
                select-none w-max"
              >
                Explore
                <ArrowRightIcon
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
