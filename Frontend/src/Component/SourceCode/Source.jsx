import { useEffect, useState } from 'react';
import { Code2, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const SourceCodePage = () => {
  const [sourceCodes, setSourceCodes] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('http://localhost:5000/api/source-codes')
      .then(res => res.json())
      .then(data => setSourceCodes(data))
      .catch(err => console.error('Failed to fetch source codes:', err));
  }, []);

  // ✅ Ad script loader function
  const loadAd = (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Remove old content if re-rendered
    container.innerHTML = "";

    // Config script
    const configScript = document.createElement("script");
    configScript.type = "text/javascript";
    configScript.innerHTML = `
      atOptions = {
        'key' : '6b5aaba66ac2459774d331c639507f06',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;
    container.appendChild(configScript);

    // External invoke script
    const invokeScript = document.createElement("script");
    invokeScript.type = "text/javascript";
    invokeScript.src = "//www.highperformanceformat.com/6b5aaba66ac2459774d331c639507f06/invoke.js";
    container.appendChild(invokeScript);
  };

  useEffect(() => {
    // Page top ad
    loadAd("ad-top");
  }, [sourceCodes]);

  useEffect(() => {
    // Ads between cards
    filteredCodes.forEach((_, index) => {
      if ((index + 1) % 3 === 0) {
        loadAd(`ad-slot-${index}`);
      }
    });
  });

  const languages = ['All', ...new Set(sourceCodes.map(item => item.language))];
  const filteredCodes = filter === 'All' ? sourceCodes : sourceCodes.filter(code => code.language === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-[#0f0f0f] dark:to-[#1a1a1a] px-6 py-16 md:px-12 lg:px-20 font-sans transition-colors">

      {/* SEO Meta Tags */}
      <Helmet>
        <title>Developer Source Codes | Free Code Snippets for Learning & Projects</title>
        <meta
          name="description"
          content="Browse and download free developer source code snippets for various programming languages. Perfect for learning and building projects."
        />
        <meta
          name="keywords"
          content="developer source codes, free code snippets, download code, programming tutorials, coding projects, code examples"
        />
        <meta name="author" content="Your Name or Company" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Developer Source Codes | Free Code Snippets for Learning & Projects" />
        <meta property="og:description" content="Browse and download free developer source code snippets for various programming languages. Perfect for learning and building projects." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/source-codes" />
        <meta property="og:image" content="https://yourdomain.com/og-image-source-code.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Developer Source Codes | Free Code Snippets for Learning & Projects" />
        <meta name="twitter:description" content="Browse and download free developer source code snippets for various programming languages. Perfect for learning and building projects." />
        <meta name="twitter:image" content="https://yourdomain.com/twitter-image-source-code.png" />

        <link rel="canonical" href="https://yourdomain.com/source-codes" />
      </Helmet>

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-indigo-500 font-medium dark:text-indigo-400">
            Curated Collection
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2">
            📦 Developer Source Codes
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-3">
            Download free code snippets built for learning & projects.
          </p>
        </div>

        {/* ✅ Top Ad Slot */}
        <div id="ad-top" className="flex justify-center my-6"></div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {languages.map(lang => (
            <button
              key={lang}
              onClick={() => setFilter(lang)}
              className={`px-4 py-2 text-sm rounded-full font-medium border transition ${
                filter === lang
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white dark:bg-black text-gray-700 dark:text-white border-gray-300 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-800'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Cards + Ads */}
        <div className="flex flex-col gap-8">
          {filteredCodes.map((code, index) => (
            <div key={code._id || index}>
              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition duration-300 px-6 py-6 md:flex md:justify-between md:items-start"
              >
                <div className="md:w-3/4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow">
                      {code.language}
                    </div>
                    <Code2 size={18} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                    {code.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 leading-relaxed">
                    {code.description}
                  </p>
                </div>

                <div className="mt-5 md:mt-0 md:w-auto">
                  <a
                    href={code.downloadLink}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-black text-white hover:bg-gray-900 transition"
                    download
                  >
                    <Download size={18} />
                    Download
                  </a>
                </div>
              </motion.div>

              {/* ✅ Ad slot after every 3 cards */}
              {((index + 1) % 3 === 0) && (
                <div id={`ad-slot-${index}`} className="flex justify-center my-6"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SourceCodePage;
