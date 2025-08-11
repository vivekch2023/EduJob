import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbaar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
    { name: "PDFs", path: "/pdf" },
    { name: "Question Bank", path: "/question-bank" },
    { name: "Source Code", path: "/SourceCode" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-md transition-all">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text"
        >
          EduJobHub
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 font-medium text-gray-700">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="relative group transition duration-300"
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-600 transition-all group-hover:w-full duration-300" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 hover:text-purple-600 transition"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pt-4 pb-6 bg-white/90 backdrop-blur-md rounded-b-xl shadow-md">
          <ul className="space-y-4 font-medium text-gray-800">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="block hover:text-purple-600 transition duration-200"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbaar;
