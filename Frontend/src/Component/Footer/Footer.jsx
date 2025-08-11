function Footer() {
  return (
    <footer className="bg-purple-900 text-white py-12 px-6 md:px-20 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
        {/* Brand Section
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">EduJobHub</h2>
      <p className="text-sm text-gray-300">
        Your one-stop solution for job alerts, study materials, and online tests — empowering students & job seekers.
      </p>
    </div> */}

        {/* word it company carrer site */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Global IT Career Sites
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <a
                href="https://careers.microsoft.com"
                className="hover:underline"
              >
                Microsoft
              </a>
            </li>
            <li>
              <a href="	https://www.amazon.jobs" className="hover:underline">
                Amazon (AWS)
              </a>
            </li>
            <li>
              <a href="https://jobs.apple.com" className="hover:underline">
                Apple
              </a>
            </li>
            <li>
              <a href="#	https://careers.google.com" className="hover:underline">
                Google (Alphabet)
              </a>
            </li>
            <li>
              <a
                href="https://www.ibm.com/employment"
                className="hover:underline"
              >
                IBM
              </a>
            </li>
            <li>
              <a
                href="	https://www.oracle.com/corporate/careers/"
                className="hover:underline"
              >
                Oracle
              </a>
            </li>
            <li>
              <a href="	https://www.metacareers.com" className="hover:underline">
                Meta (Facebook)
              </a>
            </li>
            <li>
              <a
                href="	https://www.accenture.com/in-en/careers"
                className="hover:underline"
              >
                Accenture
              </a>
            </li>
            <li>
              <a
                href="	https://www.capgemini.com/careers/"
                className="hover:underline"
              >
                Capgemini
              </a>
            </li>
            <li>
              <a
                href="https://adobe.wd5.myworkdayjobs.com/en-US/external_experienced"
                className="hover:underline"
              >
                Adobe
              </a>
            </li>
          </ul>
        </div>

        {/* Indian it carrer site*/}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Indian IT Career Sites
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <a href="https://www.tcs.com/careers" className="hover:underline">
                TCS (Tata Consultancy Services)
              </a>
            </li>
            <li>
              <a
                href="https://www.infosys.com/careers/"
                className="hover:underline"
              >
                Infosys
              </a>
            </li>
            <li>
              <a href="	https://careers.wipro.com/" className="hover:underline">
                Wipro
              </a>
            </li>
            <li>
              <a
                href="https://www.hcltech.com/careers"
                className="hover:underline"
              >
                HCLTech (HCL Technologies)
              </a>
            </li>
            <li>
              <a
                href="https://careers.techmahindra.com/"
                className="hover:underline"
              >
                Tech Mahindra
              </a>
            </li>
          </ul>
        </div>

        {/* popular coding platform*/}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Popular Coding Platforms
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <a href="https://www.tcs.com/careers" className="hover:underline">
                LeetCode
              </a>
            </li>
            <li>
              <a
                href="https://www.infosys.com/careers/"
                className="hover:underline"
              >
                HackerRank
              </a>
            </li>
            <li>
              <a href="	https://careers.wipro.com/" className="hover:underline">
                Codeforces
              </a>
            </li>
            <li>
              <a
                href="https://www.hcltech.com/careers"
                className="hover:underline"
              >
                GeeksforGeeks
              </a>
            </li>
            <li>
              <a
                href="https://careers.techmahindra.com/"
                className="hover:underline"
              >
                CodeChef
              </a>
            </li>
            <li>
              <a
                href="https://careers.techmahindra.com/"
                className="hover:underline"
              >
                InterviewBit
              </a>
            </li>
          </ul>
        </div>

        {/* Other links*/}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Other Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <a href="https://www.tcs.com/careers" className="hover:underline">
                LeetCode
              </a>
            </li>
            <li>
              <a
                href="https://www.infosys.com/careers/"
                className="hover:underline"
              >
                HackerRank
              </a>
            </li>
            <li>
              <a href="	https://careers.wipro.com/" className="hover:underline">
                Codeforces
              </a>
            </li>
            <li>
              <a
                href="https://www.hcltech.com/careers"
                className="hover:underline"
              >
                GeeksforGeeks
              </a>
            </li>
            <li>
              <a
                href="https://careers.techmahindra.com/"
                className="hover:underline"
              >
                CodeChef
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-purple-700 mt-10 pt-6 text-center text-sm text-gray-400">
        <p>&copy; 2025 EduJobHub. All rights reserved.</p>
        <p>Designed & Developed by Vivek Chauhan</p>
      </div>
    </footer>
  );
}

export default Footer;
