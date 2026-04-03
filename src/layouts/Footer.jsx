import { Facebook, Twitter, Youtube, Instagram, Mail, Send, Globe, Shield, Info } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="relative mt-20">
      {/* Decorative Top Curve / Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[-99%]">
        <svg className="relative block w-full h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-100 dark:fill-gray-900"></path>
        </svg>
      </div>

      {/* Main Footer Container */}
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors duration-500 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* --- Brand Section --- */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/30 group-hover:rotate-12 transition-transform">
                <Globe className="text-white w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">
                NEWS<span className="text-blue-600">IQUE</span>
              </h2>
            </Link>
            <p className="text-sm leading-relaxed font-medium opacity-80 italic">
              "Empowering the world through reliable information. Stay ahead with our real-time news delivery system."
            </p>
            {/* Social Icons with 3D Hover */}
            <div className="flex gap-3">
              {[
                { Icon: Facebook, color: "hover:bg-blue-600", link: "#" },
                { Icon: Twitter, color: "hover:bg-sky-500", link: "#" },
                { Icon: Youtube, color: "hover:bg-red-500", link: "#" },
                { Icon: Instagram, color: "hover:bg-pink-600", link: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  className={`p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-2 hover:text-white ${social.color} border border-transparent hover:border-white/20`}
                >
                  <social.Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* --- Quick Navigation --- */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <Info size={16}/> Exploration
            </h3>
            <ul className="space-y-4 text-sm font-semibold">
              {["Home", "Trending", "About Us", "Contact", "Advertise"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center group">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-blue-600 mr-0 group-hover:mr-2 transition-all"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Privacy & Trust --- */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <Shield size={16}/> Trust Center
            </h3>
            <ul className="space-y-4 text-sm font-semibold">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Community Guidelines"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Premium Newsletter --- */}
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] blur opacity-10"></div>
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-[2rem] shadow-xl border border-white/20">
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Join the Elite</h3>
              <p className="text-xs mb-4 opacity-70 leading-relaxed">
                Get high-priority news alerts directly to your inbox.
              </p>
              <form className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Send size={16} /> Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* --- Bottom Footer --- */}
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-tighter opacity-60">
          <p>© {new Date().getFullYear()} NEWSIQUE MEDIA GROUP</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-600">Sitemap</a>
            <a href="#" className="hover:text-blue-600">Security</a>
            <a href="#" className="hover:text-blue-600">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;