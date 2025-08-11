import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};

export default function EduJobHubLandingPage() {
  return (
    <>
      <Helmet>
        <title>EduJobHub - Student Jobs, Premium PDFs & Practice Tests</title>
        <meta
          name="description"
          content="Empowering students with verified job alerts, curated PDFs, and interactive MCQ tests all in one platform. Discover EduJobHub today!"
        />
        <meta
          name="keywords"
          content="student jobs, job alerts, premium PDFs, MCQ tests, exam preparation, competitive exams, EduJobHub"
        />
        <meta name="author" content="Vivek Chauhan" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="EduJobHub - Student Jobs, Premium PDFs & Practice Tests" />
        <meta
          property="og:description"
          content="Empowering students with verified job alerts, curated PDFs, and interactive MCQ tests all in one platform."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta property="og:image" content="https://yourdomain.com/og-image-eduJobHub.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EduJobHub - Student Jobs, Premium PDFs & Practice Tests" />
        <meta
          name="twitter:description"
          content="Empowering students with verified job alerts, curated PDFs, and interactive MCQ tests all in one platform."
        />
        <meta name="twitter:image" content="https://yourdomain.com/twitter-image-eduJobHub.png" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://yourdomain.com/" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-white font-sans scroll-smooth text-gray-800">

        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center py-28 px-6 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-white">
          <div className="absolute top-10 left-8 w-40 h-40 bg-purple-300 opacity-20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-16 right-12 w-52 h-52 bg-indigo-400 opacity-10 rounded-full blur-3xl animate-spin-slow"></div>
          <div className="absolute top-1/2 left-1/2 w-[420px] h-[420px] bg-indigo-200 opacity-10 rounded-full blur-[130px] transform -translate-x-1/2 -translate-y-1/2"></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="z-10 max-w-4xl bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl p-14"
          >
            <h1 className="text-5xl font-bold text-indigo-700 mb-4 drop-shadow-lg">
              Discover EduJobHub
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Empowering students with verified job alerts, curated PDFs, and interactive tests — all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/jobs" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full transition-transform hover:scale-105">Explore Jobs</Link>
              <Link to="/pdf" className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full transition-transform hover:scale-105">Buy PDFs</Link>
              <Link to="/question-bank" className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full transition-transform hover:scale-105">Take Test</Link>
            </div>
          </motion.div>
        </section>

        {/* Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 md:px-20 py-16 bg-indigo-50">
          {[
            { title: "📢 Job Alerts", color: "text-purple-700", text: "Stay updated with the latest job openings in government and private sectors." },
            { title: "📚 Premium PDFs", color: "text-green-600", text: "Access curated PDF notes and materials for top competitive exams." },
            { title: "🧠 Practice Tests", color: "text-yellow-600", text: "Attempt MCQ quizzes with instant result analysis and improvement suggestions." },
          ].map(({ title, color, text }) => (
            <motion.div key={title} className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition" {...fadeUp}>
              <h3 className={`text-2xl font-semibold mb-4 ${color}`}>{title}</h3>
              <p>{text}</p>
            </motion.div>
          ))}
        </section>

        {/* Mission + Vision */}
        <section className="py-20 px-6 md:px-20 bg-white">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
              <h3 className="text-3xl font-semibold text-indigo-700 mb-4">🎯 Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                EduJobHub exists to bridge the gap between job seekers and real opportunities. We aim to empower students with verified alerts, rich resources, and smart test tools — all in one place.
              </p>
            </motion.div>
            <motion.div initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
              <h3 className="text-3xl font-semibold text-indigo-700 mb-4">👁️ Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be India’s most trusted student-friendly platform for job updates, exam prep PDFs, and practice MCQs — enabling dream careers with ease.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6 md:px-20 bg-purple-50 text-center">
          <h2 className="text-4xl font-bold text-purple-700 mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {["Ritesh Kushwaha", "Himanshu Jaishwal", "Shanvi"].map((name, i) => (
              <motion.div key={name} className="bg-white p-6 rounded-lg shadow hover:shadow-lg" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 + i * 0.2 }} viewport={{ once: true }}>
                <p className="italic mb-4">
                  {[
                    "Very helpful site! I got my first job through a notification here. Thank you EduJobHub!",
                    "The MCQ section is amazing, I improved my scores a lot!",
                    "Affordable Source code and quick downloads. Perfect for anyone."
                  ][i]}
                </p>
                <p className="font-bold text-purple-600">– {name}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <motion.section className="bg-indigo-50 py-16 px-6 md:px-20 text-center" {...fadeUp}>
          <h2 className="text-4xl font-bold text-purple-800 mb-10">Our Impact So Far</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { val: "100+", label: "Jobs Posted", color: "text-purple-700" },
              { val: "10k+", label: "Participated in Test", color: "text-green-600" },
              { val: "20K+", label: "Active Users", color: "text-yellow-500" }
            ].map(({ val, label, color }) => (
              <div key={val}>
                <h3 className={`text-5xl font-extrabold ${color}`}>{val}</h3>
                <p className="mt-2">{label}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* FAQs */}
        <section className="bg-white py-20 px-6 md:px-20">
          <h3 className="text-4xl font-bold text-indigo-700 text-center mb-12">Frequently Asked Questions</h3>
          <div className="space-y-8 max-w-4xl mx-auto">
            {[
              ["❓ Is EduJobHub free to use?", "Yes! Job alerts and tests are free. Premium PDFs are low-cost."],
              ["🧪 Can I see test results?", "Yes, scores, answers, and topic-wise analysis are shown immediately."],
              ["📆 Are job updates daily?", "Yes, we update jobs daily from verified government and private sources."],
              ["📱 Is it mobile-friendly?", "Absolutely. Works on phones, tablets, and desktops."],
              ["🧾 Will I get a receipt?", "Yes. A confirmation email with download link is sent instantly."]
            ].map(([q, a]) => (
              <motion.div key={q} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <h4 className="font-semibold text-lg text-indigo-700">{q}</h4>
                <p className="text-gray-700">{a}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Creator */}
        <section className="py-20 px-6 md:px-20 bg-gray-50">
          <h3 className="text-4xl font-bold text-gray-800 text-center mb-14">Meet the Creator</h3>

          <motion.div
            className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-md flex flex-col md:flex-row items-center gap-8 border border-gray-200"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img
              src="https://cdn3.iconfinder.com/data/icons/web-development-168/512/Man_Web_Developer3.png"
              alt="Vivek Chauhan"
              className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border border-gray-300 shadow-sm"
            />

            <div className="text-center md:text-left">
              <h4 className="text-2xl md:text-3xl font-semibold text-gray-800">Vivek Chauhan</h4>
              <p className="text-gray-600 mt-1">Full Stack Developer · Founder, EduJobHub</p>

              <p className="text-gray-700 mt-4 leading-relaxed max-w-xl">
                I created EduJobHub to simplify student career growth — verified job listings, premium resources, and MCQs under one clean, student-friendly platform.
              </p>

              <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-8">
                <a
                  href="https://vivekchportfolio.netlify.app/"
                  target="_blank"
                  className="text-sm px-4 py-2 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 transition"
                >
                  🌐 Portfolio
                </a>
                {/* <a
                  href=""
                  className="text-sm px-4 py-2 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 transition"
                >
                  💼 LinkedIn
                </a> */}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Scroll to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-5 right-5 bg-purple-700 text-white px-4 py-2 rounded-full shadow-lg hover:bg-purple-800 z-50"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      </div>
    </>
  );
}
