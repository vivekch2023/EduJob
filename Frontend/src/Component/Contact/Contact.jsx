export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-100 to-white py-20 px-6 md:px-24 font-sans text-gray-800">
      {/* Title Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-purple-800 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We love to hear from you. Whether you have a question, feedback, or just want to say hello – feel free to reach out!
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <form className="bg-white p-10 rounded-3xl shadow-lg space-y-6 border border-purple-100 hover:shadow-2xl transition">
          <div>
            <label className="block font-medium mb-1 text-sm text-purple-800">Full Name</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter your full name" required />
          </div>
          <div>
            <label className="block font-medium mb-1 text-sm text-purple-800">Email Address</label>
            <input type="email" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="you@example.com" required />
          </div>
          <div>
            <label className="block font-medium mb-1 text-sm text-purple-800">Subject</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter subject" />
          </div>
          <div>
            <label className="block font-medium mb-1 text-sm text-purple-800">Message</label>
            <textarea rows="5" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Write your message here..." required></textarea>
          </div>
          <button type="submit" className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-xl text-lg transition-all duration-300 shadow-md hover:shadow-lg">
            ✉️ Send Message
          </button>
        </form>

        {/* Contact Information */}
        <div className="bg-purple-50 p-10 rounded-3xl shadow-md space-y-8">
          <div>
            <h3 className="text-xl font-bold text-purple-700 mb-2">📬 Email</h3>
            <p className="text-gray-700">info@edujobhub.com</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-purple-700 mb-2">📍 Address</h3>
            <p className="text-gray-700">Lucknow, Uttar Pradesh, India</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-purple-700 mb-2">📞 Phone</h3>
            <p className="text-gray-700">+91 98765 43210</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-purple-700 mb-2">🌐 Follow Us</h3>
            <div className="flex space-x-6 mt-2 text-purple-700 text-lg">
              <a href="#" className="hover:text-purple-500">Facebook</a>
              <a href="#" className="hover:text-purple-500">Twitter</a>
              <a href="#" className="hover:text-purple-500">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="mt-20">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">📍 Our Location</h2>
        <div className="rounded-3xl overflow-hidden shadow-lg w-full h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.647672202685!2d80.94314991504332!3d26.84568138316054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2a8123bafc5%3A0x956f4a9c5f9b1918!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1640169535391!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="EduJobHub Location"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
