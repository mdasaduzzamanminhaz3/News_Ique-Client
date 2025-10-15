import { Facebook, Twitter, Youtube, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-10 border-t dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* --- Logo & About --- */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3 font-serif">
            NEWS<span className="text-gray-800 dark:text-gray-100">IQUE</span>
          </h2>
          <p className="text-sm leading-relaxed">
            Stay updated with the latest news around the world — politics, business,
            sports, and technology. Trusted source for reliable information.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-blue-600">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-sky-500">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-red-500">
              <Youtube size={20} />
            </a>
            <a href="#" className="hover:text-pink-500">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-green-600">
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* --- Quick Links --- */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-blue-600">Home</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">About Us</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">Contact</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">Advertise</a>
            </li>
          </ul>
        </div>

        {/* --- Categories --- */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Categories
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-blue-600">Politics</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">Sports</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">Technology</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">Business</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">Health</a>
            </li>
          </ul>
        </div>

        {/* --- Newsletter --- */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Newsletter
          </h3>
          <p className="text-sm mb-3">
            Subscribe to get the latest news and updates directly in your inbox.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* --- Bottom Section --- */}
      <div className="border-t dark:border-gray-700 text-center py-4 text-sm">
        <p>
          © {new Date().getFullYear()} <span className="font-semibold">NEWSIQUE</span>. 
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
