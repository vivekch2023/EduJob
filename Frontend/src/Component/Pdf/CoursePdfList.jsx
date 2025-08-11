import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiFileText } from "react-icons/fi";
import { Helmet } from "react-helmet-async";

export default function PdfComingSoon() {
  return (
    <>
      <Helmet>
        <title>PDF Section Coming Soon - EduJobHub</title>
        <meta
          name="description"
          content="The PDF section on EduJobHub is coming soon! We’re preparing high-quality premium PDFs to help you with exam preparation. Stay tuned!"
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://yourdomain.com/pdf-coming-soon" />
      </Helmet>

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-white px-6 text-gray-800 font-sans select-none">

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white rounded-3xl shadow-xl p-12 max-w-lg text-center border border-indigo-200"
          aria-live="polite"
          role="main"
        >
          <motion.div 
            className="text-indigo-600 mb-6 inline-block"
            animate={{ rotate: [0, 15, -15, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            aria-hidden="true"
          >
            <FiFileText className="w-20 h-20 mx-auto" />
          </motion.div>

          <h1 className="text-4xl font-extrabold mb-4 tracking-tight text-indigo-800">
            PDF Section Coming Soon
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            We are working hard to bring you high-quality PDFs soon! Stay tuned for updates and premium content.
          </p>

          <Link
            to="/"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow-md transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Go back to homepage"
          >
            ← Back to Home
          </Link>
        </motion.div>

        <footer className="mt-16 text-xs text-gray-400 select-text">
          © 2025 EduJobHub. All rights reserved.
        </footer>
      </div>
    </>
  );
}
