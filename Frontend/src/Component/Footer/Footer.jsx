function Footer() {
  const linkClass =
    "hover:underline hover:text-white transition-colors duration-200";

  return (
    <footer className="bg-purple-900 text-white py-12 px-6 md:px-20 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">

        {/* Global IT Career Sites */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Global IT Career Sites</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            {[
              { name: "Microsoft", url: "https://careers.microsoft.com" },
              { name: "Amazon (AWS)", url: "https://www.amazon.jobs" },
              { name: "Apple", url: "https://jobs.apple.com" },
              { name: "Google (Alphabet)", url: "https://careers.google.com" },
              { name: "IBM", url: "https://www.ibm.com/employment" },
              { name: "Oracle", url: "https://www.oracle.com/corporate/careers/" },
              { name: "Meta (Facebook)", url: "https://www.metacareers.com" },
              { name: "Accenture", url: "https://www.accenture.com/in-en/careers" },
              { name: "Capgemini", url: "https://www.capgemini.com/careers/" },
              { name: "Adobe", url: "https://adobe.wd5.myworkdayjobs.com/en-US/external_experienced" },
            ].map((item, idx) => (
              <li key={idx}>
                <a href={item.url} className={linkClass} target="_blank" rel="noopener noreferrer">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Indian IT Career Sites */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Indian IT Career Sites</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            {[
              { name: "TCS (Tata Consultancy Services)", url: "https://www.tcs.com/careers" },
              { name: "Infosys", url: "https://www.infosys.com/careers/" },
              { name: "Wipro", url: "https://careers.wipro.com/" },
              { name: "HCLTech (HCL Technologies)", url: "https://www.hcltech.com/careers" },
              { name: "Tech Mahindra", url: "https://careers.techmahindra.com/" },
              { name: "Cognizant", url: "https://careers.cognizant.com/" },
               { name: "LTIMindtree", url: "https://careers.ltimindtree.com" },
                { name: "IBM India", url: "https://www.ibm.com/in-en/employment/" },
            ].map((item, idx) => (
              <li key={idx}>
                <a href={item.url} className={linkClass} target="_blank" rel="noopener noreferrer">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Coding Platforms */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Popular Coding Platforms</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            {[
              { name: "LeetCode", url: "https://leetcode.com" },
              { name: "HackerRank", url: "https://www.hackerrank.com" },
              { name: "Codeforces", url: "https://codeforces.com" },
              { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org" },
              { name: "CodeChef", url: "https://www.codechef.com" },
              { name: "InterviewBit", url: "https://www.interviewbit.com" },
            ].map((item, idx) => (
              <li key={idx}>
                <a href={item.url} className={linkClass} target="_blank" rel="noopener noreferrer">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Other Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Other Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            {[
             { name: "MDN Web Docs", url: "https://developer.mozilla.org" },
             { name: "Stack Overflow", url: "https://stackoverflow.com" },
              { name: "GitHub", url: "https://github.com" },
              { name: "TechFetch ", url: "https://www.techfetch.com/" },
            ].map((item, idx) => (
              <li key={idx}>
                <a href={item.url} className={linkClass}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-purple-700 mt-10 pt-6 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} EduJobHub. All rights reserved.</p>
        <p>Designed & Developed by Vivek Chauhan</p>
      </div>
    </footer>
  );
}

export default Footer;
