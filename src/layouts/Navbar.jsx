import { useState, useEffect } from "react";
import { Menu, X, Search, Globe, ChevronDown, LogOut, User, LayoutDashboard, CreditCard, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import useFetchCategories from "../hooks/useFetctCategories";
import useAuthContext from "../hooks/useAuthContext";

const Navbar = ({ onSelectCategory, onSearch }) => {
  const { user, logoutUser } = useAuthContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { categories = [] } = useFetchCategories() || {};

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onSelectCategory?.(value);
    setMenuOpen(false);
  };

  const handleSearch = () => {
    onSearch?.(searchQuery);
    setMenuOpen(false);
  };

  const handleReset = () => {
    setSelectedCategory("");
    setSearchQuery("");
    onSelectCategory?.("");
    onSearch?.("");
    setMenuOpen(false);
  };

  // Safe avatar letter for mobile
  const avatarLetter = user?.username ? user.username.substring(0, 2).toUpperCase() : "U";

  return (
    <nav 
      className={`fixed top-4 left-0 right-0 mx-auto z-50 transition-all duration-500 ease-in-out px-4 max-w-screen-xl 
      ${scrolled ? "top-2 scale-[0.98]" : "top-4"}`}
    >
      <div className="relative group">
        {/* ORIGINAL 3D GRADIENT BORDER */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative bg-white/70 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] rounded-2xl">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="flex justify-between items-center h-16">
              
              {/* LOGO (ORIGINAL STYLE) */}
              <Link 
                to="/" 
                onClick={handleReset}
                className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105"
              >
                <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg rotate-3 group-hover:rotate-0 transition-all">
                   <Globe className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-extrabold tracking-tighter text-gray-900 dark:text-white uppercase">
                  NEWS<span className="text-blue-600">IQUE</span>
                </span>
              </Link>

              {/* ORIGINAL DESKTOP SEARCH */}
              <div className="hidden lg:flex items-center flex-grow max-w-sm mx-8 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Explore news..."
                  className="w-full bg-gray-100/50 dark:bg-gray-800/50 border-none rounded-xl px-4 py-2 pl-10 focus:ring-2 focus:ring-blue-500/50 transition-all dark:text-gray-100 outline-none"
                />
                <Search className="absolute left-3 text-gray-400" size={18} />
                <button 
                  onClick={handleSearch}
                  className="absolute right-2 bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-lg transition-all"
                >
                  <Search size={14} />
                </button>
              </div>

              {/* ORIGINAL DESKTOP NAV LINKS (FIXED TEXT STYLE) */}
              <div className="hidden lg:flex items-center space-x-6">
                <div className="flex items-center gap-6 text-sm font-medium">
                  <Link 
                    to="/" 
                    onClick={handleReset}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-all relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full"
                  >
                    Home
                  </Link>

                  {/* Categories Direct Links */}
                  {categories.slice(0, 3).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange({target:{value: cat.id}})}
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-all relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full"
                    >
                      {cat.name}
                    </button>
                  ))}
                  
                  <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-all">About</Link>
                </div>

                {/* ORIGINAL CATEGORY DROPDOWN */}
                <div className="relative group">
                  <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="appearance-none bg-gray-100/50 dark:bg-gray-800/50 border-none text-gray-700 dark:text-gray-200 text-sm rounded-xl px-4 py-2 pr-8 cursor-pointer focus:ring-2 focus:ring-blue-500/30 transition-all"
                  >
                    <option value="">More Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-2.5 text-gray-400 pointer-events-none" size={16} />
                </div>

                {/* ORIGINAL PROFILE DROPDOWN */}
                {user ? (
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar online placeholder hover:scale-110 transition-transform">
                      <div className="w-10 rounded-xl ring ring-blue-500 ring-offset-base-100 ring-offset-2">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'Felix'}`} alt="avatar" />
                      </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-2xl w-56 border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-all relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full">
                      <li className="menu-title text-blue-600 dark:text-blue-400">Account Settings</li>
                      <li><Link to="/profile"><User size={16}/> Profile</Link></li>
                      {["ADMIN", "EDITOR"].includes(user?.role) && (
                        <li><Link to="/dashboard"><LayoutDashboard size={16}/> Dashboard</Link></li>
                      )}
                      <li><Link to="/subscription/plan"><CreditCard size={16}/> Billing</Link></li>
                      <div className="divider my-1"></div>
                      <li><button onClick={logoutUser} className="text-red-500"><LogOut size={16}/> Logout</button></li>
                    </ul>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Link to="/login" className="px-5 py-2 text-sm font-semibold text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all">
                      Login
                    </Link>
                    <Link to="/register" className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-500/30 transition-all">
                      Join Free
                    </Link>
                  </div>
                )}
              </div>

              {/* MOBILE MENU TOGGLE */}
              <button 
                onClick={() => setMenuOpen(!menuOpen)} 
                className="lg:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU (CATEGORY SELECT + AUTH CONTENT) */}
      {menuOpen && (
        <div className="lg:hidden mt-2 bg-gray/90 dark:bg-gray-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 p-5 space-y-5 animate-in fade-in zoom-in duration-300">
          
          {/* Mobile Search */}
          <div className="relative">
             <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-20 dark:bg-gray-800 rounded-xl py-3 px-10 text-sm outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>

          {/* MOBILE CATEGORY SELECT */}
          <div className="space-y-2">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Select Category</p>
             <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="w-full appearance-none bg-gray-10 dark:bg-gray-800 border-none text-sm font-bold rounded-xl px-4 py-3 cursor-pointer outline-none"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
             </div>
          </div>

          <div className="divider opacity-10 my-0"></div>

          {/* MOBILE USER SECTION */}
          {user ? (
            <div className="space-y-3">
               <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl">
                 <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                   {avatarLetter}
                 </div>
                 <div className="text-sm font-bold text-gray-700 dark:text-white">
                   {user?.username || "User"}
                 </div>
               </div>
               <div className="flex flex-col gap-2">
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-all relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full"><User size={18}/> Profile</Link>
                  {["ADMIN", "EDITOR"].includes(user?.role) && (
                    <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="flex gap-1  text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-all relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full"><LayoutDashboard size={18}/> Dashboard</Link>
                  )}
                  <button onClick={logoutUser} className="flex items-center gap-3 px-2 py-1 text-sm font-medium text-red-500 hover:text-red-700 cursor-pointer"><LogOut size={18}/> Logout</button>
               </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
               <Link to="/login" onClick={() => setMenuOpen(false)} className="btn btn-outline border-blue-600 text-blue-600 rounded-xl">Login</Link>
               <Link to="/register" onClick={() => setMenuOpen(false)} className="btn bg-blue-600 text-white border-none rounded-xl">Join Free</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;