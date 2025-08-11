import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-white font-sans text-gray-800">

      {/* Hero Section */}
      <section className="relative py-28 px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-white overflow-hidden">
        {/* Animated Blobs */}
        <div className="absolute top-10 left-8 w-40 h-40 bg-purple-300 opacity-20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-16 right-12 w-52 h-52 bg-indigo-400 opacity-10 rounded-full blur-3xl animate-spin-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-indigo-200 opacity-10 rounded-full blur-[130px]"></div>

        {/* Hero Content */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="relative z-10 max-w-5xl mx-auto bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl p-14 text-center"
        >
          <h2 className="text-5xl sm:text-6xl font-extrabold text-indigo-700 mb-6 tracking-tight leading-tight drop-shadow-md">
            Discover EduJobHub
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-medium max-w-3xl mx-auto">
            Empowering students with verified job alerts, curated PDF notes, and interactive MCQ practice — all in one powerful platform.
          </p>
        </motion.div>
      </section>

      {/* Mission + Vision */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-3xl font-semibold text-indigo-700 mb-4">🎯 Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              EduJobHub exists to bridge the gap between job seekers and real opportunities. We aim to empower students with verified alerts, rich resources, and smart test tools — all in one place.
            </p>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-3xl font-semibold text-indigo-700 mb-4">👁️ Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To be India’s most trusted student-friendly platform for job updates, exam prep PDFs, and practice MCQs — enabling dream careers with ease.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-indigo-50">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {[
            ["100+", "Jobs Posted"],
            ["500+", "PDF Downloads"],
            ["1000+", "Tests Taken"],
            ["5000+", "Active Users"]
          ].map(([value, label], i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <h4 className="text-4xl font-bold text-indigo-700">{value}</h4>
              <p className="text-gray-700 mt-2">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-20 px-6 md:px-20 text-center">
        <h3 className="text-4xl font-bold text-indigo-700 mb-10">Why Choose EduJobHub?</h3>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {[
            ["✅ Real-time Job Alerts", "Never miss opportunities — regular verified updates for all sectors."],
            ["📚 Affordable PDFs", "High-quality notes at low cost — instant downloads for faster learning."],
            ["🧠 Smart Testing", "Topic-wise MCQs with instant results and analytics for smarter prep."]
          ].map(([title, desc], i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="bg-indigo-50 rounded-xl shadow p-6 hover:shadow-md transition"
            >
              <h4 className="text-xl font-semibold text-indigo-700 mb-2">{title}</h4>
              <p>{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Showcase Image */}
      <section className="py-20 px-6 md:px-20 text-center bg-indigo-50">
        <h3 className="text-4xl font-bold text-indigo-800 mb-6">Learn. Practice. Get Hired.</h3>
        <p className="text-gray-700 mb-10 max-w-3xl mx-auto">
          EduJobHub is tailored for students and aspirants aiming to grow their career through smart and simple tools.
        </p>
        {/* <img
          src="/img1.png"
          alt="EduJobHub Screenshot"
          className="rounded-lg shadow-md mx-auto"
        /> */}
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6 md:px-20">
        <h3 className="text-4xl font-bold text-indigo-700 text-center mb-12">
          Frequently Asked Questions
        </h3>
        <div className="space-y-8 max-w-4xl mx-auto">
          {[
            ["❓ Is EduJobHub free to use?", "Yes! Job alerts and tests are free. Premium PDFs are low-cost."],
            ["📥 How to download PDFs?", "Go to the PDF section, make a secure payment, and download instantly."],
            ["🧪 Can I see test results?", "Yes, scores, answers, and topic-wise analysis are shown immediately."],
            ["📆 Are job updates daily?", "Yes, we update jobs daily from verified government and private sources."],
            ["📱 Is it mobile-friendly?", "Absolutely. Works on phones, tablets, and desktops."],
            ["🧾 Will I get a receipt?", "Yes. A confirmation email with download link is sent instantly."]
          ].map(([q, a]) => (
            <motion.div 
              key={q}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="font-semibold text-lg text-indigo-700">{q}</h4>
              <p className="text-gray-700">{a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Meet Creator */}
      <section className="py-20 px-6 md:px-20 bg-indigo-50">
        <h3 className="text-4xl font-bold text-indigo-800 text-center mb-12">Meet the Creator</h3>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-10"
        >
          <img
            src="https://cdn3.iconfinder.com/data/icons/web-development-168/512/Man_Web_Developer3.png"
            alt="Vivek Chauhan"
            className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-indigo-200"
          />
          <div className="text-center md:text-left">
            <h4 className="text-3xl font-semibold text-indigo-700">Vivek Chauhan</h4>
            <p className="text-gray-700 text-lg mt-2">Full Stack Developer • Founder, EduJobHub</p>
            <p className="text-gray-600 text-base mt-4 leading-relaxed">
              Passionate about tech and education, I created EduJobHub to help students find verified jobs, get quality materials, and prepare smarter — all in one fast, clean platform.
            </p>
            <div className="mt-6 flex justify-center md:justify-start space-x-6 text-indigo-700">
              <a href="#">🌐 Portfolio</a>
              <a href="#">💼 LinkedIn</a>
              <a href="mailto:info@edujobhub.com">📧 Contact</a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Back to Home */}
      <div className="text-center py-10">
        <a
          href="/"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full transition"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
}
